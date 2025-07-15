//
//  Item.swift
//  ProjectLowKey
//
//  Created by Sunny Khandokar on 7/14/25.
//

import Foundation
import SwiftData

@Model
final class Item {
    var timestamp: Date
    
    init(timestamp: Date) {
        self.timestamp = timestamp
    }
}
