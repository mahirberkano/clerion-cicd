#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=${CONFIG_FILE:-/opt/clerion/config.env}
APP_ENV_FILE=${APP_ENV_FILE:-/opt/clerion/app.env}
DEPLOY_DIR_DEFAULT="/opt/clerion"

if [ -f "$CONFIG_FILE" ]; then
  set -o allexport
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
  set +o allexport
fi

APP_NAME=${APP_NAME:-clerion-web}
HOST_PORT=${HOST_PORT:-3000}
CONTAINER_PORT=${CONTAINER_PORT:-3000}
DEPLOY_DIR=${DEPLOY_DIR:-$DEPLOY_DIR_DEFAULT}
REGION=${DEPLOY_REGION:-${AWS_REGION:-${AWS_DEFAULT_REGION:-us-east-1}}}

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker CLI not found. Ensure Docker is installed before deploying." >&2
  exit 1
fi

if ! command -v aws >/dev/null 2>&1; then
  echo "AWS CLI not found. Install the AWS CLI on the instance." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required to parse imageDetail.json" >&2
  exit 1
fi

mkdir -p "$DEPLOY_DIR"

if [ ! -f "$DEPLOY_DIR/imageDetail.json" ] && [ -f "imageDetail.json" ]; then
  cp imageDetail.json "$DEPLOY_DIR/imageDetail.json"
fi

IMAGE_DETAIL_PATH="imageDetail.json"
if [ -f "$DEPLOY_DIR/imageDetail.json" ]; then
  IMAGE_DETAIL_PATH="$DEPLOY_DIR/imageDetail.json"
fi

if [ ! -f "$IMAGE_DETAIL_PATH" ]; then
  echo "imageDetail.json not found in deployment bundle." >&2
  exit 1
fi

IMAGE_URI=$(python3 - "$IMAGE_DETAIL_PATH" <<'PY'
import json
import sys
from pathlib import Path
path = Path(sys.argv[1])
data = json.loads(path.read_text())
uri = data.get("ImageURI")
if not uri:
    raise SystemExit("ImageURI missing in imageDetail.json")
print(uri)
PY
)

REGISTRY="${IMAGE_URI%/*}"

aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$REGISTRY"

docker pull "$IMAGE_URI"

if docker ps -a --format '{{.Names}}' | grep -Fxq "$APP_NAME"; then
  docker rm -f "$APP_NAME"
fi

ENV_ARGS=()
if [ -f "$APP_ENV_FILE" ]; then
  ENV_ARGS+=(--env-file "$APP_ENV_FILE")
fi

ADDITIONAL_ARGS=()
if [ -n "${ADDITIONAL_DOCKER_RUN_ARGS:-}" ]; then
  # shellcheck disable=SC2206
  ADDITIONAL_ARGS=(${ADDITIONAL_DOCKER_RUN_ARGS})
fi

docker run -d \
  --name "$APP_NAME" \
  --restart always \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "${ENV_ARGS[@]}" \
  "${ADDITIONAL_ARGS[@]}" \
  "$IMAGE_URI"
