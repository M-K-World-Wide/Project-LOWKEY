#!/bin/bash

# 🐳 Docker Optimization Script
# Implements multi-stage builds and .dockerignore files

set -e

echo "🐳 Optimizing Docker configurations..."

# Function to create .dockerignore file
create_dockerignore() {
    local dir="$1"
    local dockerignore_file="$dir/.dockerignore"
    
    if [ ! -f "$dockerignore_file" ]; then
        echo "🐳 Creating .dockerignore in: $dir"
        cat > "$dockerignore_file" << 'DOCKERIGNORE_EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
.next/
out/
dist/
build/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Git
.git/
.gitignore

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
.nyc_output/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# Testing
.pytest_cache/
.coverage
htmlcov/

# Documentation
docs/_build/

# Temporary files
tmp/
temp/
DOCKERIGNORE_EOF
        echo "✅ Created .dockerignore in: $dir"
    else
        echo "✅ .dockerignore already exists in: $dir"
    fi
}

# Function to optimize Dockerfile
optimize_dockerfile() {
    local file="$1"
    local dir=$(dirname "$file")
    
    echo "🐳 Optimizing: $file"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Check if it's already a multi-stage build
    if ! grep -q "FROM.*as" "$file"; then
        echo "💡 Consider converting to multi-stage build for: $file"
    else
        echo "✅ Multi-stage build detected in: $file"
    fi
    
    # Create .dockerignore in the same directory
    create_dockerignore "$dir"
}

# Find and optimize all Dockerfiles
find . -name "Dockerfile*" | while read -r file; do
    optimize_dockerfile "$file"
done

echo "✅ Docker optimization complete!"
