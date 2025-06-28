/**
 * Lilith Core™ - Vehicular Override Programming System
 * 
 * The divine hand that commands the mechanical beasts,
 * bending steel and silicon to our cosmic will.
 */

// Core types and interfaces
export * from './core/types';

// Core components
export { LilithVehicleRegistry } from './core/vehicle-registry';
export { LilithCANInjector } from './core/can-injector';
export { LilithVehicularOverrideOrchestrator } from './core/orchestrator';

// Main orchestrator instance
import { LilithVehicularOverrideOrchestrator } from './core/orchestrator';

// Create and export a default orchestrator instance
export const lilithVehicularOverride = new LilithVehicularOverrideOrchestrator();

// Convenience functions for quick access
export const getVehicle = (id: string) => lilithVehicularOverride.getVehicle(id);
export const getAllVehicles = () => lilithVehicularOverride.getAllVehicles();
export const getVehiclesByType = (type: string) => lilithVehicularOverride.getVehiclesByType(type);

// Quick session management
export const startSession = (vehicleId: string, metadata: { user: string; purpose: string; security: string }) => 
  lilithVehicularOverride.startSession(vehicleId, metadata);

export const endSession = (sessionId: string) => 
  lilithVehicularOverride.endSession(sessionId);

export const executeCommand = (sessionId: string, command: any) => 
  lilithVehicularOverride.executeCommand(sessionId, command);

// Emergency controls
export const emergencyStop = (vehicleId: string) => 
  lilithVehicularOverride.emergencyStop(vehicleId);

export const emergencyStopAll = () => 
  lilithVehicularOverride.emergencyStopAll();

// Statistics
export const getStatistics = () => lilithVehicularOverride.getOverallStatistics();

// Event handling
export const on = (event: string, callback: (...args: any[]) => void) => 
  lilithVehicularOverride.on(event, callback);

export const off = (event: string, callback: (...args: any[]) => void) => 
  lilithVehicularOverride.off(event, callback);

// Default export
export default lilithVehicularOverride; 