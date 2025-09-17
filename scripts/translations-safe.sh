#!/bin/bash

set -e

BASE_DIR="public/locales"
SOURCE_LANG="en"

LANGUAGES=($(ls "$BASE_DIR" | grep -v "^$SOURCE_LANG$"))
SOURCE_FILES=($(find "$BASE_DIR/$SOURCE_LANG" -name "*.json" -type f))

echo "🔍 Comparing and syncing translations (SAFE MODE)..."

for source_file in "${SOURCE_FILES[@]}"; do
    filename=$(basename "$source_file")
    
    for lang in "${LANGUAGES[@]}"; do
        target_file="$BASE_DIR/$lang/$filename"
        
        if [[ ! -f "$target_file" ]]; then
            echo "⚠️  $target_file does not exist. Skipping."
            continue
        fi

        echo "🔄 Processing: $lang/$filename"

        # Create temp file
        tmp_file=$(mktemp)

        # Copy current target
        cp "$target_file" "$tmp_file"

        # Get all keys from source
        while IFS= read -r key; do
            # Check if key exists in target
            if ! jq -e "getpath([$(echo "$key" | jq -R 'split(".") | map(try (tonumber) catch .)')] | flatten)" "$tmp_file" > /dev/null 2>&1; then
                # Get value from source
                value=$(jq -r "getpath([$(echo "$key" | jq -R 'split(".") | map(try (tonumber) catch .)')] | flatten)" "$source_file")

                # Safely update target using jq --arg and setpath
                jq --argjson path "$(echo "$key" | jq -R 'split(".") | map(try (tonumber) catch .)')" \
                   --arg val "$value" \
                   'setpath($path; $val)' "$tmp_file" > "$tmp_file.tmp" && mv "$tmp_file.tmp" "$tmp_file"

                echo "   ➕ Added missing key: $key"
            fi
        done < <(jq -r 'paths(scalars) | map(if type == "number" then . else . end) | join(".")' "$source_file")

        # Validate JSON before replacing
        if jq empty "$tmp_file" 2>/dev/null; then
            mv "$tmp_file" "$target_file"
            echo "   ✅ Successfully updated $target_file"
        else
            echo "   ❌ ERROR: Generated invalid JSON for $target_file. Skipping update."
            rm -f "$tmp_file"
        fi
    done
done

echo "✅ All translation files synced safely with source (en)."
