// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "GenesisPlugin",
    platforms: [
        .iOS(.v15), .macOS(.v12)
    ],
    products: [
        .library(name: "GenesisPlugin", targets: ["GenesisPlugin"])
    ],
    targets: [
        .target(name: "GenesisPlugin", dependencies: [])
    ]
)