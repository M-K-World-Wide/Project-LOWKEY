// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "GenesisNetworking",
    platforms: [
        .iOS(.v15), .macOS(.v12)
    ],
    products: [
        .library(name: "GenesisNetworking", targets: ["GenesisNetworking"])
    ],
    targets: [
        .target(name: "GenesisNetworking", dependencies: [])
    ]
)