import { EventEmitter } from 'events';
import { LilithVehicleRegistry } from './vehicle-registry';
import { LilithCANInjector } from './can-injector';
import { 
  VehicleSystem, 
  OverrideCommand, 
  OverrideResult, 
  OverrideSession,
  OverrideType,
  OverrideMode 
} from './types';

export class LilithVehicularOverrideOrchestrator extends EventEmitter {
  private vehicleRegistry: LilithVehicleRegistry;
  private canInjectors: Map<string, LilithCANInjector> = new Map();
  private activeSessions: Map<string, OverrideSession> = new Map();
  private commandQueue: OverrideCommand[] = [];
  private isActive: boolean = false;

  constructor() {
    super();
    this.vehicleRegistry = new LilithVehicleRegistry();
    this.initializeCANInjectors();
  }

  private initializeCANInjectors(): void {
    const vehicles = this.vehicleRegistry.getAllVehicles();
    
    for (const vehicle of vehicles) {
      if (vehicle.protocols.can) {
        const injector = new LilithCANInjector(vehicle.protocols.can);
        this.canInjectors.set(vehicle.id, injector);
        
        // Set up event listeners for each injector
        injector.on('injectionComplete', ({ command, result }) => {
          this.handleInjectionComplete(command, result);
        });
        
        injector.on('injectionError', ({ command, result }) => {
          this.handleInjectionError(command, result);
        });
        
        injector.on('systemWrite', ({ system, data }) => {
          this.emit('systemWrite', { vehicleId: vehicle.id, system, data });
        });
        
        injector.on('systemExecute', ({ system, data }) => {
          this.emit('systemExecute', { vehicleId: vehicle.id, system, data });
        });
        
        injector.on('securityBypass', ({ data }) => {
          this.emit('securityBypass', { vehicleId: vehicle.id, data });
        });
        
        injector.on('messageInjection', ({ message }) => {
          this.emit('messageInjection', { vehicleId: vehicle.id, message });
        });
        
        injector.on('busHijack', ({ system, data }) => {
          this.emit('busHijack', { vehicleId: vehicle.id, system, data });
        });
      }
    }
  }

  async startSession(vehicleId: string, metadata: { user: string; purpose: string; security: string }): Promise<string> {
    const vehicle = this.vehicleRegistry.getVehicle(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehicle not found: ${vehicleId}`);
    }

    const sessionId = `session_${vehicleId}_${Date.now()}`;
    const session: OverrideSession = {
      id: sessionId,
      vehicleId,
      startTime: new Date(),
      commands: [],
      results: [],
      status: 'active',
      metadata
    };

    this.activeSessions.set(sessionId, session);
    this.emit('sessionStarted', { session });
    
    return sessionId;
  }

  async endSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    session.endTime = new Date();
    session.status = 'completed';
    
    this.activeSessions.delete(sessionId);
    this.emit('sessionEnded', { session });
  }

  async executeCommand(sessionId: string, command: Omit<OverrideCommand, 'id' | 'timestamp'>): Promise<OverrideResult> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    const fullCommand: OverrideCommand = {
      ...command,
      id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    session.commands.push(fullCommand);
    
    const injector = this.canInjectors.get(command.vehicleId);
    if (!injector) {
      throw new Error(`No CAN injector found for vehicle: ${command.vehicleId}`);
    }

    const result = await injector.injectMessage(fullCommand);
    session.results.push(result);
    
    this.emit('commandExecuted', { sessionId, command: fullCommand, result });
    
    return result;
  }

  async executeBatchCommands(sessionId: string, commands: Omit<OverrideCommand, 'id' | 'timestamp'>[]): Promise<OverrideResult[]> {
    const results: OverrideResult[] = [];
    
    for (const command of commands) {
      try {
        const result = await this.executeCommand(sessionId, command);
        results.push(result);
      } catch (error) {
        const errorResult: OverrideResult = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date(),
          duration: 0,
          metadata: {
            system: command.system,
            mode: command.mode,
            vehicleId: command.vehicleId,
            protocol: 'CAN'
          }
        };
        results.push(errorResult);
      }
    }
    
    return results;
  }

  async startContinuousOverride(sessionId: string, command: Omit<OverrideCommand, 'id' | 'timestamp'>, interval: number): Promise<string> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session not found: ${sessionId}`);
    }

    const injector = this.canInjectors.get(command.vehicleId);
    if (!injector) {
      throw new Error(`No CAN injector found for vehicle: ${command.vehicleId}`);
    }

    const fullCommand: OverrideCommand = {
      ...command,
      id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    const injectionId = `${sessionId}_${fullCommand.id}`;
    injector.startContinuousInjection(fullCommand, interval);
    
    this.emit('continuousOverrideStarted', { sessionId, command: fullCommand, interval, injectionId });
    
    return injectionId;
  }

  stopContinuousOverride(injectionId: string): void {
    const [sessionId] = injectionId.split('_');
    const session = this.activeSessions.get(sessionId);
    
    if (session) {
      const injector = this.canInjectors.get(session.vehicleId);
      if (injector) {
        injector.stopContinuousInjection(injectionId);
        this.emit('continuousOverrideStopped', { injectionId });
      }
    }
  }

  private handleInjectionComplete(command: OverrideCommand, result: OverrideResult): void {
    this.emit('injectionComplete', { command, result });
    
    // Update vehicle last override timestamp
    this.vehicleRegistry.updateVehicleLastOverride(command.vehicleId);
  }

  private handleInjectionError(command: OverrideCommand, result: OverrideResult): void {
    this.emit('injectionError', { command, result });
  }

  // Vehicle management methods
  getVehicle(id: string): VehicleSystem | undefined {
    return this.vehicleRegistry.getVehicle(id);
  }

  getAllVehicles(): VehicleSystem[] {
    return this.vehicleRegistry.getAllVehicles();
  }

  getVehiclesByType(type: string): VehicleSystem[] {
    return this.vehicleRegistry.getVehiclesByType(type as any);
  }

  updateVehicleStatus(id: string, status: VehicleSystem['status']): void {
    this.vehicleRegistry.updateVehicleStatus(id, status);
    this.emit('vehicleStatusUpdate', { vehicleId: id, status });
  }

  // Session management methods
  getSession(sessionId: string): OverrideSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  getAllSessions(): OverrideSession[] {
    return Array.from(this.activeSessions.values());
  }

  getActiveSessions(): OverrideSession[] {
    return this.getAllSessions().filter(session => session.status === 'active');
  }

  // Command management methods
  getCommandQueue(): OverrideCommand[] {
    return [...this.commandQueue];
  }

  addToCommandQueue(command: OverrideCommand): void {
    this.commandQueue.push(command);
    this.emit('commandQueued', { command });
  }

  clearCommandQueue(): void {
    this.commandQueue = [];
    this.emit('commandQueueCleared');
  }

  // Utility methods
  getVehicleSystems(vehicleId: string): VehicleSystem['systems'] | undefined {
    const vehicle = this.vehicleRegistry.getVehicle(vehicleId);
    return vehicle?.systems;
  }

  getVehicleProtocols(vehicleId: string): VehicleSystem['protocols'] | undefined {
    const vehicle = this.vehicleRegistry.getVehicle(vehicleId);
    return vehicle?.protocols;
  }

  // Emergency methods
  emergencyStop(vehicleId: string): void {
    const injector = this.canInjectors.get(vehicleId);
    if (injector) {
      injector.stopAllInjections();
      this.emit('emergencyStop', { vehicleId });
    }
  }

  emergencyStopAll(): void {
    for (const injector of this.canInjectors.values()) {
      injector.stopAllInjections();
    }
    this.emit('emergencyStopAll');
  }

  // Statistics methods
  getSessionStatistics(sessionId: string): {
    totalCommands: number;
    successfulCommands: number;
    failedCommands: number;
    averageDuration: number;
  } {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      return { totalCommands: 0, successfulCommands: 0, failedCommands: 0, averageDuration: 0 };
    }

    const totalCommands = session.results.length;
    const successfulCommands = session.results.filter(r => r.success).length;
    const failedCommands = totalCommands - successfulCommands;
    const averageDuration = session.results.length > 0 
      ? session.results.reduce((sum, r) => sum + r.duration, 0) / session.results.length 
      : 0;

    return { totalCommands, successfulCommands, failedCommands, averageDuration };
  }

  getOverallStatistics(): {
    totalSessions: number;
    activeSessions: number;
    totalCommands: number;
    totalVehicles: number;
  } {
    const allSessions = this.getAllSessions();
    const totalSessions = allSessions.length;
    const activeSessions = allSessions.filter(s => s.status === 'active').length;
    const totalCommands = allSessions.reduce((sum, s) => sum + s.commands.length, 0);
    const totalVehicles = this.vehicleRegistry.getAllVehicles().length;

    return { totalSessions, activeSessions, totalCommands, totalVehicles };
  }
} 