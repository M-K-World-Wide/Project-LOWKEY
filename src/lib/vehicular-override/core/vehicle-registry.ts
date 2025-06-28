import { VehicleSystem, VehicleType } from './types';

export class LilithVehicleRegistry {
  private vehicles: Map<string, VehicleSystem> = new Map();

  constructor() {
    this.initializeVehicles();
  }

  private initializeVehicles(): void {
    // 2014 Mercedes
    this.vehicles.set('mercedes2014', {
      id: 'mercedes2014',
      name: 'LilithOS 2014 Mercedes',
      type: 'mercedes',
      year: 2014,
      make: 'Mercedes-Benz',
      model: 'S-Class',
      vin: 'WDDNG7JB0FA123456',
      systems: {
        engine: {
          ecu: 'ME17.7.3',
          fuelType: 'gasoline',
          cylinders: 8,
          displacement: 4.7,
          power: 449,
          torque: 700,
          rpm: { idle: 750, redline: 6500, current: 0 },
          temperature: 90,
          oilPressure: 3.2,
          fuelLevel: 75,
          throttlePosition: 0,
          injectorPulse: 2.1,
          ignitionTiming: 15
        },
        transmission: {
          type: 'automatic',
          gears: 7,
          currentGear: 0,
          gearRatio: [4.38, 2.86, 1.92, 1.37, 1.00, 0.82, 0.73],
          clutchEngagement: 0,
          shiftPoint: 2500,
          fluidTemperature: 85,
          pressure: 12.5
        },
        brakes: {
          type: 'disc',
          pressure: 0,
          temperature: 25,
          wear: 15,
          abs: true,
          traction: true,
          stability: true,
          emergency: false
        },
        steering: {
          type: 'power',
          angle: 0,
          torque: 0,
          speed: 0,
          assist: 100,
          lock: true
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: false,
          encryption: 'AES-256',
          challenge: Buffer.from('0123456789ABCDEF', 'hex')
        },
        entertainment: {
          headUnit: 'COMAND Online',
          speakers: 13,
          amplifier: true,
          bluetooth: true,
          wifi: true,
          cellular: true,
          gps: true,
          volume: 0,
          source: 'off'
        },
        climate: {
          temperature: 22,
          fanSpeed: 0,
          mode: 'auto',
          defrost: false,
          recirculation: false,
          humidity: 45,
          airQuality: 95
        },
        lights: {
          headlights: false,
          highBeam: false,
          fogLights: false,
          turnSignals: false,
          brakeLights: false,
          interior: false,
          brightness: 0,
          auto: true
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Engine ECU', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Transmission ECU', type: 'ECU', status: 'active' },
            { id: 0x002, name: 'ABS ECU', type: 'ECU', status: 'active' },
            { id: 0x003, name: 'Steering ECU', type: 'ECU', status: 'active' },
            { id: 0x004, name: 'Security ECU', type: 'ECU', status: 'active' },
            { id: 0x005, name: 'Entertainment ECU', type: 'ECU', status: 'active' },
            { id: 0x006, name: 'Climate ECU', type: 'ECU', status: 'active' },
            { id: 0x007, name: 'Light ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        },
        lin: {
          master: 'Body Control Module',
          slaves: ['Door Module', 'Seat Module', 'Mirror Module'],
          baudRate: 19200,
          messages: []
        }
      },
      status: 'active'
    });

    // 2019 Escalade
    this.vehicles.set('escalade2019', {
      id: 'escalade2019',
      name: 'LilithOS 2019 Escalade',
      type: 'escalade',
      year: 2019,
      make: 'Cadillac',
      model: 'Escalade',
      vin: '1GYUK8EF8LR123456',
      systems: {
        engine: {
          ecu: 'E92',
          fuelType: 'gasoline',
          cylinders: 8,
          displacement: 6.2,
          power: 420,
          torque: 460,
          rpm: { idle: 650, redline: 6000, current: 0 },
          temperature: 88,
          oilPressure: 3.5,
          fuelLevel: 80,
          throttlePosition: 0,
          injectorPulse: 2.3,
          ignitionTiming: 12
        },
        transmission: {
          type: 'automatic',
          gears: 10,
          currentGear: 0,
          gearRatio: [4.56, 2.97, 2.08, 1.69, 1.27, 1.00, 0.84, 0.65, 0.52, 0.40],
          clutchEngagement: 0,
          shiftPoint: 2200,
          fluidTemperature: 82,
          pressure: 11.8
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: false,
          encryption: 'AES-128',
          challenge: Buffer.from('FEDCBA9876543210', 'hex')
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Engine ECU', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Transmission ECU', type: 'ECU', status: 'active' },
            { id: 0x002, name: 'Security ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        }
      },
      status: 'active'
    });

    // 2024 Escalade
    this.vehicles.set('escalade2024', {
      id: 'escalade2024',
      name: 'LilithOS 2024 Escalade',
      type: 'escalade',
      year: 2024,
      make: 'Cadillac',
      model: 'Escalade',
      vin: '1GYUK8EF8LR789012',
      systems: {
        engine: {
          ecu: 'E99',
          fuelType: 'gasoline',
          cylinders: 8,
          displacement: 6.2,
          power: 420,
          torque: 460,
          rpm: { idle: 650, redline: 6000, current: 0 },
          temperature: 88,
          oilPressure: 3.5,
          fuelLevel: 80,
          throttlePosition: 0,
          injectorPulse: 2.3,
          ignitionTiming: 12
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: true,
          encryption: 'AES-256',
          challenge: Buffer.from('ABCDEF0123456789', 'hex')
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Engine ECU', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Security ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        },
        ethernet: {
          speed: 1000000000,
          ip: '192.168.1.100',
          mac: '00:11:22:33:44:55',
          services: ['HTTP', 'HTTPS', 'SSH', 'FTP']
        }
      },
      status: 'active'
    });

    // Demon Maria
    this.vehicles.set('demonmaria', {
      id: 'demonmaria',
      name: 'LilithOS Demon Maria',
      type: 'demon',
      year: 2023,
      make: 'Dodge',
      model: 'Challenger SRT Demon 170',
      vin: '2C3CDZAG8PH123456',
      systems: {
        engine: {
          ecu: 'PCM',
          fuelType: 'gasoline',
          cylinders: 8,
          displacement: 6.2,
          power: 1025,
          torque: 945,
          rpm: { idle: 800, redline: 6500, current: 0 },
          temperature: 95,
          oilPressure: 4.2,
          fuelLevel: 90,
          throttlePosition: 0,
          injectorPulse: 3.1,
          ignitionTiming: 18
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: false,
          encryption: 'AES-256',
          challenge: Buffer.from('DEMON170MARIA2023', 'hex')
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Engine ECU', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Security ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        }
      },
      status: 'active'
    });

    // Joseph M3
    this.vehicles.set('josephm3', {
      id: 'josephm3',
      name: 'LilithOS Joseph M3',
      type: 'm3',
      year: 2023,
      make: 'BMW',
      model: 'M3 Competition',
      vin: 'WBS8M9C50P5K123456',
      systems: {
        engine: {
          ecu: 'DME',
          fuelType: 'gasoline',
          cylinders: 6,
          displacement: 3.0,
          power: 503,
          torque: 650,
          rpm: { idle: 750, redline: 7200, current: 0 },
          temperature: 92,
          oilPressure: 3.8,
          fuelLevel: 85,
          throttlePosition: 0,
          injectorPulse: 2.8,
          ignitionTiming: 16
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: true,
          encryption: 'AES-256',
          challenge: Buffer.from('BMWM3JOSEPH2023', 'hex')
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Engine ECU', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Security ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        }
      },
      status: 'active'
    });

    // Mom's Tesla Y
    this.vehicles.set('momteslay', {
      id: 'momteslay',
      name: 'LilithOS Mom\'s Tesla Y',
      type: 'tesla',
      year: 2023,
      make: 'Tesla',
      model: 'Model Y',
      vin: '5YJYGDEE0PF123456',
      systems: {
        engine: {
          ecu: 'Motor Controller',
          fuelType: 'electric',
          cylinders: 0,
          displacement: 0,
          power: 384,
          torque: 450,
          rpm: { idle: 0, redline: 18000, current: 0 },
          temperature: 45,
          oilPressure: 0,
          fuelLevel: 85,
          throttlePosition: 0,
          injectorPulse: 0,
          ignitionTiming: 0
        },
        security: {
          immobilizer: true,
          alarm: true,
          centralLock: true,
          keylessEntry: true,
          proximity: true,
          biometric: true,
          encryption: 'AES-256',
          challenge: Buffer.from('TESLAYMOMMY2023', 'hex')
        }
      },
      protocols: {
        can: {
          baudRate: 500000,
          nodes: [
            { id: 0x000, name: 'Motor Controller', type: 'ECU', status: 'active' },
            { id: 0x001, name: 'Security ECU', type: 'ECU', status: 'active' }
          ],
          messages: [],
          filters: []
        },
        ethernet: {
          speed: 1000000000,
          ip: '192.168.90.100',
          mac: '00:11:22:33:44:66',
          services: ['HTTP', 'HTTPS', 'SSH', 'FTP', 'OTA']
        }
      },
      status: 'active'
    });
  }

  getVehicle(id: string): VehicleSystem | undefined {
    return this.vehicles.get(id);
  }

  getAllVehicles(): VehicleSystem[] {
    return Array.from(this.vehicles.values());
  }

  getVehiclesByType(type: VehicleType): VehicleSystem[] {
    return this.getAllVehicles().filter(vehicle => vehicle.type === type);
  }

  getVehiclesByYear(year: number): VehicleSystem[] {
    return this.getAllVehicles().filter(vehicle => vehicle.year === year);
  }

  getVehiclesByMake(make: string): VehicleSystem[] {
    return this.getAllVehicles().filter(vehicle => 
      vehicle.make.toLowerCase().includes(make.toLowerCase())
    );
  }

  updateVehicleStatus(id: string, status: VehicleSystem['status']): void {
    const vehicle = this.vehicles.get(id);
    if (vehicle) {
      vehicle.status = status;
    }
  }

  updateVehicleLastOverride(id: string): void {
    const vehicle = this.vehicles.get(id);
    if (vehicle) {
      vehicle.lastOverride = new Date();
    }
  }
} 