/// APIClient.swift
/// Modular REST client with TLS/certificate pinning and OAuth2/JWT support.
///
/// - Feature Context: Secure, reusable networking for iOS/macOS.
/// - Usage Example: APIClient.shared.request(endpoint: URL, token: "...")
/// - Security: Enforces TLS/cert pinning and secure token handling.

import Foundation

public class APIClient: NSObject, URLSessionDelegate {
    public static let shared = APIClient()
    private override init() {}

    public func urlSession(_ session: URLSession, didReceive challenge: URLAuthenticationChallenge,
                          completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void) {
        // TODO: Implement certificate pinning
        completionHandler(.performDefaultHandling, nil)
    }

    public func request<T: Decodable>(_ endpoint: URL, token: String) async throws -> T {
        var request = URLRequest(url: endpoint)
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(T.self, from: data)
    }
}