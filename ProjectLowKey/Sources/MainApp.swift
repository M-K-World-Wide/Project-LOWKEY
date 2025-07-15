import SwiftUI

@main
struct ProjectLowKeyApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            DashboardView()
                .preferredColorScheme(.dark)
        }
    }
} 