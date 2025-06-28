/**
 * Lilith Core™ - RFID Signal Processing Engine
 * 
 * The silent hunter of electromagnetic whispers,
 * capturing and emulating the digital keys of the physical world.
 */

export type SignalType = 'LF' | 'HF';
export type ProtocolType = 'MIFARE' | 'HID' | 'EM4100' | 'UNKNOWN';

export interface SignalMetadata {
  timestamp: Date;
  signalType: SignalType;
  protocol: ProtocolType;
  frequency: number;
  strength: number;
  duration: number;
  encryption?: {
    type: string;
    strength: number;
  };
}

export interface CapturedSignal {
  rawData: Buffer;
  metadata: SignalMetadata;
  fingerprint: string;
  decodedData?: Buffer;
}

export interface EmulationConfig {
  signalType: SignalType;
  protocol: ProtocolType;
  data: Buffer;
  repeatCount?: number;
  interval?: number;
  encryption?: {
    type: string;
    key: Buffer;
  };
}

export interface ProxmarkDevice {
  port: string;
  firmware: string;
  status: 'connected' | 'disconnected';
  capabilities: string[];
}

export interface CaptureResult {
  success: boolean;
  signal?: CapturedSignal;
  error?: Error;
  deviceInfo: ProxmarkDevice;
}

export interface EmulationResult {
  success: boolean;
  duration: number;
  error?: Error;
  deviceInfo: ProxmarkDevice;
} 