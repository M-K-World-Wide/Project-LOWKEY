import Foundation

struct Secrets {
    static let apiKey = Bundle.main.object(forInfoDictionaryKey: "API_KEY") as? String
    // Use Keychain for sensitive data
} 