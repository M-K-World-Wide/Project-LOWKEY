#!/bin/bash

# 📦 Dependency Installation Script
# Installs missing dependencies across all projects

set -e

echo "📦 Installing missing dependencies..."

# Function to install dependencies in a project
install_deps() {
    local dir="$1"
    if [ -f "$dir/package.json" ]; then
        echo "📦 Installing dependencies in: $dir"
        cd "$dir"
        
        # Check if node_modules exists
        if [ ! -d "node_modules" ]; then
            echo "📦 Running npm install in: $dir"
            npm install
        else
            echo "✅ Dependencies already installed in: $dir"
        fi
        
        cd - > /dev/null
    fi
}

# Find all package.json files and install dependencies
find . -name "package.json" | while read -r file; do
    dir=$(dirname "$file")
    install_deps "$dir"
done

echo "✅ Dependency installation complete!"
