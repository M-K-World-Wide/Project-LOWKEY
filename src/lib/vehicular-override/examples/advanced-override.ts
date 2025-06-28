/**
 * Lilith Core™ - Advanced Vehicular Override Examples
 * 
 * Comprehensive examples demonstrating the full capabilities
 * of the vehicular override programming system.
 */

import { 
  lilithVehicularOverride, 
  startSession, 
  executeCommand, 
  emergencyStop,
  getVehicle,
  getAllVehicles,
  on,
  off,
  OverrideType,
  OverrideMode
} from '../index';

// Event listeners for monitoring
on('sessionStarted', ({ session }) => {
  console.log(`🚗 Session started: ${session.id} for vehicle ${session.vehicleId}`);
});

on('commandExecuted', ({ sessionId, command, result }) => {
  console.log(`⚡ Command executed: ${command.system}.${command.mode} - ${result.success ? 'SUCCESS' : 'FAILED'}`);
});

on('injectionComplete', ({ command, result }) => {
  console.log(`💉 Injection complete: ${command.system} - Duration: ${result.duration}ms`);
});

on('securityBypass', ({ vehicleId, data }) => {
  console.log(`🔓 Security bypassed for ${vehicleId}: ${data.toString('hex')}`);
});

on('busHijack', ({ vehicleId, system, data }) => {
  console.log(`🎭 Bus hijacked for ${vehicleId} ${system}: ${data.toString('hex')}`);
});

on('emergencyStop', ({ vehicleId }) => {
  console.log(`🚨 Emergency stop activated for ${vehicleId}`);
});

/**
 * Example 1: Basic Vehicle Information
 */
async function displayVehicleInfo() {
  console.log('\n=== Vehicle Information ===');
  
  const vehicles = getAllVehicles();
  for (const vehicle of vehicles) {
    console.log(`\n🚗 ${vehicle.name}`);
    console.log(`   VIN: ${vehicle.vin}`);
    console.log(`   Type: ${vehicle.type}`);
    console.log(`   Year: ${vehicle.year}`);
    console.log(`   Status: ${vehicle.status}`);
    
    if (vehicle.systems.engine) {
      const engine = vehicle.systems.engine;
      console.log(`   Engine: ${engine.cylinders}L ${engine.fuelType} (${engine.power} HP, ${engine.torque} Nm)`);
    }
    
    if (vehicle.systems.security) {
      const security = vehicle.systems.security;
      console.log(`   Security: ${security.encryption} ${security.biometric ? '+ Biometric' : ''}`);
    }
  }
}

/**
 * Example 2: Engine Performance Override
 */
async function enginePerformanceOverride() {
  console.log('\n=== Engine Performance Override ===');
  
  const sessionId = await startSession('demonmaria', {
    user: 'lilith',
    purpose: 'performance optimization',
    security: 'level-5'
  });
  
  try {
    // Read current engine parameters
    const currentParams = await executeCommand(sessionId, {
      vehicleId: 'demonmaria',
      system: 'engine' as OverrideType,
      mode: 'read',
      data: Buffer.from([0x01, 0x02, 0x03, 0x04]),
      priority: 1,
      timeout: 2000
    });
    
    console.log('📊 Current engine parameters:', currentParams.data?.toString('hex'));
    
    // Override RPM limit to 8000
    const rpmOverride = await executeCommand(sessionId, {
      vehicleId: 'demonmaria',
      system: 'engine' as OverrideType,
      mode: 'write',
      data: Buffer.from([0x00, 0x00, 0x1F, 0x40]), // 8000 RPM
      priority: 1,
      timeout: 1000
    });
    
    console.log('⚡ RPM override result:', rpmOverride.success);
    
    // Override throttle response
    const throttleOverride = await executeCommand(sessionId, {
      vehicleId: 'demonmaria',
      system: 'engine' as OverrideType,
      mode: 'write',
      data: Buffer.from([0xFF, 0xFF, 0xFF, 0xFF]), // Maximum response
      priority: 1,
      timeout: 1000
    });
    
    console.log('🎯 Throttle override result:', throttleOverride.success);
    
    // Override ignition timing for performance
    const ignitionOverride = await executeCommand(sessionId, {
      vehicleId: 'demonmaria',
      system: 'engine' as OverrideType,
      mode: 'write',
      data: Buffer.from([0x00, 0x00, 0x00, 0x20]), // Advanced timing
      priority: 1,
      timeout: 1000
    });
    
    console.log('🔥 Ignition override result:', ignitionOverride.success);
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 3: Security System Bypass
 */
async function securityBypassDemo() {
  console.log('\n=== Security System Bypass ===');
  
  const sessionId = await startSession('escalade2024', {
    user: 'lilith',
    purpose: 'security research',
    security: 'level-4'
  });
  
  try {
    // Bypass immobilizer
    const immobilizerBypass = await executeCommand(sessionId, {
      vehicleId: 'escalade2024',
      system: 'security' as OverrideType,
      mode: 'bypass',
      data: Buffer.from([0xDE, 0xAD, 0xBE, 0xEF, 0xCA, 0xFE, 0xBA, 0xBE]),
      priority: 1,
      timeout: 3000
    });
    
    console.log('🔓 Immobilizer bypass:', immobilizerBypass.success);
    
    // Disable alarm system
    const alarmDisable = await executeCommand(sessionId, {
      vehicleId: 'escalade2024',
      system: 'security' as OverrideType,
      mode: 'write',
      data: Buffer.from([0x00, 0x00, 0x00, 0x00]), // Disable alarm
      priority: 1,
      timeout: 2000
    });
    
    console.log('🔇 Alarm disable:', alarmDisable.success);
    
    // Override keyless entry
    const keylessOverride = await executeCommand(sessionId, {
      vehicleId: 'escalade2024',
      system: 'security' as OverrideType,
      mode: 'execute',
      data: Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]),
      priority: 1,
      timeout: 2000
    });
    
    console.log('🔑 Keyless entry override:', keylessOverride.success);
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 4: Transmission Control
 */
async function transmissionControlDemo() {
  console.log('\n=== Transmission Control ===');
  
  const sessionId = await startSession('mercedes2014', {
    user: 'lilith',
    purpose: 'transmission optimization',
    security: 'level-3'
  });
  
  try {
    // Override shift points for performance
    const shiftPointOverride = await executeCommand(sessionId, {
      vehicleId: 'mercedes2014',
      system: 'transmission' as OverrideType,
      mode: 'write',
      data: Buffer.from([0x00, 0x00, 0x09, 0xC4]), // 2500 RPM shift point
      priority: 1,
      timeout: 1500
    });
    
    console.log('⚙️ Shift point override:', shiftPointOverride.success);
    
    // Force gear selection
    const gearOverride = await executeCommand(sessionId, {
      vehicleId: 'mercedes2014',
      system: 'transmission' as OverrideType,
      mode: 'write',
      data: Buffer.from([0x00, 0x00, 0x00, 0x03]), // Force 3rd gear
      priority: 1,
      timeout: 1000
    });
    
    console.log('🎯 Gear override:', gearOverride.success);
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 5: Continuous Injection Attack
 */
async function continuousInjectionDemo() {
  console.log('\n=== Continuous Injection Attack ===');
  
  const sessionId = await startSession('momteslay', {
    user: 'lilith',
    purpose: 'penetration testing',
    security: 'level-5'
  });
  
  try {
    // Start continuous message injection
    const injectionId = await lilithVehicularOverride.startContinuousOverride(sessionId, {
      vehicleId: 'momteslay',
      system: 'entertainment' as OverrideType,
      mode: 'inject',
      data: Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]),
      priority: 1,
      timeout: 100
    }, 50); // Every 50ms
    
    console.log('💉 Continuous injection started:', injectionId);
    
    // Let it run for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Stop the injection
    lilithVehicularOverride.stopContinuousOverride(injectionId);
    console.log('⏹️ Continuous injection stopped');
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 6: Bus Hijacking Attack
 */
async function busHijackingDemo() {
  console.log('\n=== Bus Hijacking Attack ===');
  
  const sessionId = await startSession('josephm3', {
    user: 'lilith',
    purpose: 'security assessment',
    security: 'level-5'
  });
  
  try {
    // Hijack the CAN bus
    const hijackResult = await executeCommand(sessionId, {
      vehicleId: 'josephm3',
      system: 'engine' as OverrideType,
      mode: 'hijack',
      data: Buffer.from([0xCA, 0xFE, 0xBA, 0xBE, 0xDE, 0xAD, 0xBE, 0xEF]),
      priority: 1,
      timeout: 5000
    });
    
    console.log('🎭 Bus hijacking result:', hijackResult.success);
    
    if (hijackResult.data) {
      console.log('📊 Hijack data:', hijackResult.data.toString('hex'));
    }
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 7: Emergency Stop Demo
 */
async function emergencyStopDemo() {
  console.log('\n=== Emergency Stop Demo ===');
  
  // Start a session and some operations
  const sessionId = await startSession('demonmaria', {
    user: 'lilith',
    purpose: 'emergency testing',
    security: 'level-1'
  });
  
  try {
    // Start some continuous operations
    const injectionId = await lilithVehicularOverride.startContinuousOverride(sessionId, {
      vehicleId: 'demonmaria',
      system: 'engine' as OverrideType,
      mode: 'inject',
      data: Buffer.from([0x01, 0x02, 0x03, 0x04]),
      priority: 1,
      timeout: 100
    }, 100);
    
    console.log('🚗 Started continuous injection on Demon Maria');
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Emergency stop
    console.log('🚨 Triggering emergency stop...');
    emergencyStop('demonmaria');
    
    // Wait for stop to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Emergency stop completed');
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Example 8: Batch Operations
 */
async function batchOperationsDemo() {
  console.log('\n=== Batch Operations Demo ===');
  
  const sessionId = await startSession('mercedes2014', {
    user: 'lilith',
    purpose: 'batch testing',
    security: 'level-3'
  });
  
  try {
    const commands = [
      {
        vehicleId: 'mercedes2014',
        system: 'engine' as OverrideType,
        mode: 'read' as OverrideMode,
        data: Buffer.from([0x01, 0x02, 0x03, 0x04]),
        priority: 1,
        timeout: 1000
      },
      {
        vehicleId: 'mercedes2014',
        system: 'transmission' as OverrideType,
        mode: 'read' as OverrideMode,
        data: Buffer.from([0x05, 0x06, 0x07, 0x08]),
        priority: 1,
        timeout: 1000
      },
      {
        vehicleId: 'mercedes2014',
        system: 'brakes' as OverrideType,
        mode: 'read' as OverrideMode,
        data: Buffer.from([0x09, 0x0A, 0x0B, 0x0C]),
        priority: 1,
        timeout: 1000
      },
      {
        vehicleId: 'mercedes2014',
        system: 'security' as OverrideType,
        mode: 'read' as OverrideMode,
        data: Buffer.from([0x0D, 0x0E, 0x0F, 0x10]),
        priority: 1,
        timeout: 1000
      }
    ];
    
    console.log('📦 Executing batch of 4 commands...');
    const results = await lilithVehicularOverride.executeBatchCommands(sessionId, commands);
    
    console.log('📊 Batch results:');
    results.forEach((result, index) => {
      console.log(`   Command ${index + 1}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
    });
    
  } finally {
    await lilithVehicularOverride.endSession(sessionId);
  }
}

/**
 * Main execution function
 */
async function runAllExamples() {
  console.log('🚗 Lilith Vehicular Override Programming System');
  console.log('==============================================\n');
  
  try {
    await displayVehicleInfo();
    await enginePerformanceOverride();
    await securityBypassDemo();
    await transmissionControlDemo();
    await continuousInjectionDemo();
    await busHijackingDemo();
    await emergencyStopDemo();
    await batchOperationsDemo();
    
    console.log('\n✅ All examples completed successfully!');
    
    // Display final statistics
    const stats = lilithVehicularOverride.getOverallStatistics();
    console.log('\n📊 Final Statistics:');
    console.log(`   Total Sessions: ${stats.totalSessions}`);
    console.log(`   Active Sessions: ${stats.activeSessions}`);
    console.log(`   Total Commands: ${stats.totalCommands}`);
    console.log(`   Total Vehicles: ${stats.totalVehicles}`);
    
  } catch (error) {
    console.error('❌ Error running examples:', error);
  }
}

// Export for use in other modules
export {
  displayVehicleInfo,
  enginePerformanceOverride,
  securityBypassDemo,
  transmissionControlDemo,
  continuousInjectionDemo,
  busHijackingDemo,
  emergencyStopDemo,
  batchOperationsDemo,
  runAllExamples
};

// Run if this file is executed directly
if (require.main === module) {
  runAllExamples();
} 