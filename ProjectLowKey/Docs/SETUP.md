# Project Low Key: Setup & Integration Guide

## Prerequisites
- Xcode 14+
- Swift 5.7+
- CocoaPods or Swift Package Manager
- Fastlane (for automation)
- GitHub account (for CI/CD)

---

## 1. Clone & Open Project
```sh
git clone <repo-url>
cd ProjectLowKey
open ProjectLowKey.xcodeproj
```

---

## 2. Install Dependencies
- **Swift Packages:**
  - In Xcode: File > Add Packages > Enter package URLs for GenesisCore, GenesisNetworking, GenesisCrypto, GenesisPlugin
  - Or CLI: `swift package resolve`
- **CocoaPods (if used):**
  - `pod install`

---

## 3. Build & Run
- In Xcode: Select target (iOS/macOS) and press Run
- CLI:
```sh
xcodebuild -scheme ProjectLowKeyApp -destination 'platform=iOS Simulator,name=iPhone 14'
```

---

## 4. Testing
- In Xcode: Cmd+U
- CLI:
```sh
xcodebuild test -scheme ProjectLowKeyApp
```

---

## 5. Fastlane Automation
- Install Fastlane: `sudo gem install fastlane`
- Example Fastfile:
```ruby
platform :ios do
  desc "Build and upload to TestFlight"
  lane :beta do
    match(type: "appstore")
    gym(scheme: "ProjectLowKeyApp")
    pilot
  end
end
```
- Run: `fastlane beta`

---

## 6. GitHub Actions (CI/CD)
- Add `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Xcode
        uses: maxim-lobanov/setup-xcode@v1
        with:
          xcode-version: '14.2'
      - name: Build
        run: xcodebuild -scheme ProjectLowKeyApp -destination 'platform=iOS Simulator,name=iPhone 14'
      - name: Test
        run: xcodebuild test -scheme ProjectLowKeyApp
```

---

## 7. Plug-in Integration
- Add new plug-ins via GenesisPlugin Swift Package
- Register with Primal Genesis Engine/Athena/LilithOS via provided protocols

---

## 8. Security & Compliance
- Store all secrets in Keychain
- Use biometric authentication for sensitive actions
- Enforce TLS/cert pinning in networking layer

---

## 9. Support
- See `ARCHITECTURE.md` for system overview
- See inline code docs for usage examples