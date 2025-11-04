#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=${CONFIG_FILE:-/opt/clerion/config.env}
DEPLOY_DIR_DEFAULT="/opt/clerion"
LOG_DIR_DEFAULT="/var/log/clerion"

if [ -f "$CONFIG_FILE" ]; then
  set -o allexport
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
  set +o allexport
fi

DEPLOY_DIR=${DEPLOY_DIR:-$DEPLOY_DIR_DEFAULT}
LOG_DIR=${LOG_DIR:-$LOG_DIR_DEFAULT}

mkdir -p "$DEPLOY_DIR" "$LOG_DIR"

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files docker.service >/dev/null 2>&1; then
  systemctl enable --now docker
fi
