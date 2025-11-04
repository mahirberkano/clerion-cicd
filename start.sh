#!/bin/bash
set -euo pipefail

APP_DIR="/opt/frontend"
CONTAINER_NAME="nextjs-frontend"
HOST_PORT=3000
CONTAINER_PORT=3000

echo "Starting deployment script..."

# Ensure Docker is running
echo "Checking if Docker is running..."
if ! systemctl is-active --quiet docker; then
  echo "Docker is not running, starting it..."
  sudo systemctl start docker
  sleep 10
fi

# Check if imageDetail.json exists
if [ ! -f "$APP_DIR/imageDetail.json" ]; then
  echo "ERROR: imageDetail.json missing at $APP_DIR"
  exit 1
fi

# Extract image URI
IMAGE_URI=$(jq -r '.ImageURI' "$APP_DIR/imageDetail.json")
echo "Image URI: $IMAGE_URI"

if [ -z "$IMAGE_URI" ] || [ "$IMAGE_URI" = "null" ]; then
  echo "ERROR: Image URI missing in imageDetail.json"
  exit 1
fi

# Authenticate with ECR
echo "Authenticating with ECR..."
REGION=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin ${IMAGE_URI%/*}

# Pull the image
echo "Pulling image: $IMAGE_URI"
docker pull "$IMAGE_URI"

# Remove any existing container
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "Removing existing container: $CONTAINER_NAME"
  docker rm -f "$CONTAINER_NAME" || true
fi

# Start new container
echo "Starting new container: $CONTAINER_NAME"
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart always \
  -p ${HOST_PORT}:${CONTAINER_PORT} \
  "$IMAGE_URI"

# Wait for container to start
echo "Waiting for container to start..."
sleep 10

# Check if container is running
if docker ps --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "Container $CONTAINER_NAME started successfully"
else
  echo "ERROR: Container $CONTAINER_NAME failed to start"
  docker logs "$CONTAINER_NAME" || true
  exit 1
fi

echo "Start script completed successfully"
