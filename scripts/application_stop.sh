#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=${CONFIG_FILE:-/opt/clerion/config.env}

if [ -f "$CONFIG_FILE" ]; then
  set -o allexport
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
  set +o allexport
fi

APP_NAME=${APP_NAME:-clerion-web}

if ! command -v docker >/dev/null 2>&1; then
  exit 0
fi

if docker ps --format '{{.Names}}' | grep -Fxq "$APP_NAME"; then
  docker stop "$APP_NAME"
fi

if docker ps -a --format '{{.Names}}' | grep -Fxq "$APP_NAME"; then
  docker rm "$APP_NAME"
fi
