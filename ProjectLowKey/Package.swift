// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "ProjectLowKey",
    platforms: [
        .iOS(.v17), .macOS(.v14)
    ],
    products: [
        .library(name: "ProjectLowKey", targets: ["Core", "Networking", "UI", "Features"])
    ],
    targets: [
        .target(name: "Core", dependencies: []),
        .target(name: "Networking", dependencies: ["Core"]),
        .target(name: "UI", dependencies: ["Core", "Networking"]),
        .target(name: "Features", dependencies: ["Core", "Networking", "UI"]),
        .testTarget(name: "UnitTests", dependencies: ["Core", "Networking", "UI", "Features"]),
        .testTarget(name: "UITests", dependencies: ["UI", "Features"])
    ]
)