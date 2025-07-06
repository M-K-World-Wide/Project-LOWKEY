/**
 * Primal Genesis Engine™ - Enhanced Vehicular Authority System
 * 
 * The divine hand that commands the mechanical beasts,
 * now enhanced with Primal Genesis Engine™ autonomous control
 * and instant user override capabilities.
 * 
 * @author MKWW Autonomous Labs
 * @version 2.0.0
 * @license UNLICENSED
 */

// Core types and interfaces
export * from './core/types';

// Core components
export { LilithVehicleRegistry } from './core/vehicle-registry';
export { LilithCANInjector } from './core/can-injector';
export { LilithVehicularOverrideOrchestrator } from './core/orchestrator';

// Primal Genesis Engine integration
import { PrimalGenesisEngine, UserOverride } from '../primal-genesis';

// Enhanced vehicular authority orchestrator
import { VehicularAuthorityOrchestrator } from './authority-orchestrator';

// Main orchestrator instance with authority integration
export const vehicularAuthority = new VehicularAuthorityOrchestrator();

// Primal Genesis Engine instance for autonomous control
export const primalGenesisEngine = new PrimalGenesisEngine({
  authority: 'primary',
  quantum: true,
  divine: true,
  optimization: true,
  audit: true
});

// User override instance for ultimate authority
export const userOverride = new UserOverride({
  authority: 'ultimate',
  instant: true,
  emergency: true,
  validation: true
});

// Legacy compatibility exports
export const lilithVehicularOverride = vehicularAuthority;

// Enhanced authority functions
export const startAutonomousControl = (vehicleId: string, options: {
  mode: 'autonomous' | 'manual' | 'hybrid';
  optimization: 'performance' | 'efficiency' | 'balance';
  security: 'basic' | 'enhanced' | 'quantum';
}) => vehicularAuthority.startAutonomousControl(vehicleId, options);

export const userOverride = (vehicleId: string, command: {
  system: string;
  command: string;
  authority: 'ultimate';
  instant: boolean;
}) => vehicularAuthority.userOverride(vehicleId, command);

export const emergencyOverride = (vehicleId: string, command: {
  command: string;
  data?: any;
}) => vehicularAuthority.emergencyOverride(vehicleId, command);

// Authority status and monitoring
export const getAuthorityStatus = () => vehicularAuthority.getAuthorityStatus();
export const getAuthorityStatistics = () => vehicularAuthority.getAuthorityStatistics();
export const getPrimalGenesisStatus = () => primalGenesisEngine.getStatus();
export const getUserOverrideStatus = () => userOverride.getStatus();

// Convenience functions for quick access (enhanced with authority)
export const getVehicle = (id: string) => vehicularAuthority.getVehicle(id);
export const getAllVehicles = () => vehicularAuthority.getAllVehicles();
export const getVehiclesByType = (type: string) => vehicularAuthority.getVehiclesByType(type);

// Enhanced session management with authority
export const startSession = (vehicleId: string, metadata: { 
  user: string; 
  purpose: string; 
  security: string;
  authority?: 'primary' | 'ultimate';
}) => vehicularAuthority.startSession(vehicleId, metadata);

export const endSession = (sessionId: string) => 
  vehicularAuthority.endSession(sessionId);

export const executeCommand = (sessionId: string, command: any) => 
  vehicularAuthority.executeCommand(sessionId, command);

// Enhanced emergency controls with authority
export const emergencyStop = (vehicleId: string) => 
  vehicularAuthority.emergencyStop(vehicleId);

export const emergencyStopAll = () => 
  vehicularAuthority.emergencyStopAll();

// Authority-specific emergency controls
export const emergencyAuthorityHandoff = (vehicleId: string) => 
  vehicularAuthority.emergencyAuthorityHandoff(vehicleId);

export const emergencySystemOverride = (vehicleId: string, system: string) => 
  vehicularAuthority.emergencySystemOverride(vehicleId, system);

// Enhanced statistics with authority metrics
export const getStatistics = () => vehicularAuthority.getOverallStatistics();
export const getAuthorityMetrics = () => vehicularAuthority.getAuthorityMetrics();

// Event handling (enhanced with authority events)
export const on = (event: string, callback: (...args: any[]) => void) => 
  vehicularAuthority.on(event, callback);

export const off = (event: string, callback: (...args: any[]) => void) => 
  vehicularAuthority.off(event, callback);

// Authority event handling
export const onAuthorityEvent = (event: string, callback: (...args: any[]) => void) => 
  vehicularAuthority.onAuthorityEvent(event, callback);

export const onUserOverride = (callback: (...args: any[]) => void) => 
  vehicularAuthority.onUserOverride(callback);

export const onEmergencyOverride = (callback: (...args: any[]) => void) => 
  vehicularAuthority.onEmergencyOverride(callback);

// Primal Genesis Engine control
export const startPrimalGenesisAutonomous = () => 
  primalGenesisEngine.startAutonomousMode();

export const stopPrimalGenesisAutonomous = () => 
  primalGenesisEngine.stopAutonomousMode();

export const executePrimalGenesisCommand = (command: any) => 
  primalGenesisEngine.executeCommand(command);

// User override control
export const executeUserOverride = (system: string, subsystem: string, command: {
  command: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timeout?: number;
  data?: any;
}) => userOverride.instantTakeover(system, subsystem, command);

export const executeEmergencyOverride = (system: string, command: {
  command: string;
  data?: any;
}) => userOverride.emergencyOverride(system, command);

// Authority system initialization
export const initializeAuthoritySystem = async () => {
  try {
    // Initialize Primal Genesis Engine
    await primalGenesisEngine.initialize();
    
    // Initialize User Override
    await userOverride.initialize();
    
    // Initialize Vehicular Authority
    await vehicularAuthority.initialize();
    
    console.log('🏛️ Authority system initialized with divine precision');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize authority system:', error);
    throw error;
  }
};

// Authority system shutdown
export const shutdownAuthoritySystem = async () => {
  try {
    // Stop autonomous mode
    await primalGenesisEngine.stopAutonomousMode();
    
    // Clear user overrides
    userOverride.clearOverrides();
    
    // Shutdown vehicular authority
    await vehicularAuthority.shutdown();
    
    console.log('🛑 Authority system shutdown complete');
    return true;
  } catch (error) {
    console.error('❌ Failed to shutdown authority system:', error);
    throw error;
  }
};

// Default export
export default vehicularAuthority; 