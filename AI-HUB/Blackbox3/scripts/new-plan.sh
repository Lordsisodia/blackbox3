#!/usr/bin/env bash
# Blackbox3 Plan Creator
# Creates a new timestamped plan folder from template

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

# Usage
if [[ $# -lt 1 ]]; then
  error "Usage: $0 <goal/title...>"
  echo ""
  echo "Example:"
  echo "  $0 research competitors"
  echo "  $0 'design new feature'"
  echo "  $0 implement story-001"
  exit 1
fi

# Get goal/title
goal="$*"

# Generate timestamps and slug
timestamp_dir="$(now_timestamp_dir)"
timestamp_human="$(now_timestamp_human)"
slug="$(slugify "$goal")"

# Set paths (relative to SCRIPT_DIR)
dest="$SCRIPT_DIR/../.plans/${timestamp_dir}_${slug}"
template_dir="$SCRIPT_DIR/../.plans/_template"

# Check if plan already exists
if [[ -e "$dest" ]]; then
  error "Plan already exists: $dest"
  exit 1
fi

# Create plan directory
info "Creating plan: $slug"
mkdir -p "$dest"

# Copy template if exists
if [[ -d "$template_dir" ]]; then
  info "Copying template files..."
  cp -R "$template_dir"/. "$dest/" 2>/dev/null || true
else
  warning "Template directory not found, creating basic structure"
  mkdir -p "$dest/artifacts"
fi

# Replace placeholders in README.md
if [[ -f "$dest/README.md" ]]; then
  sed_inplace "s/<short title>/${goal//\//\\/}/g" "$dest/README.md"
  sed_inplace "s/<YYYY-MM-DD HH:MM>/${timestamp_human}/g" "$dest/README.md"
  sed_inplace "s/<timestamp>/${timestamp_dir}/g" "$dest/README.md"
fi

# Replace placeholders in status.md
if [[ -f "$dest/status.md" ]]; then
  sed_inplace "s/<YYYY-MM-DD HH:MM>/${timestamp_human}/g" "$dest/status.md"
fi

# Create context directory
mkdir -p "$dest/context/steps"
mkdir -p "$dest/context/compactions"

# Success
success "Plan created successfully!"
echo ""
echo "Location: $dest"
echo ""
echo "Next steps:"
echo "  1. cd $dest"
echo "  2. Edit README.md to set your goal"
echo "  3. Work with AI in chat to complete the plan"
echo "  4. Save outputs to artifacts/"
