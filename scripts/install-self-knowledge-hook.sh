#!/usr/bin/env bash
#
# install-self-knowledge-hook.sh
# Installs the self-knowledge pre-commit hook that runs --refresh on every commit.
# Usage: bash scripts/install-self-knowledge-hook.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOOK_PATH="${REPO_DIR}/.git/hooks/pre-commit"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cat > "${HOOK_PATH}" << 'HOOK'
#!/usr/bin/env bash
#
# Pre-commit hook: auto-refresh self-knowledge document
# Installed by scripts/install-self-knowledge-hook.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

echo "🔍 Refreshing self-knowledge document..."

cd "${REPO_DIR}"

# Run --refresh to update AUTO blocks
npx tsx src/cli.ts self-knowledge --refresh 2>/dev/null || {
  echo "⚠️  Warning: self-knowledge --refresh failed. Check the setup."
  echo "   Install dependencies with: npm install"
}

# Stage any changes to the self-knowledge doc
if git diff --name-only --cached | grep -q "context/self/jarvis.md"; then
  echo "✅ Self-knowledge document will be refreshed in this commit."
else
  # Stage the file if it changed
  if git diff --name-only | grep -q "context/self/jarvis.md"; then
    git add context/self/jarvis.md
  fi
fi
HOOK

chmod +x "${HOOK_PATH}"
echo "✅ Pre-commit hook installed at ${HOOK_PATH}"
