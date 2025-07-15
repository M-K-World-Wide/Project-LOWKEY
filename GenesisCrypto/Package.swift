// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "GenesisCrypto",
    platforms: [
        .iOS(.v15), .macOS(.v12)
    ],
    products: [
        .library(name: "GenesisCrypto", targets: ["GenesisCrypto"])
    ],
    targets: [
        .target(name: "GenesisCrypto", dependencies: [])
    ]
)