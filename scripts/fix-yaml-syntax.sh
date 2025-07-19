#!/bin/bash

# 🔧 YAML Syntax Fix Script
# Fixes common YAML syntax errors in GitHub Actions workflows

set -e

echo "🔧 Fixing YAML syntax errors in GitHub Actions workflows..."

# Function to fix common YAML issues
fix_yaml_file() {
    local file="$1"
    echo "🔧 Fixing: $file"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Fix common issues
    sed -i '' 's/\t/  /g' "$file"  # Replace tabs with spaces
    sed -i '' 's/[[:space:]]*$//' "$file"  # Remove trailing whitespace
    sed -i '' '/^[[:space:]]*$/d' "$file"  # Remove empty lines
    
    echo "✅ Fixed: $file"
}

# Find and fix all YAML workflow files
find . -name "*.yml" -path "*/.github/workflows/*" | while read -r file; do
    fix_yaml_file "$file"
done

echo "✅ YAML syntax fixes complete!"
