import { EventEmitter } from 'events';
import { LilithBLESniffer } from './ble_sniffer';
import { LilithNFCScanner } from './nfc_scanner';
import { LilithCorrelator } from './correlate';
import { LilithStatsTracker } from './stats';
import { LilithVehicleManager } from '../integrations/vehicles';
import { LilithDeviceManager } from '../integrations/devices';
import { StealthConfig, ProximityEvent, CorrelationResult } from './types';

/**
 * Quantum-detailed: Authority detection and integration for Proximity Suite™
 * 📋 Integrates Primal Genesis Engine authority and user override into proximity detection and correlation.
 * 🧩 Feature Context: Enables authority-controlled proximity events, override, and audit logging.
 */

detectAuthorityEvent(event: any): void {
  // TODO: Implement authority detection logic
  this.emit('authorityEventDetected', { event });
}

auditProximityAction(action: string, details: any): void {
  // TODO: Log proximity action to authority audit trail
}

export class LilithProximityOrchestrator extends EventEmitter {
  private bleSniffer: LilithBLESniffer;
  private nfcScanner: LilithNFCScanner;
  private correlator: LilithCorrelator;
  private statsTracker: LilithStatsTracker;
  private vehicleManager: LilithVehicleManager;
  private deviceManager: LilithDeviceManager;
  private isActive: boolean = false;

  constructor(config: Partial<StealthConfig> = {}) {
    super();
    
    this.bleSniffer = new LilithBLESniffer(config);
    this.nfcScanner = new LilithNFCScanner(config);
    this.correlator = new LilithCorrelator(config);
    this.statsTracker = new LilithStatsTracker();
    this.vehicleManager = new LilithVehicleManager();
    this.deviceManager = new LilithDeviceManager();

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // BLE Events
    this.bleSniffer.on('deviceDiscovered', (device) => {
      this.statsTracker.trackDevice(device);
      this.correlator.addBLEDevice(device);
      this.vehicleManager.processDeviceDiscovery(device);
      this.deviceManager.processDeviceDiscovery(device);
      this.emit('deviceDiscovered', { type: 'discovery', data: { type: 'ble', device } });
    });

    // NFC Events
    this.nfcScanner.on('deviceDiscovered', (device) => {
      this.statsTracker.trackDevice(device);
      this.correlator.addNFCDevice(device);
      this.vehicleManager.processDeviceDiscovery(device);
      this.deviceManager.processDeviceDiscovery(device);
      this.emit('deviceDiscovered', { type: 'discovery', data: { type: 'nfc', device } });
    });

    // Correlation Events
    this.correlator.on('correlationFound', (results: CorrelationResult[]) => {
      results.forEach(result => {
        this.statsTracker.trackCorrelation(result);
        this.vehicleManager.processCorrelation(result);
        this.deviceManager.processCorrelation(result);
        this.emit('correlationFound', { type: 'correlation', data: result });
      });
    });

    // Stats Events
    this.statsTracker.on('statsUpdate', (stats) => {
      this.emit('statsUpdate', { type: 'stats', data: stats });
    });

    // Vehicle Events
    this.vehicleManager.on('vehicleDetected', ({ vehicle, device }) => {
      this.emit('vehicleDetected', { type: 'vehicle', data: { vehicle, device } });
    });

    this.vehicleManager.on('vehicleCorrelated', ({ vehicle, correlation }) => {
      this.emit('vehicleCorrelated', { type: 'vehicle', data: { vehicle, correlation } });
    });

    this.vehicleManager.on('vehicleStatusUpdate', ({ vehicle }) => {
      this.emit('vehicleStatusUpdate', { type: 'vehicle', data: { vehicle } });
    });

    // Device Events
    this.deviceManager.on('deviceDetected', ({ device, discovered }) => {
      this.emit('deviceDetected', { type: 'device', data: { device, discovered } });
    });

    this.deviceManager.on('deviceCorrelated', ({ device, correlation }) => {
      this.emit('deviceCorrelated', { type: 'device', data: { device, correlation } });
    });

    this.deviceManager.on('deviceStatusUpdate', ({ device }) => {
      this.emit('deviceStatusUpdate', { type: 'device', data: { device } });
    });
  }

  async start(): Promise<void> {
    if (this.isActive) return;

    try {
      await this.bleSniffer.startScan();
      await this.nfcScanner.startScan();
      this.correlator.startCorrelation();
      this.isActive = true;

      this.emit('started', { type: 'system', data: { timestamp: new Date() } });
    } catch (error) {
      this.emit('error', { type: 'error', data: { error, timestamp: new Date() } });
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isActive) return;

    try {
      await this.bleSniffer.stopScan();
      await this.nfcScanner.stopScan();
      this.correlator.stopCorrelation();
      this.isActive = false;

      this.emit('stopped', { type: 'system', data: { timestamp: new Date() } });
    } catch (error) {
      this.emit('error', { type: 'error', data: { error, timestamp: new Date() } });
      throw error;
    }
  }

  updateConfig(config: Partial<StealthConfig>): void {
    this.bleSniffer.updateStealthConfig(config);
    this.nfcScanner.updateStealthConfig(config);
    this.correlator.updateStealthConfig(config);
  }

  getStats() {
    return this.statsTracker.getStats();
  }

  getDeviceCounts() {
    return this.statsTracker.getDeviceCounts();
  }

  getActiveDevices() {
    return this.statsTracker.getActiveDevices();
  }

  getVehicles() {
    return this.vehicleManager.getAllVehicles();
  }

  getDevices() {
    return this.deviceManager.getAllDevices();
  }

  getVehicleCorrelations() {
    return this.vehicleManager.getActiveCorrelations();
  }

  getDeviceCorrelations() {
    return this.deviceManager.getActiveCorrelations();
  }

  updateVehicleStatus(id: string, status: 'active' | 'inactive' | 'maintenance'): void {
    this.vehicleManager.updateVehicleStatus(id, status);
  }

  updateDeviceStatus(id: string, status: 'active' | 'inactive' | 'sleep'): void {
    this.deviceManager.updateDeviceStatus(id, status);
  }

  reset(): void {
    this.statsTracker.reset();
    this.correlator.clearDevices();
    this.emit('reset', { type: 'system', data: { timestamp: new Date() } });
  }
} 