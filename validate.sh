#!/bin/bash
set -euo pipefail

HOST=127.0.0.1
PORT=3000
CONTAINER_NAME="nextjs-frontend"

echo "Starting validation..."

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "ERROR: Container $CONTAINER_NAME is not running"
  docker ps -a || true
  exit 1
fi

echo "Container $CONTAINER_NAME is running, checking health..."

# Wait for application to be ready
for i in {1..10}; do
  echo "Health check attempt ${i}/10..."
  if curl -sf "http://${HOST}:${PORT}/" >/dev/null 2>&1; then
    echo "✅ Application responded successfully on http://${HOST}:${PORT}/"
    exit 0
  fi
  echo "❌ Health check failed, waiting 10 seconds..."
  sleep 10
done

echo "❌ Application failed health check after 10 attempts"
echo "Container logs:"
docker logs "$CONTAINER_NAME" --tail 50 || true
exit 1
