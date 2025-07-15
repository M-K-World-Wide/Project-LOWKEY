#!/bin/bash
# build-ios.sh
# Build, clean, and optionally archive the iOS app

set -e

PROJECT="ProjectLowKey.xcodeproj"
SCHEME="ProjectLowKeyApp"
ARCHIVE_PATH="./build/AppArchive.xcarchive"
EXPORT_PATH="./build/ExportedIPA"
EXPORT_OPTIONS="ExportOptions.plist"

# Clean
xcodebuild clean -project "$PROJECT" -scheme "$SCHEME"

# Build for device
xcodebuild -project "$PROJECT" -scheme "$SCHEME" -sdk iphoneos -destination 'generic/platform=iOS' build

# Archive (optional)
xcodebuild -project "$PROJECT" -scheme "$SCHEME" -configuration Release -archivePath "$ARCHIVE_PATH" archive

# Export IPA (optional)
if [ -f "$EXPORT_OPTIONS" ]; then
  xcodebuild -exportArchive -archivePath "$ARCHIVE_PATH" -exportPath "$EXPORT_PATH" -exportOptionsPlist "$EXPORT_OPTIONS"
else
  echo "To export IPA, create an ExportOptions.plist (ad-hoc or development)."
fi 