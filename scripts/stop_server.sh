#!/usr/bin/env bash
set -euxo pipefail

# Stop any old container(s) gracefully
if docker ps --format '{{.Names}}' | grep -q '^nextjs-app$'; then
  docker stop nextjs-app || true
  docker rm nextjs-app || true
fi
