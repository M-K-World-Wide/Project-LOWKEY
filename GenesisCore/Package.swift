// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "GenesisCore",
    platforms: [
        .iOS(.v15), .macOS(.v12)
    ],
    products: [
        .library(name: "GenesisCore", targets: ["GenesisCore"])
    ],
    targets: [
        .target(name: "GenesisCore", dependencies: [])
    ]
)