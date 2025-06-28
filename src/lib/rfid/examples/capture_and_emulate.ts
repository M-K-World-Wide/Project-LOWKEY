import { LilithCapture } from '../core/capture';
import { LilithEmulate } from '../core/emulate';
import { SignalLogger } from '../utils/logger';
import { SignalParser } from '../utils/signal_parser';

async function main() {
  // Initialize components
  const capture = new LilithCapture();
  const emulate = new LilithEmulate();
  const logger = new SignalLogger();

  try {
    // Discover and connect to Proxmark3
    const devices = await capture.discoverDevices();
    if (devices.length === 0) {
      throw new Error('No Proxmark3 devices found');
    }

    const device = devices[0];
    console.log(`Connecting to Proxmark3 on ${device.port}...`);
    await capture.connect(device.port);
    await emulate.connect(device.port);

    // Set up capture event handlers
    capture.on('signalCaptured', async (signal) => {
      console.log('Signal captured:', signal.metadata);
      await logger.logSignal(signal);

      // Attempt to emulate the captured signal
      if (signal.decodedData) {
        console.log('Attempting to emulate captured signal...');
        const result = await emulate.startEmulation({
          signalType: signal.metadata.signalType,
          protocol: signal.metadata.protocol,
          data: signal.decodedData
        });

        console.log('Emulation result:', result);
      }
    });

    capture.on('error', (error) => {
      console.error('Capture error:', error);
    });

    // Start capture with force dump enabled
    console.log('Starting capture with force dump...');
    await capture.startCapture({
      signalType: 'HF',
      forceDump: true
    });

    // Keep the script running
    console.log('Press Ctrl+C to stop...');
    process.on('SIGINT', async () => {
      console.log('\nStopping capture...');
      await capture.stopCapture();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the example
main().catch(console.error); 