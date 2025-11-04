# AWS Blue/Green CI/CD Guide

This walkthrough configures a GitHub → AWS CodePipeline delivery stream that builds a Docker image for the Next.js app, deploys it to Amazon EC2 with CodeDeploy, and shifts traffic via a blue/green deployment strategy.

## 1. Repository Prerequisites

1. Commit the following files (already added):
   - `Dockerfile`
   - `.dockerignore`
   - `buildspec.yml`
   - `appspec.yml`
   - `scripts/` directory
2. Confirm the app builds locally: `npm run build`
   - If you lack outbound internet (e.g., fonts download), the CodeBuild environment will still succeed as long as it has network access.

## 2. Container Registry (Amazon ECR)

1. In the AWS console, open **ECR → Repositories → Create repository**.
2. Choose **Private**, name it (e.g., `clerion-cicd`), and enable scan on push if desired.
3. Note the repository URI—for example `123456789012.dkr.ecr.us-east-1.amazonaws.com/clerion-cicd`. You will supply this value to CodeBuild via the `IMAGE_REPO_NAME` variable.

## 3. IAM Roles and Instance Profile

Create three roles with least privilege permissions:

- **CodeBuild service role**
  - Trusted entity: `codebuild.amazonaws.com`
  - Policies: `AmazonEC2ContainerRegistryPowerUser`, `AmazonS3ReadOnlyAccess`, `AWSCodeCommitReadOnly` (if using CodeCommit), and inline permissions for CodeDeploy `GetDeploymentConfig`.
- **CodeDeploy service role**
  - Trusted entity: `codedeploy.amazonaws.com`
  - Attach `AWSCodeDeployRole` managed policy.
  - Add inline policy granting ALB/TargetGroup/AutoScaling updates for your resources.
- **EC2 instance profile**
  - Trusted entity: `ec2.amazonaws.com`
  - Policies: `AmazonEC2ContainerRegistryReadOnly`, `AmazonSSMManagedInstanceCore`, `CloudWatchAgentServerPolicy` (optional for logs).
  - Attach this profile to the launch template (next section).

## 4. Networking and Load Balancer

1. Ensure you have a VPC with at least two public subnets (for ALB high availability).
2. Create an **Application Load Balancer** listening on HTTP/HTTPS.
3. Define two target groups targeting instances (port 80 or 3000 depending on how you expose the container):
   - `clerion-blue-tg`
   - `clerion-green-tg`
4. Configure health checks (e.g., `GET /` or a dedicated `/health` endpoint).
5. Allow inbound HTTP/HTTPS traffic to the ALB security group and traffic from ALB to the EC2 instances on the container port.

## 5. Launch Template & Auto Scaling Group

1. Create a launch template (Amazon Linux 2023 recommended):
   - AMI: Amazon Linux 2023 (includes `dnf` package manager).
   - Instance profile: the IAM role created above.
   - Security group: allow traffic from the ALB and SSH from your IP.
   - User data script to install dependencies:

     ```bash
     #!/bin/bash
     dnf update -y
     dnf install -y docker jq aws-cli
     systemctl enable --now docker
     usermod -aG docker ec2-user

     mkdir -p /opt/clerion
     cat <<'EOF' >/opt/clerion/config.env
     APP_NAME=clerion-web
     HOST_PORT=3000
     CONTAINER_PORT=3000
     DEPLOY_REGION=us-east-1
     EOF

     cat <<'EOF' >/opt/clerion/app.env
     NODE_ENV=production
     # NEXT_PUBLIC_API_URL=https://api.example.com
     EOF
     ```

   - Adjust the port values to match how you expose the container (map to 80 if you want the ALB to reach the app on port 80).
2. Create an **Auto Scaling group** with desired capacity `1` (or more), referencing the launch template and both public subnets.
3. Attach the blue target group as the active target for the ASG (CodeDeploy will manage switching between blue/green).

## 6. CodeDeploy Application (Blue/Green)

1. Open **CodeDeploy → Applications → Create application** (`Compute platform: EC2/On-premises`).
2. Create a deployment group:
   - Deployment type: **Blue/Green**.
   - Deployment configuration: `CodeDeployDefault.AllAtOnce` (or a canary preset).
   - Choose the Auto Scaling group created above.
   - Service role: the CodeDeploy role from Section 3.
   - Load balancer settings:
     - Production listener: your ALB listener (e.g., HTTP:80).
     - Production target group: `clerion-blue-tg`.
     - Test (green) target group: `clerion-green-tg`.
   - Enable automatic rollback on deployment failure or CloudWatch alarm.

## 7. CodeBuild Project

1. Open **CodeBuild → Create project**.
2. Source provider: **GitHub**, connect your repository and branch.
3. Environment:
   - Managed image: `Ubuntu Standard`, latest runtime.
   - Environment type: **Linux**, compute type as needed.
   - Enable **Privileged** mode (required for Docker).
   - Service role: CodeBuild service role from Section 3.
4. Environment variables:
   - `IMAGE_REPO_NAME=clerion-cicd` (ECR repository name).
   - `IMAGE_TAG=` (optional override; defaults to the commit hash).
   - `CONTAINER_NAME=clerion-web` (should match scripts).
5. Buildspec: choose **Use a buildspec file** so CodeBuild reads `buildspec.yml` from the root.
6. Artifacts: **Amazon S3** (CodePipeline will handle artifact storage automatically).

## 8. CodePipeline Setup

1. Open **CodePipeline → Create pipeline**.
2. Source stage: GitHub (or CodeStar connection). Select the same repo/branch.
3. Build stage: choose the CodeBuild project from Section 7.
4. Deploy stage: select the CodeDeploy application and deployment group.
5. Review and create the pipeline. On the first run, CodePipeline will retrieve source, trigger CodeBuild, push the Docker image to ECR, and hand artifacts (including `appspec.yml`, scripts, and `imageDetail.json`) to CodeDeploy.

## 9. Managing Environment Variables and Secrets

- Store sensitive values (database URLs, API keys) in **AWS Systems Manager Parameter Store** or **Secrets Manager**.
- In the launch template user data, retrieve parameters and append them to `/opt/clerion/app.env`. Example using Parameter Store:

  ```bash
  aws ssm get-parameter --name "/clerion/next_public_api_url" --with-decryption \
    --region us-east-1 --query "Parameter.Value" --output text >> /opt/clerion/app.env
  ```

- The deployment scripts automatically read `/opt/clerion/config.env` for deployment settings and pass `/opt/clerion/app.env` into the container as `--env-file`.

## 10. Deploying and Monitoring

1. Push to the tracked GitHub branch to trigger the pipeline.
2. Monitor CodePipeline, then inspect the CodeDeploy deployment to watch the blue/green cutover.
3. Roll back quickly through CodeDeploy if the health check fails (`ValidateService` hook uses `curl` on the container port).
4. Use CloudWatch Logs or `docker logs` (via SSM Session Manager) for troubleshooting.

## 11. Optional Enhancements

- Add a `/health` API endpoint that returns an HTTP 200 to make ALB health checks more deterministic.
- Wire CloudWatch alarms (e.g., target group `UnhealthyHostCount`) into CodeDeploy automatic rollback.
- Use AWS Certificate Manager and HTTPS listeners on the ALB.
- Consider adding test commands in `buildspec.yml` (lint/tests) before building the Docker image.
