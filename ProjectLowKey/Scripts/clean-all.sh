#!/bin/bash
# clean-all.sh
# Clean all build artifacts for Project Low-Key iOS app

set -e

PROJECT="ProjectLowKey.xcodeproj"
SCHEME="ProjectLowKeyApp"

xcodebuild clean -project "$PROJECT" -scheme "$SCHEME"
rm -rf ./build 