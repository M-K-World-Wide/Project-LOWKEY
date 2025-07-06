/**
 * Primal Genesis Engine™ - Type Definitions
 * 
 * Comprehensive type definitions for the Primal Genesis Engine™ authority system,
 * including authority levels, commands, results, and events.
 * 
 * @author MKWW Autonomous Labs
 * @version 1.0.0
 * @license UNLICENSED
 */

/**
 * Authority Levels - Defines the hierarchy of authority in the system
 */
export enum AuthorityLevel {
  PRIMARY = 'primary',      // Primal Genesis Engine™ authority
  SECONDARY = 'secondary',  // Secondary system authority
  TERTIARY = 'tertiary',    // Tertiary system authority
  ULTIMATE = 'ultimate'     // User override authority (highest)
}

/**
 * Command Types - Defines the types of commands that can be executed
 */
export type CommandType = 
  | 'vehicle'    // Vehicle control commands
  | 'security'   // Security system commands
  | 'system'     // System operation commands
  | 'quantum'    // Quantum processing commands
  | 'override'   // Override commands
  | 'emergency'  // Emergency commands
  | 'audit'      // Audit commands
  | 'optimization'; // Optimization commands

/**
 * Vehicle Systems - Defines the vehicle systems that can be controlled
 */
export type VehicleSystem = 
  | 'engine'       // Engine control system
  | 'transmission' // Transmission control system
  | 'brakes'       // Brake control system
  | 'steering'     // Steering control system
  | 'security'     // Security system
  | 'entertainment' // Entertainment system
  | 'climate'      // Climate control system
  | 'lights'       // Light control system
  | 'navigation'   // Navigation system
  | 'communication'; // Communication system

/**
 * Security Levels - Defines the security levels for commands
 */
export type SecurityLevel = 
  | 'level-1'  // Basic security
  | 'level-2'  // Enhanced security
  | 'level-3'  // High security
  | 'level-4'  // Maximum security
  | 'quantum'; // Quantum-level security

/**
 * Override Modes - Defines the modes for vehicle override operations
 */
export type OverrideMode = 
  | 'read'     // Non-intrusive data reading
  | 'write'    // System parameter modification
  | 'execute'  // Command execution
  | 'bypass'   // Security system bypass
  | 'inject'   // Message injection
  | 'hijack';  // Complete bus hijacking

/**
 * Authority Command - Defines the structure of authority commands
 */
export interface AuthorityCommand {
  id: string;                    // Unique command identifier
  type: CommandType;             // Type of command
  data: any;                     // Command data
  priority?: number;             // Command priority (1-10, 10 being highest)
  timeout?: number;              // Command timeout in milliseconds
  authority?: AuthorityLevel;    // Required authority level
  quantum?: boolean;             // Whether quantum processing is required
  divine?: boolean;              // Whether divine flow is required
  metadata?: {                   // Additional metadata
    user?: string;               // User who issued the command
    session?: string;            // Session identifier
    timestamp?: number;          // Command timestamp
    source?: string;             // Command source
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Authority Result - Defines the structure of authority command results
 */
export interface AuthorityResult {
  id: string;                    // Command identifier
  success: boolean;              // Whether the command was successful
  data?: any;                    // Result data
  error?: string;                // Error message if failed
  metadata?: {                   // Additional metadata
    authority: AuthorityLevel;   // Authority level used
    quantum: boolean;            // Whether quantum processing was used
    divine: boolean;             // Whether divine flow was used
    autonomous: boolean;         // Whether autonomous mode was used
    duration?: number;           // Execution duration
    timestamp?: number;          // Result timestamp
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Authority Event - Defines the structure of authority events
 */
export interface AuthorityEvent {
  type: string;                  // Event type
  timestamp: number;             // Event timestamp
  data?: any;                    // Event data
  metadata?: {                   // Additional metadata
    authority?: AuthorityLevel;  // Authority level
    quantum?: boolean;           // Whether quantum processing was involved
    divine?: boolean;            // Whether divine flow was involved
    autonomous?: boolean;        // Whether autonomous mode was involved
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Quantum Decision - Defines the structure of quantum processor decisions
 */
export interface QuantumDecision {
  id: string;                    // Decision identifier
  command: AuthorityCommand;     // Original command
  decision: any;                 // Decision data
  confidence: number;            // Decision confidence (0-1)
  quantum: boolean;              // Whether quantum processing was used
  divine: boolean;               // Whether divine flow was used
  timestamp: number;             // Decision timestamp
  metadata?: {                   // Additional metadata
    processingTime?: number;     // Processing time
    optimizationLevel?: number;  // Optimization level
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * User Override - Defines the structure of user override operations
 */
export interface UserOverride {
  id: string;                    // Override identifier
  command: AuthorityCommand;     // Override command
  type: 'override' | 'emergency'; // Override type
  priority: number;              // Override priority
  instant: boolean;              // Whether override is instant
  timestamp: number;             // Override timestamp
  metadata?: {                   // Additional metadata
    user?: string;               // User who initiated override
    reason?: string;             // Override reason
    authority: AuthorityLevel;   // Authority level used
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Authority Audit - Defines the structure of authority audit records
 */
export interface AuthorityAudit {
  id: string;                    // Audit identifier
  type: 'command' | 'decision' | 'override' | 'emergency'; // Audit type
  data: any;                     // Audit data
  timestamp: number;             // Audit timestamp
  metadata?: {                   // Additional metadata
    authority: AuthorityLevel;   // Authority level
    quantum: boolean;            // Whether quantum processing was involved
    divine: boolean;             // Whether divine flow was involved
    autonomous: boolean;         // Whether autonomous mode was involved
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Authority Optimization - Defines the structure of authority optimizations
 */
export interface AuthorityOptimization {
  id: string;                    // Optimization identifier
  type: 'decision' | 'performance' | 'security' | 'flow'; // Optimization type
  data: any;                     // Optimization data
  improvement: number;           // Improvement percentage
  timestamp: number;             // Optimization timestamp
  metadata?: {                   // Additional metadata
    authority: AuthorityLevel;   // Authority level
    quantum: boolean;            // Whether quantum processing was used
    divine: boolean;             // Whether divine flow was used
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Vehicle Command Data - Defines the structure of vehicle command data
 */
export interface VehicleCommandData {
  vehicleId: string;             // Vehicle identifier
  system: VehicleSystem;         // Vehicle system to control
  mode: OverrideMode;            // Override mode
  data?: any;                    // Command data
  priority?: number;             // Command priority
  timeout?: number;              // Command timeout
}

/**
 * Security Command Data - Defines the structure of security command data
 */
export interface SecurityCommandData {
  level: SecurityLevel;          // Security level
  operation: string;             // Security operation
  data?: any;                    // Security data
  priority?: number;             // Command priority
  timeout?: number;              // Command timeout
}

/**
 * System Command Data - Defines the structure of system command data
 */
export interface SystemCommandData {
  operation: string;             // System operation
  data?: any;                    // System data
  priority?: number;             // Command priority
  timeout?: number;              // Command timeout
}

/**
 * User Approval - Defines the structure of user approval responses
 */
export interface UserApproval {
  approved: boolean;             // Whether command is approved
  reason?: string;               // Approval or rejection reason
  timestamp: number;             // Approval timestamp
  metadata?: {                   // Additional metadata
    user?: string;               // User who approved/rejected
    authority: AuthorityLevel;   // Authority level used
    [key: string]: any;          // Additional metadata fields
  };
}

/**
 * Authority Status - Defines the structure of authority system status
 */
export interface AuthorityStatus {
  autonomous: boolean;           // Whether autonomous mode is active
  authorityLevel: AuthorityLevel; // Current authority level
  activeCommands: number;        // Number of active commands
  queueLength: number;           // Length of command queue
  quantum: boolean;              // Whether quantum processing is active
  divine: boolean;               // Whether divine flow is active
  timestamp: number;             // Status timestamp
}

/**
 * Authority Statistics - Defines the structure of authority system statistics
 */
export interface AuthorityStatistics {
  totalCommands: number;         // Total number of commands processed
  successRate: number;           // Command success rate (0-1)
  averageResponseTime: number;   // Average response time in milliseconds
  quantumDecisions: number;      // Number of quantum decisions made
  userOverrides: number;         // Number of user overrides
  optimizations: number;         // Number of optimizations performed
  timestamp: number;             // Statistics timestamp
}

/**
 * Quantum Processor Options - Defines the configuration options for quantum processor
 */
export interface QuantumProcessorOptions {
  enabled?: boolean;             // Whether quantum processing is enabled
  divine?: boolean;              // Whether divine flow is enabled
  optimization?: boolean;        // Whether optimization is enabled
  confidence?: number;           // Minimum confidence threshold
  timeout?: number;              // Processing timeout
}

/**
 * User Override Options - Defines the configuration options for user override
 */
export interface UserOverrideOptions {
  authority?: AuthorityLevel;    // Authority level
  instant?: boolean;             // Whether instant override is enabled
  emergency?: boolean;           // Whether emergency override is enabled
  validation?: boolean;          // Whether command validation is enabled
  timeout?: number;              // Override timeout
}

/**
 * Authority Auditor Options - Defines the configuration options for authority auditor
 */
export interface AuthorityAuditorOptions {
  enabled?: boolean;             // Whether auditing is enabled
  quantum?: boolean;             // Whether quantum auditing is enabled
  comprehensive?: boolean;       // Whether comprehensive auditing is enabled
  retention?: number;            // Audit retention period
}

/**
 * Authority Optimizer Options - Defines the configuration options for authority optimizer
 */
export interface AuthorityOptimizerOptions {
  enabled?: boolean;             // Whether optimization is enabled
  quantum?: boolean;             // Whether quantum optimization is enabled
  divine?: boolean;              // Whether divine optimization is enabled
  threshold?: number;            // Optimization threshold
} 