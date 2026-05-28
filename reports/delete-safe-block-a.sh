#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LIST_FILE="$ROOT_DIR/reports/safe-delete-list.txt"
APPLY=false

if [[ "${1:-}" == "--apply" ]]; then
  APPLY=true
fi

if [[ ! -f "$LIST_FILE" ]]; then
  echo "List file not found: $LIST_FILE" >&2
  exit 1
fi

mapfile -t TARGETS < <(
  awk '
    /^A\)/ { in_a=1; next }
    /^B\)/ { in_a=0 }
    in_a && /^- / {
      sub(/^- /, "", $0)
      print $0
    }
  ' "$LIST_FILE"
)

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  echo "No Block A entries found in $LIST_FILE"
  exit 0
fi

missing=0
existing=0
for rel in "${TARGETS[@]}"; do
  full="$ROOT_DIR/$rel"
  if [[ -e "$full" ]]; then
    ((existing+=1))
  else
    ((missing+=1))
  fi
done

echo "Block A entries: ${#TARGETS[@]}"
echo "Existing files: $existing"
echo "Missing files: $missing"

echo
if ! $APPLY; then
  echo "Dry run only. The following files would be deleted:"
  for rel in "${TARGETS[@]}"; do
    full="$ROOT_DIR/$rel"
    if [[ -e "$full" ]]; then
      echo "  $rel"
    fi
  done
  echo
  echo "Run with --apply to delete these files."
  exit 0
fi

echo "Deleting Block A files..."
deleted=0
for rel in "${TARGETS[@]}"; do
  full="$ROOT_DIR/$rel"
  if [[ -e "$full" ]]; then
    rm -f -- "$full"
    echo "  deleted: $rel"
    ((deleted+=1))
  fi
done

echo "Deleted files: $deleted"
