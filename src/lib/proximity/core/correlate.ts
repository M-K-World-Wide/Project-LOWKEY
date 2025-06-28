import { EventEmitter } from 'events';
import { 
  BLEDevice, 
  NFCDevice, 
  CorrelationResult, 
  ProximityEvent,
  StealthConfig 
} from './types';

export class LilithCorrelator extends EventEmitter {
  private bleDevices: Map<string, BLEDevice> = new Map();
  private nfcDevices: Map<string, NFCDevice> = new Map();
  private stealthConfig: StealthConfig;
  private correlationInterval: NodeJS.Timeout | null = null;

  constructor(config: Partial<StealthConfig> = {}) {
    super();
    this.stealthConfig = {
      powerMode: config.powerMode || 'normal',
      ledActivity: config.ledActivity ?? true,
      scanInterval: config.scanInterval || 1000,
      correlationThreshold: config.correlationThreshold || 0.8
    };
  }

  startCorrelation(): void {
    if (this.correlationInterval) {
      return;
    }

    this.correlationInterval = setInterval(() => {
      this.performCorrelation();
    }, this.stealthConfig.scanInterval);

    this.emit('correlationStart', { timestamp: new Date() });
  }

  stopCorrelation(): void {
    if (!this.correlationInterval) {
      return;
    }

    clearInterval(this.correlationInterval);
    this.correlationInterval = null;

    this.emit('correlationStop', { timestamp: new Date() });
  }

  addBLEDevice(device: BLEDevice): void {
    this.bleDevices.set(device.address, device);
  }

  addNFCDevice(device: NFCDevice): void {
    this.nfcDevices.set(device.uid, device);
  }

  private performCorrelation(): void {
    const results: CorrelationResult[] = [];

    for (const bleDevice of this.bleDevices.values()) {
      for (const nfcDevice of this.nfcDevices.values()) {
        const correlation = this.correlateDevices(bleDevice, nfcDevice);
        if (correlation.confidence >= this.stealthConfig.correlationThreshold) {
          results.push(correlation);
        }
      }
    }

    if (results.length > 0) {
      this.emit('correlationFound', results);
    }
  }

  private correlateDevices(bleDevice: BLEDevice, nfcDevice: NFCDevice): CorrelationResult {
    const timestamp = new Date();
    const timeDiff = Math.abs(timestamp.getTime() - bleDevice.timestamp.getTime());
    const distance = bleDevice.distance || 0;
    const signalStrength = this.calculateSignalStrength(bleDevice, nfcDevice);

    let confidence = 0;
    let matchType: 'exact' | 'partial' | 'temporal' = 'temporal';

    // Temporal correlation
    if (timeDiff < 5000) { // Within 5 seconds
      confidence += 0.3;
    }

    // Spatial correlation
    if (distance < 1.0) { // Within 1 meter
      confidence += 0.4;
    }

    // Signal strength correlation
    if (signalStrength > 0.7) {
      confidence += 0.3;
      matchType = 'exact';
    } else if (signalStrength > 0.4) {
      confidence += 0.2;
      matchType = 'partial';
    }

    return {
      bleDevice,
      nfcDevice,
      confidence,
      timestamp,
      metadata: {
        distance,
        signalStrength,
        matchType
      }
    };
  }

  private calculateSignalStrength(bleDevice: BLEDevice, nfcDevice: NFCDevice): number {
    // Implementation coming soon - will use actual signal strength calculation
    // This is a placeholder for the actual signal strength calculation
    return 0.8;
  }

  clearDevices(): void {
    this.bleDevices.clear();
    this.nfcDevices.clear();
  }

  updateStealthConfig(config: Partial<StealthConfig>): void {
    this.stealthConfig = {
      ...this.stealthConfig,
      ...config
    };

    if (this.correlationInterval) {
      clearInterval(this.correlationInterval);
      this.correlationInterval = setInterval(() => {
        this.performCorrelation();
      }, this.stealthConfig.scanInterval);
    }
  }
} 