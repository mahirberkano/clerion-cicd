#!/usr/bin/env bash
set -euxo pipefail

cd /home/ubuntu/app

# Login to ECR and pull the pre-built image
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 905418374099.dkr.ecr.us-east-1.amazonaws.com

# Pull the latest image built by CodeBuild
docker pull 905418374099.dkr.ecr.us-east-1.amazonaws.com/clerion-cicd:latest

# Start container
docker run -d \
  --name nextjs-app \
  -p 3000:3000 \
  --restart=always \
  905418374099.dkr.ecr.us-east-1.amazonaws.com/clerion-cicd:latest

# Health probe loop
for i in {1..30}; do
  curl -fsS http://localhost:3000/ >/dev/null && exit 0
  sleep 2
done

echo "App did not become healthy in time" >&2
exit 1