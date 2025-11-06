#!/usr/bin/env bash
set -euxo pipefail

# Install AWS CLI if not available
if ! command -v aws >/dev/null 2>&1; then
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  rm -rf awscliv2.zip aws/
fi

# Ensure Docker is available (if not preinstalled on AMI)
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker ubuntu
fi

# Optional: if you use docker-compose.yml in /home/ubuntu/app
cd /home/ubuntu/app
# Example: pull base images or build if needed
# docker compose pull || true
# docker compose build || true