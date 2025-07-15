#!/bin/bash
set -e

# Build for iOS Simulator
echo "Building for iOS Simulator..."
xcodebuild -scheme ProjectLowKey -destination 'platform=iOS Simulator,name=iPhone 14' build

# Build for macOS
echo "Building for macOS..."
xcodebuild -scheme ProjectLowKey -destination 'platform=macOS' build

# Run unit tests
echo "Running unit tests..."
xcodebuild test -scheme ProjectLowKey -destination 'platform=iOS Simulator,name=iPhone 14'

# Deploy with Fastlane (if configured)
if [ -f "./fastlane/Fastfile" ]; then
  echo "Deploying with Fastlane..."
  fastlane beta
else
  echo "Fastlane not configured. Skipping deployment."
fi