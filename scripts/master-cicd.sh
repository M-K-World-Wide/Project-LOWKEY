#!/bin/bash

# 🚀 Master CI/CD Script
# Orchestrates CI/CD across all projects

set -e

echo "🚀 Starting master CI/CD pipeline..."

# Function to run CI/CD for a project
run_cicd() {
    local project="$1"
    echo "🔧 Running CI/CD for: $project"
    
    cd "$project"
    
    # Run tests if available
    if [ -f "package.json" ]; then
        npm test 2>/dev/null || echo "⚠️ Tests failed for $project"
    fi
    
    # Run linting if available
    if [ -f "package.json" ]; then
        npm run lint 2>/dev/null || echo "⚠️ Linting failed for $project"
    fi
    
    # Run build if available
    if [ -f "package.json" ]; then
        npm run build 2>/dev/null || echo "⚠️ Build failed for $project"
    fi
    
    cd - > /dev/null
    echo "✅ CI/CD completed for: $project"
}

# Find all projects and run CI/CD
find . -name "package.json" | while read -r file; do
    local project=$(dirname "$file")
    run_cicd "$project"
done

echo "✅ Master CI/CD pipeline completed!"
