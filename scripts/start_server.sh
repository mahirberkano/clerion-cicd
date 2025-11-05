#!/usr/bin/env bash
set -euxo pipefail

cd /home/ubuntu/app

# Build a production image from your Dockerfile
# Tag with the current commit if you pass it via env; here we use 'latest'
docker build -t nextjs-app:latest .

# Start container (example: Next.js on port 3000)
docker run -d \
  --name nextjs-app \
  -p 3000:3000 \
  --restart=always \
  nextjs-app:latest

# (Optional) Health probe loop so CodeDeploy waits before traffic shift
for i in {1..30}; do
  curl -fsS http://localhost:3000/ >/dev/null && exit 0
  sleep 2
done

echo "App did not become healthy in time" >&2
exit 1
