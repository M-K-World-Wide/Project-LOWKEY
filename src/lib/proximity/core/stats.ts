import { EventEmitter } from 'events';
import { ProximityStats, CorrelationResult, BLEDevice, NFCDevice } from './types';

export class LilithStatsTracker extends EventEmitter {
  private stats: ProximityStats = {
    totalScans: 0,
    devicesFound: 0,
    correlationsFound: 0,
    averageConfidence: 0,
    lastScanTime: new Date()
  };

  private confidenceSum: number = 0;
  private deviceMap: Map<string, { ble?: BLEDevice; nfc?: NFCDevice }> = new Map();

  constructor() {
    super();
  }

  trackScan(): void {
    this.stats.totalScans++;
    this.stats.lastScanTime = new Date();
    this.emit('statsUpdate', this.getStats());
  }

  trackDevice(device: BLEDevice | NFCDevice): void {
    const key = 'address' in device ? device.address : device.uid;
    const existing = this.deviceMap.get(key) || {};

    if ('address' in device) {
      existing.ble = device;
    } else {
      existing.nfc = device;
    }

    this.deviceMap.set(key, existing);
    this.stats.devicesFound = this.deviceMap.size;
    this.emit('statsUpdate', this.getStats());
  }

  trackCorrelation(result: CorrelationResult): void {
    this.stats.correlationsFound++;
    this.confidenceSum += result.confidence;
    this.stats.averageConfidence = this.confidenceSum / this.stats.correlationsFound;
    this.emit('statsUpdate', this.getStats());
  }

  getStats(): ProximityStats {
    return { ...this.stats };
  }

  reset(): void {
    this.stats = {
      totalScans: 0,
      devicesFound: 0,
      correlationsFound: 0,
      averageConfidence: 0,
      lastScanTime: new Date()
    };
    this.confidenceSum = 0;
    this.deviceMap.clear();
    this.emit('statsReset');
  }

  getDeviceCounts(): { ble: number; nfc: number } {
    let bleCount = 0;
    let nfcCount = 0;

    for (const device of this.deviceMap.values()) {
      if (device.ble) bleCount++;
      if (device.nfc) nfcCount++;
    }

    return { ble: bleCount, nfc: nfcCount };
  }

  getActiveDevices(): { ble: BLEDevice[]; nfc: NFCDevice[] } {
    const bleDevices: BLEDevice[] = [];
    const nfcDevices: NFCDevice[] = [];

    for (const device of this.deviceMap.values()) {
      if (device.ble) bleDevices.push(device.ble);
      if (device.nfc) nfcDevices.push(device.nfc);
    }

    return { ble: bleDevices, nfc: nfcDevices };
  }
} 