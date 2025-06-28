import { EventEmitter } from 'events';
import { BLEDevice, NFCDevice, CorrelationResult } from '../core/types';

export interface LilithDevice {
  id: string;
  name: string;
  type: 'macbook' | 'iphone' | 'ipad' | 'watch' | 'airpods' | 'homepod' | 'vision' | 'car' | 'key';
  model: string;
  bleIdentifiers: {
    address?: string;
    name?: string;
    manufacturerData?: Buffer;
    services?: string[];
    txPower?: number;
  };
  nfcIdentifiers: {
    uid?: string;
    type?: string;
  };
  status: 'active' | 'inactive' | 'sleep' | 'charging' | 'low_battery' | 'maintenance' | 'updating';
  lastSeen?: Date;
  batteryLevel?: number;
  isCharging?: boolean;
  capabilities?: {
    nfc?: boolean;
    uwb?: boolean;
    findMy?: boolean;
    airplay?: boolean;
    carplay?: boolean;
    spatial?: boolean;
    handoff?: boolean;
    continuity?: boolean;
    magsafe?: boolean;
    fastCharge?: boolean;
    wirelessCharge?: boolean;
  };
  metadata?: {
    osVersion?: string;
    firmwareVersion?: string;
    lastUpdate?: Date;
    location?: {
      latitude: number;
      longitude: number;
      accuracy: number;
    };
    network?: {
      ssid?: string;
      signal?: number;
      type?: 'wifi' | 'cellular' | 'ethernet';
    };
  };
}

export class LilithDeviceManager extends EventEmitter {
  private devices: Map<string, LilithDevice> = new Map();
  private activeCorrelations: Map<string, CorrelationResult> = new Map();
  private deviceGroups: Map<string, Set<string>> = new Map();
  private deviceLocations: Map<string, { latitude: number; longitude: number; timestamp: Date }> = new Map();

  constructor() {
    super();
    this.initializeDevices();
    this.initializeDeviceGroups();
  }

  private initializeDevices(): void {
    // MacBook Air
    this.devices.set('macbookair', {
      id: 'macbookair',
      name: 'LilithOS MacBook Air',
      type: 'macbook',
      model: 'M2',
      bleIdentifiers: {
        name: 'LILITH-MACBOOK-AIR',
        services: ['com.apple.macbook.air'],
        txPower: -59
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true,
        airplay: true,
        handoff: true,
        continuity: true,
        magsafe: true,
        fastCharge: true
      },
      metadata: {
        osVersion: 'macOS 14.0',
        firmwareVersion: '1.0.0',
        lastUpdate: new Date()
      }
    });

    // iPhone 15 Pro
    this.devices.set('iphone15pro', {
      id: 'iphone15pro',
      name: 'LilithOS iPhone 15 Pro',
      type: 'iphone',
      model: '15 Pro',
      bleIdentifiers: {
        name: 'LILITH-IPHONE-15-PRO',
        services: ['com.apple.iphone'],
        txPower: -59
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true,
        airplay: true,
        carplay: true,
        handoff: true,
        continuity: true,
        magsafe: true,
        fastCharge: true,
        wirelessCharge: true
      },
      metadata: {
        osVersion: 'iOS 17.0',
        firmwareVersion: '1.0.0',
        lastUpdate: new Date()
      }
    });

    // Vision Pro
    this.devices.set('visionpro', {
      id: 'visionpro',
      name: 'LilithOS Vision Pro',
      type: 'vision',
      model: 'Pro',
      bleIdentifiers: {
        name: 'LILITH-VISION-PRO',
        services: ['com.apple.vision'],
        txPower: -59
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true,
        airplay: true,
        spatial: true,
        handoff: true,
        continuity: true
      },
      metadata: {
        osVersion: 'visionOS 1.0',
        firmwareVersion: '1.0.0',
        lastUpdate: new Date()
      }
    });

    // Car Key
    this.devices.set('carkey', {
      id: 'carkey',
      name: 'LilithOS Car Key',
      type: 'key',
      model: 'Digital Key 2.0',
      bleIdentifiers: {
        name: 'LILITH-CAR-KEY',
        services: ['com.apple.carkey'],
        txPower: -59
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true
      },
      metadata: {
        firmwareVersion: '2.0.0',
        lastUpdate: new Date()
      }
    });

    // iPad Pro
    this.devices.set('ipadpro', {
      id: 'ipadpro',
      name: 'LilithOS iPad Pro',
      type: 'ipad',
      model: 'M2',
      bleIdentifiers: {
        name: 'LILITH-IPAD-PRO',
        services: ['com.apple.ipad']
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true,
        airplay: true
      }
    });

    // Apple Watch Ultra
    this.devices.set('watchultra', {
      id: 'watchultra',
      name: 'LilithOS Apple Watch Ultra',
      type: 'watch',
      model: 'Ultra',
      bleIdentifiers: {
        name: 'LILITH-WATCH-ULTRA',
        services: ['com.apple.watch']
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        nfc: true,
        uwb: true,
        findMy: true
      }
    });

    // AirPods Pro
    this.devices.set('airpodspro', {
      id: 'airpodspro',
      name: 'LilithOS AirPods Pro',
      type: 'airpods',
      model: 'Pro 2',
      bleIdentifiers: {
        name: 'LILITH-AIRPODS-PRO',
        services: ['com.apple.airpods']
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        findMy: true,
        uwb: true
      }
    });

    // HomePod Mini
    this.devices.set('homepodmini', {
      id: 'homepodmini',
      name: 'LilithOS HomePod Mini',
      type: 'homepod',
      model: 'Mini',
      bleIdentifiers: {
        name: 'LILITH-HOMEPOD-MINI',
        services: ['com.apple.homepod']
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active',
      capabilities: {
        airplay: true,
        findMy: true
      }
    });
  }

  private initializeDeviceGroups(): void {
    // Personal Devices Group
    this.deviceGroups.set('personal', new Set([
      'macbookair',
      'iphone15pro',
      'watchultra',
      'airpodspro',
      'visionpro'
    ]));

    // Home Devices Group
    this.deviceGroups.set('home', new Set([
      'homepodmini',
      'ipadpro'
    ]));

    // Mobile Devices Group
    this.deviceGroups.set('mobile', new Set([
      'iphone15pro',
      'watchultra',
      'airpodspro',
      'carkey'
    ]));

    // Spatial Devices Group
    this.deviceGroups.set('spatial', new Set([
      'visionpro',
      'iphone15pro'
    ]));
  }

  processDeviceDiscovery(device: BLEDevice | NFCDevice): void {
    const lilithDevice = this.findMatchingDevice(device);
    if (lilithDevice) {
      lilithDevice.lastSeen = new Date();
      this.updateDeviceStatus(lilithDevice.id, 'active');
      this.emit('deviceDetected', { device: lilithDevice, discovered: device });
    }
  }

  processCorrelation(result: CorrelationResult): void {
    const lilithDevice = this.findMatchingDevice(result.bleDevice) || 
                        this.findMatchingDevice(result.nfcDevice);
    
    if (lilithDevice) {
      this.activeCorrelations.set(lilithDevice.id, result);
      lilithDevice.lastSeen = new Date();
      this.emit('deviceCorrelated', { device: lilithDevice, correlation: result });
    }
  }

  private findMatchingDevice(device: BLEDevice | NFCDevice): LilithDevice | undefined {
    for (const lilithDevice of this.devices.values()) {
      if (this.isDeviceMatch(device, lilithDevice)) {
        return lilithDevice;
      }
    }
    return undefined;
  }

  private isDeviceMatch(device: BLEDevice | NFCDevice, lilithDevice: LilithDevice): boolean {
    if ('address' in device) {
      // BLE Device matching
      const bleId = lilithDevice.bleIdentifiers;
      return !!(
        (bleId.address && device.address === bleId.address) ||
        (bleId.name && device.name === bleId.name) ||
        (bleId.manufacturerData && 
         device.manufacturerData && 
         device.manufacturerData.equals(bleId.manufacturerData)) ||
        (bleId.services && 
         device.services && 
         bleId.services.some(service => device.services?.includes(service)))
      );
    } else {
      // NFC Device matching
      const nfcId = lilithDevice.nfcIdentifiers;
      return !!(
        (nfcId.uid && device.uid === nfcId.uid) ||
        (nfcId.type && device.type === nfcId.type)
      );
    }
  }

  getDevice(id: string): LilithDevice | undefined {
    return this.devices.get(id);
  }

  getAllDevices(): LilithDevice[] {
    return Array.from(this.devices.values());
  }

  getDevicesByType(type: LilithDevice['type']): LilithDevice[] {
    return this.getAllDevices().filter(device => device.type === type);
  }

  getDevicesByGroup(groupId: string): LilithDevice[] {
    const deviceIds = this.deviceGroups.get(groupId);
    if (!deviceIds) return [];
    return this.getAllDevices().filter(device => deviceIds.has(device.id));
  }

  getActiveCorrelations(): Map<string, CorrelationResult> {
    return new Map(this.activeCorrelations);
  }

  updateDeviceStatus(id: string, status: LilithDevice['status']): void {
    const device = this.devices.get(id);
    if (device) {
      device.status = status;
      this.emit('deviceStatusUpdate', { device });
    }
  }

  updateDeviceBattery(id: string, level: number, isCharging: boolean): void {
    const device = this.devices.get(id);
    if (device) {
      device.batteryLevel = level;
      device.isCharging = isCharging;
      device.status = isCharging ? 'charging' : 
                     level < 20 ? 'low_battery' : 
                     device.status;
      this.emit('deviceBatteryUpdate', { device });
    }
  }

  getDevicesByCapability(capability: keyof LilithDevice['capabilities']): LilithDevice[] {
    return this.getAllDevices().filter(device => 
      device.capabilities?.[capability]
    );
  }

  getNearbyDevices(deviceId: string): LilithDevice[] {
    const correlation = this.activeCorrelations.get(deviceId);
    if (!correlation) return [];

    const nearbyDevices = new Set<LilithDevice>();
    for (const [id, corr] of this.activeCorrelations.entries()) {
      if (id !== deviceId && 
          corr.metadata.distance < 1.0 && // Within 1 meter
          corr.confidence > 0.8) { // High confidence
        const device = this.devices.get(id);
        if (device) nearbyDevices.add(device);
      }
    }
    return Array.from(nearbyDevices);
  }

  updateDeviceLocation(id: string, latitude: number, longitude: number, accuracy: number): void {
    const device = this.devices.get(id);
    if (device) {
      device.metadata = {
        ...device.metadata,
        location: { latitude, longitude, accuracy }
      };
      this.deviceLocations.set(id, { latitude, longitude, timestamp: new Date() });
      this.emit('deviceLocationUpdate', { device });
    }
  }

  updateDeviceNetwork(id: string, network: LilithDevice['metadata']['network']): void {
    const device = this.devices.get(id);
    if (device) {
      const currentMetadata = device.metadata || {};
      device.metadata = {
        ...currentMetadata,
        network
      };
      this.emit('deviceNetworkUpdate', { device });
    }
  }

  getDevicesByLocation(latitude: number, longitude: number, radius: number): LilithDevice[] {
    return this.getAllDevices().filter(device => {
      const location = device.metadata?.location;
      if (!location) return false;

      const distance = this.calculateDistance(
        latitude,
        longitude,
        location.latitude,
        location.longitude
      );

      return distance <= radius;
    });
  }

  getDevicesByNetworkType(type: 'wifi' | 'cellular' | 'ethernet'): LilithDevice[] {
    return this.getAllDevices().filter(device => 
      device.metadata?.network?.type === type
    );
  }

  getDevicesByOSVersion(os: string, version: string): LilithDevice[] {
    return this.getAllDevices().filter(device => 
      device.metadata?.osVersion?.startsWith(`${os} ${version}`)
    );
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }

  getDeviceGroups(): Map<string, Set<string>> {
    return new Map(this.deviceGroups);
  }

  addDeviceToGroup(deviceId: string, groupId: string): void {
    const group = this.deviceGroups.get(groupId);
    if (group && this.devices.has(deviceId)) {
      group.add(deviceId);
      this.emit('deviceGroupUpdate', { deviceId, groupId, action: 'add' });
    }
  }

  removeDeviceFromGroup(deviceId: string, groupId: string): void {
    const group = this.deviceGroups.get(groupId);
    if (group) {
      group.delete(deviceId);
      this.emit('deviceGroupUpdate', { deviceId, groupId, action: 'remove' });
    }
  }

  createDeviceGroup(groupId: string, deviceIds: string[]): void {
    if (!this.deviceGroups.has(groupId)) {
      const validDevices = deviceIds.filter(id => this.devices.has(id));
      this.deviceGroups.set(groupId, new Set(validDevices));
      this.emit('deviceGroupCreated', { groupId, deviceIds: validDevices });
    }
  }

  deleteDeviceGroup(groupId: string): void {
    if (this.deviceGroups.has(groupId)) {
      this.deviceGroups.delete(groupId);
      this.emit('deviceGroupDeleted', { groupId });
    }
  }
} 