/**
 * User Override System™ - Ultimate Authority Component
 * 
 * Provides ultimate human authority over all Primal Genesis Engine™ operations.
 * Enables instant override capabilities for any system function with emergency
 * control protocols and divine-human interface optimization.
 * 
 * @author MKWW Autonomous Labs
 * @version 1.0.0
 * @license UNLICENSED
 */

import { EventEmitter } from 'events';
import { 
  AuthorityLevel, 
  AuthorityCommand, 
  UserOverride as UserOverrideType,
  UserApproval,
  UserOverrideOptions 
} from './types';

/**
 * User Override System™ - Ultimate Authority Implementation
 * 
 * Provides instant override capabilities for any system operation with
 * emergency control protocols and comprehensive validation.
 */
export class UserOverride extends EventEmitter {
  private authorityLevel: AuthorityLevel = AuthorityLevel.ULTIMATE;
  private instant: boolean = true;
  private emergency: boolean = true;
  private validation: boolean = true;
  private timeout: number = 0; // 0 = no timeout for ultimate authority
  private overrideCount: number = 0;
  private emergencyCount: number = 0;
  private activeOverrides: Map<string, UserOverrideType> = new Map();

  constructor(options: UserOverrideOptions = {}) {
    super();
    
    this.authorityLevel = options.authority ?? AuthorityLevel.ULTIMATE;
    this.instant = options.instant ?? true;
    this.emergency = options.emergency ?? true;
    this.validation = options.validation ?? true;
    this.timeout = options.timeout ?? 0;
    
    console.log('👤 User Override System™ initialized with ultimate authority');
  }

  /**
   * Initialize the User Override System™
   * 
   * Sets up the override system and establishes ultimate authority capabilities.
   */
  public async initialize(): Promise<void> {
    try {
      // Validate authority level
      if (this.authorityLevel !== AuthorityLevel.ULTIMATE) {
        throw new Error('User Override System™ requires ULTIMATE authority level');
      }
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Emit initialization complete event
      this.emit('initialized', {
        timestamp: Date.now(),
        authority: this.authorityLevel,
        instant: this.instant,
        emergency: this.emergency
      });

      console.log('👤 User Override System™ ready for ultimate authority operations');
    } catch (error) {
      console.error('❌ Failed to initialize User Override System™:', error);
      throw error;
    }
  }

  /**
   * Set up event listeners for override operations
   * 
   * Establishes comprehensive event monitoring for all override operations.
   */
  private setupEventListeners(): void {
    // Monitor override operations
    this.on('override', (override: UserOverrideType) => {
      this.overrideCount++;
      this.activeOverrides.set(override.id, override);
      
      // Auto-cleanup after timeout if specified
      if (this.timeout > 0) {
        setTimeout(() => {
          this.activeOverrides.delete(override.id);
        }, this.timeout);
      }
    });

    // Monitor emergency operations
    this.on('emergency', (emergency: UserOverrideType) => {
      this.emergencyCount++;
      this.activeOverrides.set(emergency.id, emergency);
      
      // Emergency overrides don't timeout
      console.log('🚨 Emergency override activated with immediate effect');
    });
  }

  /**
   * Execute instant override with ultimate authority
   * 
   * Provides immediate takeover of any system operation with divine precision.
   */
  public async instantTakeover(
    system: string, 
    subsystem: string, 
    command: {
      command: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
      timeout?: number;
      data?: any;
    }
  ): Promise<UserOverrideType> {
    try {
      const overrideId = `override_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create override command
      const overrideCommand: AuthorityCommand = {
        id: overrideId,
        type: 'override',
        data: {
          system,
          subsystem,
          command: command.command,
          data: command.data
        },
        priority: this.getPriorityLevel(command.priority),
        timeout: command.timeout ?? this.timeout,
        authority: this.authorityLevel,
        quantum: true,
        divine: true,
        metadata: {
          user: 'ultimate',
          timestamp: Date.now(),
          source: 'user-override'
        }
      };

      // Create override operation
      const override: UserOverrideType = {
        id: overrideId,
        command: overrideCommand,
        type: 'override',
        priority: this.getPriorityLevel(command.priority),
        instant: this.instant,
        timestamp: Date.now(),
        metadata: {
          user: 'ultimate',
          reason: `Instant takeover of ${system}.${subsystem}`,
          authority: this.authorityLevel
        }
      };

      // Emit override event
      this.emit('override', override);
      
      console.log(`👤 Instant override executed: ${system}.${subsystem} - ${command.command}`);
      
      return override;
    } catch (error) {
      console.error('❌ Instant override failed:', error);
      throw error;
    }
  }

  /**
   * Execute emergency override with immediate effect
   * 
   * Provides immediate emergency control with highest priority and no timeout.
   */
  public async emergencyOverride(
    system: string,
    command: {
      command: string;
      data?: any;
    }
  ): Promise<UserOverrideType> {
    try {
      const emergencyId = `emergency_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create emergency command
      const emergencyCommand: AuthorityCommand = {
        id: emergencyId,
        type: 'emergency',
        data: {
          system,
          command: command.command,
          data: command.data
        },
        priority: 10, // Highest priority
        timeout: 0, // No timeout for emergency
        authority: this.authorityLevel,
        quantum: true,
        divine: true,
        metadata: {
          user: 'ultimate',
          timestamp: Date.now(),
          source: 'user-emergency'
        }
      };

      // Create emergency operation
      const emergency: UserOverrideType = {
        id: emergencyId,
        command: emergencyCommand,
        type: 'emergency',
        priority: 10,
        instant: true,
        timestamp: Date.now(),
        metadata: {
          user: 'ultimate',
          reason: `Emergency override of ${system}`,
          authority: this.authorityLevel
        }
      };

      // Emit emergency event
      this.emit('emergency', emergency);
      
      console.log(`🚨 Emergency override executed: ${system} - ${command.command}`);
      
      return emergency;
    } catch (error) {
      console.error('❌ Emergency override failed:', error);
      throw error;
    }
  }

  /**
   * Validate command with user override system
   * 
   * Provides comprehensive command validation with user approval capabilities.
   */
  public async validateCommand(command: AuthorityCommand): Promise<UserApproval> {
    try {
      // Check if validation is enabled
      if (!this.validation) {
        return {
          approved: true,
          timestamp: Date.now(),
          metadata: {
            user: 'ultimate',
            authority: this.authorityLevel
          }
        };
      }

      // Validate command structure
      if (!command.id || !command.type || !command.data) {
        return {
          approved: false,
          reason: 'Invalid command structure',
          timestamp: Date.now(),
          metadata: {
            user: 'ultimate',
            authority: this.authorityLevel
          }
        };
      }

      // Check authority level
      if (command.authority && command.authority !== this.authorityLevel) {
        return {
          approved: false,
          reason: `Insufficient authority level. Required: ${command.authority}, Available: ${this.authorityLevel}`,
          timestamp: Date.now(),
          metadata: {
            user: 'ultimate',
            authority: this.authorityLevel
          }
        };
      }

      // For ultimate authority, all valid commands are approved
      return {
        approved: true,
        timestamp: Date.now(),
        metadata: {
          user: 'ultimate',
          authority: this.authorityLevel
        }
      };
    } catch (error) {
      console.error('❌ Command validation failed:', error);
      
      return {
        approved: false,
        reason: `Validation error: ${error.message}`,
        timestamp: Date.now(),
        metadata: {
          user: 'ultimate',
          authority: this.authorityLevel
        }
      };
    }
  }

  /**
   * Get priority level from string priority
   * 
   * Converts string priority to numeric priority level.
   */
  private getPriorityLevel(priority: 'low' | 'medium' | 'high' | 'critical'): number {
    switch (priority) {
      case 'low':
        return 1;
      case 'medium':
        return 5;
      case 'high':
        return 8;
      case 'critical':
        return 10;
      default:
        return 5;
    }
  }

  /**
   * Get override count
   * 
   * Returns the total number of overrides executed.
   */
  public getOverrideCount(): number {
    return this.overrideCount;
  }

  /**
   * Get emergency count
   * 
   * Returns the total number of emergency overrides executed.
   */
  public getEmergencyCount(): number {
    return this.emergencyCount;
  }

  /**
   * Get active overrides
   * 
   * Returns the currently active overrides.
   */
  public getActiveOverrides(): UserOverrideType[] {
    return Array.from(this.activeOverrides.values());
  }

  /**
   * Get override status
   * 
   * Returns comprehensive status information about the override system.
   */
  public getStatus(): any {
    return {
      authorityLevel: this.authorityLevel,
      instant: this.instant,
      emergency: this.emergency,
      validation: this.validation,
      timeout: this.timeout,
      overrideCount: this.overrideCount,
      emergencyCount: this.emergencyCount,
      activeOverrides: this.activeOverrides.size,
      timestamp: Date.now()
    };
  }

  /**
   * Clear all active overrides
   * 
   * Removes all active overrides from the system.
   */
  public clearOverrides(): void {
    this.activeOverrides.clear();
    console.log('👤 All active overrides cleared');
  }

  /**
   * Check if override system is active
   * 
   * Returns whether the override system is currently active.
   */
  public isActive(): boolean {
    return this.authorityLevel === AuthorityLevel.ULTIMATE;
  }
} 