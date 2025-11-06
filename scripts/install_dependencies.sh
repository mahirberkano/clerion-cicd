#!/usr/bin/env bash
set -euxo pipefail

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