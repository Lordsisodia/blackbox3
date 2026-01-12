#!/usr/bin/env bash
# Blackbox3 Shared Library
# Utility functions for all Blackbox3 scripts

# Get current timestamp in directory format (YYYY-MM-DD_HHMM)
now_timestamp_dir() {
  date +"%Y-%m-%d_%H%M"
}

# Get current timestamp in human format (YYYY-MM-DD HH:MM)
now_timestamp_human() {
  date +"%Y-%m-%d %H:%M"
}

# Convert string to URL-safe slug
slugify() {
  echo "$*" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g'
}

# Portable in-place sed replacement (works on both Linux and macOS)
sed_inplace() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

# Check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Print info message
info() {
  echo "[INFO] $*"
}

# Print success message
success() {
  echo "[✓] $*"
}

# Print error message
error() {
  echo "[✗] $*" >&2
}

# Print warning message
warning() {
  echo "[!] $*"
}

# Confirm with user
confirm() {
  local prompt="$1"
  local response

  while true; do
    read -r "$prompt" response
    case "$response" in
      [yY][eE][sS]|[yY])
        return 0
        ;;
      [nN][oO]|[nN])
        return 1
        ;;
      *)
        echo "Please answer yes or no."
        ;;
    esac
  done
}
