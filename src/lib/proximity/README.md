# Lilith Proximity Module 🌟

A dual-layer proximity detection system that combines BLE and NFC scanning for precise device correlation and activation, with deep integration for LilithOS vehicles and devices.

## Core Components

### 1. BLE Sniffer (`ble_sniffer.ts`)
- Real-time BLE device discovery
- RSSI-based distance estimation
- Stealth mode configuration
- Event-driven device tracking

### 2. NFC Scanner (`nfc_scanner.ts`)
- Passive NFC tag reading
- NDEF data parsing
- Device status tracking
- Stealth mode support

### 3. Correlation Engine (`correlate.ts`)
- Multi-factor correlation algorithm
- Temporal and spatial matching
- Confidence scoring
- Event emission for matches

### 4. Stats Tracker (`stats.ts`)
- Real-time metrics collection
- Device counting
- Correlation statistics
- Performance monitoring

### 5. Orchestrator (`orchestrator.ts`)
- Unified component management
- Event coordination
- Configuration control
- System state management

### 6. Vehicle Integration (`integrations/vehicles.ts`)
- LilithOS vehicle management
- Vehicle-specific BLE/NFC identifiers
- Status tracking and correlation
- Event emission for vehicle detection

### 7. Device Integration (`integrations/devices.ts`)
- LilithOS device management
- Device-specific BLE/NFC identifiers
- Status tracking and correlation
- Event emission for device detection
- Device grouping and capabilities
- Battery and charging status
- Proximity-based device discovery
- Location and network tracking
- OS and firmware version management
- Advanced device capabilities

## Supported Vehicles

- LilithOS 2014 Mercedes
- LilithOS 2019 Escalade
- LilithOS 2024 Escalade
- LilithOS Demon Maria
- LilithOS Joseph M3
- LilithOS Mom's Tesla Y

## Supported Devices

### Personal Devices
- LilithOS MacBook Air (M2)
  - NFC, UWB, Find My, AirPlay
  - Handoff, Continuity, MagSafe
  - Fast Charging
  - macOS 14.0
- LilithOS iPhone 15 Pro
  - NFC, UWB, Find My, AirPlay, CarPlay
  - Handoff, Continuity, MagSafe
  - Fast & Wireless Charging
  - iOS 17.0
- LilithOS Vision Pro
  - NFC, UWB, Find My, AirPlay
  - Spatial Computing
  - Handoff, Continuity
  - visionOS 1.0
- LilithOS Apple Watch Ultra
  - NFC, UWB, Find My
- LilithOS AirPods Pro (2nd Gen)
  - Find My, UWB

### Home Devices
- LilithOS HomePod Mini
  - AirPlay, Find My
- LilithOS iPad Pro (M2)
  - NFC, UWB, Find My, AirPlay

### Vehicle Integration
- LilithOS Car Key (Digital Key 2.0)
  - NFC, UWB, Find My

## Device Groups

### Personal Devices
- MacBook Air
- iPhone 15 Pro
- Apple Watch Ultra
- AirPods Pro
- Vision Pro

### Home Devices
- HomePod Mini
- iPad Pro

### Mobile Devices
- iPhone 15 Pro
- Apple Watch Ultra
- AirPods Pro
- Car Key

### Spatial Devices
- Vision Pro
- iPhone 15 Pro

## Device Capabilities

### Core Features
- NFC: Near Field Communication
- UWB: Ultra-Wideband
- Find My: Device tracking
- AirPlay: Media streaming
- CarPlay: Vehicle integration

### Advanced Features
- Spatial: Spatial computing
- Handoff: Device handoff
- Continuity: Cross-device features
- MagSafe: Magnetic charging
- Fast Charge: Rapid charging
- Wireless Charge: Wireless charging

## Usage

```typescript
import { LilithProximityOrchestrator } from './core/orchestrator';

// Initialize with custom config
const orchestrator = new LilithProximityOrchestrator({
  powerMode: 'normal',
  ledActivity: false,
  scanInterval: 1000,
  correlationThreshold: 0.8
});

// Event handling
orchestrator.on('deviceDiscovered', ({ type, data }) => {
  console.log(`New ${data.type} device:`, data.device);
});

orchestrator.on('vehicleDetected', ({ type, data }) => {
  console.log('Vehicle detected:', data.vehicle);
});

orchestrator.on('deviceDetected', ({ type, data }) => {
  console.log('LilithOS device detected:', data.device);
});

orchestrator.on('deviceBatteryUpdate', ({ type, data }) => {
  console.log('Device battery update:', data.device);
});

orchestrator.on('deviceLocationUpdate', ({ type, data }) => {
  console.log('Device location update:', data.device);
});

orchestrator.on('deviceNetworkUpdate', ({ type, data }) => {
  console.log('Device network update:', data.device);
});

orchestrator.on('deviceGroupUpdate', ({ type, data }) => {
  console.log('Device group update:', data);
});

orchestrator.on('correlationFound', ({ type, data }) => {
  console.log('Device correlation:', data);
});

orchestrator.on('statsUpdate', ({ type, data }) => {
  console.log('Current stats:', data);
});

// Start scanning
await orchestrator.start();

// Get devices by type
const macbooks = orchestrator.getDevicesByType('macbook');
const iPhones = orchestrator.getDevicesByType('iphone');
const visionDevices = orchestrator.getDevicesByType('vision');

// Get devices by group
const personalDevices = orchestrator.getDevicesByGroup('personal');
const homeDevices = orchestrator.getDevicesByGroup('home');
const mobileDevices = orchestrator.getDevicesByGroup('mobile');
const spatialDevices = orchestrator.getDevicesByGroup('spatial');

// Get devices by capability
const uwbDevices = orchestrator.getDevicesByCapability('uwb');
const carplayDevices = orchestrator.getDevicesByCapability('carplay');
const spatialDevices = orchestrator.getDevicesByCapability('spatial');

// Get devices by location
const nearbyDevices = orchestrator.getDevicesByLocation(37.7749, -122.4194, 1000); // Within 1km

// Get devices by network
const wifiDevices = orchestrator.getDevicesByNetworkType('wifi');
const cellularDevices = orchestrator.getDevicesByNetworkType('cellular');

// Get devices by OS version
const ios17Devices = orchestrator.getDevicesByOSVersion('iOS', '17.0');
const macos14Devices = orchestrator.getDevicesByOSVersion('macOS', '14.0');

// Update device status
orchestrator.updateDeviceStatus('macbookair', 'sleep');
orchestrator.updateDeviceBattery('iphone15pro', 85, true);

// Update device location
orchestrator.updateDeviceLocation('iphone15pro', 37.7749, -122.4194, 10);

// Update device network
orchestrator.updateDeviceNetwork('macbookair', {
  ssid: 'LilithOS-Network',
  signal: -65,
  type: 'wifi'
});

// Device group management
orchestrator.createDeviceGroup('work', ['macbookair', 'iphone15pro']);
orchestrator.addDeviceToGroup('visionpro', 'work');
orchestrator.removeDeviceFromGroup('iphone15pro', 'personal');
orchestrator.deleteDeviceGroup('old');

// Stop scanning
await orchestrator.stop();
```

## Stealth Configuration

The module supports various stealth configurations:

```typescript
interface StealthConfig {
  powerMode: 'low' | 'normal' | 'high';
  ledActivity: boolean;
  scanInterval: number;
  correlationThreshold: number;
}
```

## Events

### System Events
- `started`: Emitted when scanning starts
- `stopped`: Emitted when scanning stops
- `error`: Emitted when an error occurs
- `reset`: Emitted when the system is reset

### Discovery Events
- `deviceDiscovered`: Emitted when a new BLE or NFC device is found
- `vehicleDetected`: Emitted when a LilithOS vehicle is detected
- `deviceDetected`: Emitted when a LilithOS device is detected

### Correlation Events
- `correlationFound`: Emitted when devices are correlated
- `vehicleCorrelated`: Emitted when a vehicle correlation is found
- `deviceCorrelated`: Emitted when a device correlation is found

### Status Events
- `statsUpdate`: Emitted when statistics are updated
- `vehicleStatusUpdate`: Emitted when a vehicle's status changes
- `deviceStatusUpdate`: Emitted when a device's status changes
- `deviceBatteryUpdate`: Emitted when a device's battery status changes
- `deviceLocationUpdate`: Emitted when a device's location changes
- `deviceNetworkUpdate`: Emitted when a device's network status changes

### Group Events
- `deviceGroupUpdate`: Emitted when a device is added to or removed from a group
- `deviceGroupCreated`: Emitted when a new device group is created
- `deviceGroupDeleted`: Emitted when a device group is deleted

## Development

### Prerequisites
- Node.js 16+
- TypeScript 4.5+
- BLE and NFC hardware support

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

## License

MIT License - See LICENSE file for details 