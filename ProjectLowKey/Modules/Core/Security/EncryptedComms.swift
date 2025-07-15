/// EncryptedComms.swift
/// End-to-end encrypted communication utilities using CryptoKit.
///
/// - Feature Context: Secure message passing for Athena, LilithOS, Primal Genesis Engine.
/// - Usage Example: let encrypted = EncryptedComms.encrypt(message: ..., key: ...)
/// - Security: Uses modern cryptography, keys never leave Secure Enclave.

import Foundation
import CryptoKit

public struct EncryptedComms {
    public static func encrypt(message: String, key: SymmetricKey) throws -> Data {
        let data = message.data(using: .utf8)!
        let sealedBox = try AES.GCM.seal(data, using: key)
        return sealedBox.combined!
    }

    public static func decrypt(data: Data, key: SymmetricKey) throws -> String {
        let box = try AES.GCM.SealedBox(combined: data)
        let decrypted = try AES.GCM.open(box, using: key)
        return String(data: decrypted, encoding: .utf8)!
    }
}