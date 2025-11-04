#!/bin/bash
set -euo pipefail

CONTAINER_NAME="nextjs-frontend"

echo "Checking if Docker is running..."
if ! systemctl is-active --quiet docker; then
  echo "Docker is not running, starting it..."
  sudo systemctl start docker || true
  sleep 5
fi

echo "Checking for existing container: ${CONTAINER_NAME}"
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "Stopping and removing container ${CONTAINER_NAME}"
  docker stop "$CONTAINER_NAME" || true
  docker rm "$CONTAINER_NAME" || true
  echo "Container ${CONTAINER_NAME} stopped and removed"
else
  echo "Container ${CONTAINER_NAME} not found"
fi

echo "Stop script completed successfully"
