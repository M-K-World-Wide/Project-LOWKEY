/**
 * Lilith Core™ - Vehicular Override Programming System
 * 
 * The divine hand that commands the mechanical beasts,
 * bending steel and silicon to our cosmic will.
 */

export type VehicleType = 'mercedes' | 'escalade' | 'demon' | 'm3' | 'tesla' | 'bmw' | 'audi' | 'porsche';
export type OverrideType = 'engine' | 'transmission' | 'brakes' | 'steering' | 'security' | 'entertainment' | 'climate' | 'lights';
export type OverrideMode = 'read' | 'write' | 'execute' | 'bypass' | 'inject' | 'hijack';

export interface VehicleSystem {
  id: string;
  name: string;
  type: VehicleType;
  year: number;
  make: string;
  model: string;
  vin: string;
  systems: {
    engine?: EngineSystem;
    transmission?: TransmissionSystem;
    brakes?: BrakeSystem;
    steering?: SteeringSystem;
    security?: SecuritySystem;
    entertainment?: EntertainmentSystem;
    climate?: ClimateSystem;
    lights?: LightSystem;
  };
  protocols: {
    can?: CANProtocol;
    lin?: LINProtocol;
    flexray?: FlexRayProtocol;
    ethernet?: EthernetProtocol;
  };
  status: 'active' | 'inactive' | 'maintenance' | 'compromised';
  lastOverride?: Date;
}

export interface EngineSystem {
  ecu: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  cylinders: number;
  displacement: number;
  power: number; // HP
  torque: number; // Nm
  rpm: {
    idle: number;
    redline: number;
    current: number;
  };
  temperature: number;
  oilPressure: number;
  fuelLevel: number;
  throttlePosition: number;
  injectorPulse: number;
  ignitionTiming: number;
}

export interface TransmissionSystem {
  type: 'manual' | 'automatic' | 'cvt' | 'dct';
  gears: number;
  currentGear: number;
  gearRatio: number[];
  clutchEngagement: number;
  shiftPoint: number;
  fluidTemperature: number;
  pressure: number;
}

export interface BrakeSystem {
  type: 'disc' | 'drum' | 'regenerative';
  pressure: number;
  temperature: number;
  wear: number;
  abs: boolean;
  traction: boolean;
  stability: boolean;
  emergency: boolean;
}

export interface SteeringSystem {
  type: 'manual' | 'power' | 'electric';
  angle: number;
  torque: number;
  speed: number;
  assist: number;
  lock: boolean;
}

export interface SecuritySystem {
  immobilizer: boolean;
  alarm: boolean;
  centralLock: boolean;
  keylessEntry: boolean;
  proximity: boolean;
  biometric: boolean;
  encryption: string;
  challenge: Buffer;
}

export interface EntertainmentSystem {
  headUnit: string;
  speakers: number;
  amplifier: boolean;
  bluetooth: boolean;
  wifi: boolean;
  cellular: boolean;
  gps: boolean;
  volume: number;
  source: string;
}

export interface ClimateSystem {
  temperature: number;
  fanSpeed: number;
  mode: string;
  defrost: boolean;
  recirculation: boolean;
  humidity: number;
  airQuality: number;
}

export interface LightSystem {
  headlights: boolean;
  highBeam: boolean;
  fogLights: boolean;
  turnSignals: boolean;
  brakeLights: boolean;
  interior: boolean;
  brightness: number;
  auto: boolean;
}

export interface CANProtocol {
  baudRate: number;
  nodes: CANNode[];
  messages: CANMessage[];
  filters: CANFilter[];
}

export interface CANNode {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
}

export interface CANMessage {
  id: number;
  name: string;
  data: Buffer;
  dlc: number;
  frequency: number;
  priority: number;
}

export interface CANFilter {
  id: number;
  mask: number;
  type: 'accept' | 'reject';
}

export interface LINProtocol {
  master: string;
  slaves: string[];
  baudRate: number;
  messages: LINMessage[];
}

export interface LINMessage {
  id: number;
  data: Buffer;
  checksum: number;
}

export interface FlexRayProtocol {
  channels: number;
  cycleTime: number;
  messages: FlexRayMessage[];
}

export interface FlexRayMessage {
  id: number;
  data: Buffer;
  cycle: number;
  slot: number;
}

export interface EthernetProtocol {
  speed: number;
  ip: string;
  mac: string;
  services: string[];
}

export interface OverrideCommand {
  id: string;
  vehicleId: string;
  system: OverrideType;
  mode: OverrideMode;
  data: Buffer;
  timestamp: Date;
  priority: number;
  timeout: number;
  callback?: (result: OverrideResult) => void;
}

export interface OverrideResult {
  success: boolean;
  data?: Buffer;
  error?: string;
  timestamp: Date;
  duration: number;
  metadata: {
    system: OverrideType;
    mode: OverrideMode;
    vehicleId: string;
    protocol: string;
  };
}

export interface OverrideSession {
  id: string;
  vehicleId: string;
  startTime: Date;
  endTime?: Date;
  commands: OverrideCommand[];
  results: OverrideResult[];
  status: 'active' | 'completed' | 'failed' | 'cancelled';
  metadata: {
    user: string;
    purpose: string;
    security: string;
  };
} 