/// GenesisPlugin.swift
/// Protocol for modular plugin integration with Athena, LilithOS, and Primal Genesis Engine.
///
/// - Feature Context: Enables dynamic, secure extension of the app via plugins.
/// - Usage Example: Implement this protocol in a plugin to register with the engine.
/// - Security: Plugins are sandboxed and negotiate capabilities at runtime.

import Foundation

public protocol GenesisPlugin {
    func register(with engine: GenesisEngine)
    func handle(event: GenesisEvent)
}

public protocol GenesisEngine {
    func negotiateCapabilities(for plugin: GenesisPlugin) -> [String]
    func send(event: GenesisEvent)
}

public struct GenesisEvent {
    public let name: String
    public let payload: [String: Any]
    public init(name: String, payload: [String: Any]) {
        self.name = name
        self.payload = payload
    }
}