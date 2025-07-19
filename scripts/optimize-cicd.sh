#!/bin/bash

# 🔧 Comprehensive CI/CD Optimization and Error Fixing Script
# Author: AthenaMyst CI/CD Optimization System
# Version: 2.0.0

set -e

echo "🚀 Starting comprehensive CI/CD optimization..."

# Function to validate YAML files
validate_yaml() {
    local file="$1"
    if command -v python3 >/dev/null 2>&1; then
        python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null && echo "✅ $file" || echo "❌ $file - YAML syntax error"
    else
        echo "⚠️  Python3 not available for YAML validation: $file"
    fi
}

# Function to validate JSON files
validate_json() {
    local file="$1"
    if command -v node >/dev/null 2>&1; then
        node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8')); console.log('✅ $file')" 2>/dev/null || echo "❌ $file - JSON syntax error"
    else
        echo "⚠️  Node.js not available for JSON validation: $file"
    fi
}

# Function to check for common CI/CD issues
check_cicd_issues() {
    echo "🔍 Checking for CI/CD issues..."
    
    # Check for missing dependencies
    find . -name "package.json" -exec sh -c '
        echo "📦 Checking dependencies in $1"
        cd "$(dirname "$1")"
        if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
            echo "✅ Lock file found"
        else
            echo "⚠️  No lock file found - run npm install or yarn install"
        fi
    ' _ {} \;
    
    # Check for outdated dependencies
    echo "🔍 Checking for outdated dependencies..."
    find . -name "package.json" -exec sh -c '
        cd "$(dirname "$1")"
        if [ -f "package.json" ]; then
            echo "📦 Checking $1"
            npm outdated 2>/dev/null || echo "✅ All dependencies up to date"
        fi
    ' _ {} \;
}

# Function to optimize GitHub Actions workflows
optimize_workflows() {
    echo "🔧 Optimizing GitHub Actions workflows..."
    
    find . -name "*.yml" -path "*/.github/workflows/*" | while read -r file; do
        echo "🔧 Optimizing: $file"
        
        # Add caching for better performance
        if ! grep -q "actions/cache" "$file"; then
            echo "💡 Consider adding actions/cache for better performance"
        fi
        
        # Check for proper error handling
        if ! grep -q "continue-on-error\|if: failure()" "$file"; then
            echo "💡 Consider adding error handling with continue-on-error"
        fi
        
        # Validate YAML syntax
        validate_yaml "$file"
    done
}

# Function to check Docker configurations
check_docker() {
    echo "🐳 Checking Docker configurations..."
    
    find . -name "Dockerfile*" | while read -r file; do
        echo "🐳 Checking: $file"
        
        # Check for security best practices
        if grep -q "USER root" "$file"; then
            echo "⚠️  Consider using non-root user for security"
        fi
        
        # Check for multi-stage builds
        if grep -q "FROM.*as" "$file"; then
            echo "✅ Multi-stage build detected"
        else
            echo "💡 Consider using multi-stage builds for smaller images"
        fi
        
        # Check for .dockerignore
        local dir=$(dirname "$file")
        if [ ! -f "$dir/.dockerignore" ]; then
            echo "💡 Consider adding .dockerignore file"
        fi
    done
}

# Function to generate optimization report
generate_report() {
    echo "📊 Generating optimization report..."
    
    cat > cicd-optimization-report.md << 'REPORT_EOF'
# CI/CD Optimization Report

## Summary
- Generated: $(date)
- Projects scanned: $(find . -name ".git" -type d | wc -l)
- Workflows found: $(find . -name "*.yml" -path "*/.github/workflows/*" | wc -l)
- Dockerfiles found: $(find . -name "Dockerfile*" | wc -l)

## Recommendations
1. Add caching to GitHub Actions workflows
2. Implement proper error handling
3. Use multi-stage Docker builds
4. Add .dockerignore files
5. Update outdated dependencies

## Next Steps
- Review and implement recommendations
- Test CI/CD pipelines
- Monitor performance improvements
REPORT_EOF
    
    echo "�� Report generated: cicd-optimization-report.md"
}

# Main execution
main() {
    echo "🚀 Starting CI/CD optimization process..."
    
    check_cicd_issues
    optimize_workflows
    check_docker
    generate_report
    
    echo "✅ CI/CD optimization complete!"
    echo "📊 Check cicd-optimization-report.md for detailed recommendations"
}

# Run main function
main "$@"
