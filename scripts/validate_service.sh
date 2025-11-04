#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=${CONFIG_FILE:-/opt/clerion/config.env}

if [ -f "$CONFIG_FILE" ]; then
  set -o allexport
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
  set +o allexport
fi

HOST_PORT=${HOST_PORT:-3000}
APP_NAME=${APP_NAME:-clerion-web}
MAX_ATTEMPTS=${MAX_ATTEMPTS:-12}
SLEEP_SECONDS=${SLEEP_SECONDS:-5}

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  if curl -fsS "http://localhost:${HOST_PORT}/" >/dev/null 2>&1; then
    exit 0
  fi
  sleep "$SLEEP_SECONDS"
done

if command -v docker >/dev/null 2>&1; then
  docker logs "$APP_NAME" || true
fi

echo "Service failed health check on port ${HOST_PORT} after ${MAX_ATTEMPTS} attempts." >&2
exit 1
