/**
 * Lilith Core™ - Proximity Suite
 * 
 * The silent watcher of digital whispers,
 * correlating the electromagnetic signatures of the physical world.
 */

export interface BLEDevice {
  address: string;
  name?: string;
  rssi: number;
  distance?: number;
  timestamp: Date;
  manufacturerData?: Buffer;
  serviceData?: Map<string, Buffer>;
  services?: string[];
}

export interface NFCDevice {
  uid: string;
  type: string;
  timestamp: Date;
  ndefData?: NDEFRecord[];
  status: 'active' | 'inactive' | 'unknown';
}

export interface NDEFRecord {
  tnf: number;
  type: Buffer;
  id?: Buffer;
  payload: Buffer;
}

export interface ProximityEvent {
  timestamp: Date;
  type: 'discovery' | 'correlation' | 'activation';
  data: any;
}

export interface CorrelationResult {
  bleDevice: BLEDevice;
  nfcDevice: NFCDevice;
  confidence: number;
  timestamp: Date;
  metadata: {
    distance: number;
    signalStrength: number;
    matchType: 'exact' | 'partial' | 'temporal';
  };
}

export interface WebhookConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string>;
  payload?: Record<string, any>;
  retryCount?: number;
  timeout?: number;
}

export interface StealthConfig {
  powerMode: 'low' | 'normal' | 'high';
  ledActivity: boolean;
  scanInterval: number;
  correlationThreshold: number;
}

export interface MirrorConfig {
  duration: number;
  signalType: 'ble' | 'nfc';
  device: BLEDevice | NFCDevice;
  options?: {
    powerLevel?: number;
    repeatCount?: number;
    interval?: number;
  };
}

export interface ProximityStats {
  totalScans: number;
  devicesFound: number;
  correlationsFound: number;
  averageConfidence: number;
  lastScanTime: Date;
} 