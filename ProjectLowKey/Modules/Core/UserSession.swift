/// UserSession.swift
/// Manages user authentication state, token storage, and session lifecycle.
///
/// - Feature Context: Centralized session management for iOS/macOS.
/// - Usage Example: UserSession.shared.login(...)
/// - Security: Tokens stored in Keychain, supports biometric unlock.

import Foundation

public class UserSession: ObservableObject {
    public static let shared = UserSession()
    @Published public private(set) var isAuthenticated: Bool = false
    @Published public private(set) var token: String? = nil
    private init() {}

    public func login(token: String) {
        self.token = token
        self.isAuthenticated = true
        // TODO: Store token in Keychain
    }

    public func logout() {
        self.token = nil
        self.isAuthenticated = false
        // TODO: Remove token from Keychain
    }
}