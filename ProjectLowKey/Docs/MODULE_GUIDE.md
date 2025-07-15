# MODULE GUIDE: Project Low Key

## Overview
This guide describes the modular structure of Project Low Key, detailing the purpose, extensibility, and usage of each module.

---

## 1. Core
- **Purpose:** Business logic, models, session management, plugin protocols.
- **Extensibility:** Add new models, session types, or plugins in `Core/Plugins/`.
- **Example:**
```swift
struct Device: Codable { /* ... */ }
```

---

## 2. Networking
- **Purpose:** REST, WebSocket, and custom protocol communication.
- **Extensibility:** Add new API clients, socket handlers, or protocol adapters.
- **Example:**
```swift
let client = APIClient.shared
try await client.request(endpoint: url, token: token)
```

---

## 3. UI
- **Purpose:** SwiftUI views for iOS/macOS, MVVM architecture.
- **Extensibility:** Add new views, view models, or platform-specific UI.
- **Example:**
```swift
struct DashboardView: View { /* ... */ }
```

---

## 4. Features
- **Purpose:** App features (DeviceRegistration, ChatEngine, Dashboard, etc.).
- **Extensibility:** Add new feature folders and connect to Core/Networking/UI.
- **Example:**
```swift
// Features/DeviceRegistration/DeviceRegistrationView.swift
```

---

## 5. Resources
- **Purpose:** Assets, localization, and static resources.
- **Extensibility:** Add images, strings, and other resources as needed.

---

## 6. Tests
- **Purpose:** Unit and UI tests for all modules.
- **Extensibility:** Add new test cases in `UnitTests/` or `UITests/`.

---

## 7. Scripts
- **Purpose:** Build, deploy, and automation scripts.
- **Extensibility:** Add new scripts for CI/CD or custom workflows.

---

## 8. Extending the Project
- Add new modules by creating a folder in `Modules/` and updating `Package.swift`.
- See `INTEGRATION.md` for engine/plugin integration.