import { EventEmitter } from 'events';
import { BLEDevice, NFCDevice, CorrelationResult } from '../core/types';

export interface LilithVehicle {
  id: string;
  name: string;
  type: 'mercedes' | 'escalade' | 'demon' | 'm3' | 'tesla';
  year: number;
  bleIdentifiers: {
    address?: string;
    name?: string;
    manufacturerData?: Buffer;
  };
  nfcIdentifiers: {
    uid?: string;
    type?: string;
  };
  status: 'active' | 'inactive' | 'maintenance';
  lastSeen?: Date;
}

export class LilithVehicleManager extends EventEmitter {
  private vehicles: Map<string, LilithVehicle> = new Map();
  private activeCorrelations: Map<string, CorrelationResult> = new Map();

  constructor() {
    super();
    this.initializeVehicles();
  }

  private initializeVehicles(): void {
    // 2014 Mercedes
    this.vehicles.set('mercedes2014', {
      id: 'mercedes2014',
      name: 'LilithOS 2014 Mercedes',
      type: 'mercedes',
      year: 2014,
      bleIdentifiers: {
        name: 'LILITH-MERCEDES-2014'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });

    // 2019 Escalade
    this.vehicles.set('escalade2019', {
      id: 'escalade2019',
      name: 'LilithOS 2019 Escalade',
      type: 'escalade',
      year: 2019,
      bleIdentifiers: {
        name: 'LILITH-ESCALADE-2019'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });

    // 2024 Escalade
    this.vehicles.set('escalade2024', {
      id: 'escalade2024',
      name: 'LilithOS 2024 Escalade',
      type: 'escalade',
      year: 2024,
      bleIdentifiers: {
        name: 'LILITH-ESCALADE-2024'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });

    // Demon Maria
    this.vehicles.set('demonmaria', {
      id: 'demonmaria',
      name: 'LilithOS Demon Maria',
      type: 'demon',
      year: 2023,
      bleIdentifiers: {
        name: 'LILITH-DEMON-MARIA'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });

    // Joseph M3
    this.vehicles.set('josephm3', {
      id: 'josephm3',
      name: 'LilithOS Joseph M3',
      type: 'm3',
      year: 2023,
      bleIdentifiers: {
        name: 'LILITH-M3-JOSEPH'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });

    // Mom's Tesla Y
    this.vehicles.set('momteslay', {
      id: 'momteslay',
      name: 'LilithOS Mom\'s Tesla Y',
      type: 'tesla',
      year: 2023,
      bleIdentifiers: {
        name: 'LILITH-TESLA-Y'
      },
      nfcIdentifiers: {
        type: 'MIFARE Classic'
      },
      status: 'active'
    });
  }

  processDeviceDiscovery(device: BLEDevice | NFCDevice): void {
    const vehicle = this.findMatchingVehicle(device);
    if (vehicle) {
      vehicle.lastSeen = new Date();
      this.emit('vehicleDetected', { vehicle, device });
    }
  }

  processCorrelation(result: CorrelationResult): void {
    const vehicle = this.findMatchingVehicle(result.bleDevice) || 
                   this.findMatchingVehicle(result.nfcDevice);
    
    if (vehicle) {
      this.activeCorrelations.set(vehicle.id, result);
      vehicle.lastSeen = new Date();
      this.emit('vehicleCorrelated', { vehicle, correlation: result });
    }
  }

  private findMatchingVehicle(device: BLEDevice | NFCDevice): LilithVehicle | undefined {
    for (const vehicle of this.vehicles.values()) {
      if (this.isDeviceMatch(device, vehicle)) {
        return vehicle;
      }
    }
    return undefined;
  }

  private isDeviceMatch(device: BLEDevice | NFCDevice, vehicle: LilithVehicle): boolean {
    if ('address' in device) {
      // BLE Device matching
      const bleId = vehicle.bleIdentifiers;
      return !!(
        (bleId.address && device.address === bleId.address) ||
        (bleId.name && device.name === bleId.name) ||
        (bleId.manufacturerData && 
         device.manufacturerData && 
         device.manufacturerData.equals(bleId.manufacturerData))
      );
    } else {
      // NFC Device matching
      const nfcId = vehicle.nfcIdentifiers;
      return !!(
        (nfcId.uid && device.uid === nfcId.uid) ||
        (nfcId.type && device.type === nfcId.type)
      );
    }
  }

  getVehicle(id: string): LilithVehicle | undefined {
    return this.vehicles.get(id);
  }

  getAllVehicles(): LilithVehicle[] {
    return Array.from(this.vehicles.values());
  }

  getActiveCorrelations(): Map<string, CorrelationResult> {
    return new Map(this.activeCorrelations);
  }

  updateVehicleStatus(id: string, status: 'active' | 'inactive' | 'maintenance'): void {
    const vehicle = this.vehicles.get(id);
    if (vehicle) {
      vehicle.status = status;
      this.emit('vehicleStatusUpdate', { vehicle });
    }
  }
} 