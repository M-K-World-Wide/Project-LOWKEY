/// GenesisPlugin.swift
/// Protocol for plug-in modules to integrate with Primal Genesis Engine, Athena, and LilithOS.
///
/// - Feature Context: Enables modular, secure, and dynamic extension of the unified app ecosystem.
/// - Usage Example: Implement this protocol in a Swift Package to register a new engine module.
/// - Security: Plug-ins are sandboxed and negotiate capabilities with the engine.

import Foundation

public protocol GenesisPlugin {
    /// Register the plug-in with the engine.
    func register(with engine: GenesisEngine)
    /// Handle incoming events from the engine.
    func handle(event: GenesisEvent)
}

/// Example engine and event types for integration
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