import Foundation

class APIClient {
    static let shared = APIClient()
    let baseURL = URL(string: "https://your-broker-url")!

    func pingHealth(completion: @escaping (Bool) -> Void) {
        let url = baseURL.appendingPathComponent("/health")
        URLSession.shared.dataTask(with: url) { data, response, error in
            completion((response as? HTTPURLResponse)?.statusCode == 200)
        }.resume()
    }
} 