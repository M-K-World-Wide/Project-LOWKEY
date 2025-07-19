#!/bin/bash

# 🔄 Comprehensive Project Sync Script
# Syncs all projects with GitHub and updates submodules

set -e

echo "🔄 Starting comprehensive project synchronization..."

# Function to sync a git repository
sync_repo() {
    local repo_path="$1"
    echo "🔄 Syncing: $repo_path"
    
    cd "$repo_path"
    
    # Check if it's a git repository
    if [ ! -d ".git" ]; then
        echo "⚠️  Not a git repository: $repo_path"
        return
    fi
    
    # Fetch latest changes
    git fetch origin
    
    # Check if there are local changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "📝 Local changes detected in: $repo_path"
        git add .
        git commit -m "🔄 Auto-sync: $(date)"
    fi
    
    # Pull latest changes
    git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || echo "⚠️  Could not pull from origin"
    
    # Update submodules if any
    if [ -f ".gitmodules" ]; then
        echo "🔄 Updating submodules in: $repo_path"
        git submodule update --init --recursive
    fi
    
    cd - > /dev/null
    echo "✅ Synced: $repo_path"
}

# Find all git repositories and sync them
find . -name ".git" -type d | while read -r git_dir; do
    repo_path=$(dirname "$git_dir")
    sync_repo "$repo_path"
done

echo "✅ All projects synchronized!"
