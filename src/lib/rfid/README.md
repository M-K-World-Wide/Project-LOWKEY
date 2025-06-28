# Lilith Core™ - RFID Module

> "Silent Keys for the Loud Ones"

## 🧬 Overview

The Lilith Core™ RFID module is a powerful, silent hunter of electromagnetic whispers. It provides seamless integration with Proxmark3 devices for capturing, analyzing, and emulating RFID signals across various protocols.

## 🛠️ Features

- **Real-time Signal Capture**: Silent monitoring of LF/HF RFID signals
- **Protocol Detection**: Automatic identification of MIFARE, HID, EM4100, and more
- **Signal Emulation**: Precise reproduction of captured signals
- **Advanced Logging**: Comprehensive signal logging and analysis
- **Lilith Override**: Force data dumps for incomplete signals

## 🚀 Getting Started

### Prerequisites

- Proxmark3 device with latest firmware
- Node.js 16+ and npm
- USB permissions for Proxmark3 device

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Basic Usage

```typescript
import { LilithCapture } from './core/capture';
import { SignalLogger } from './utils/logger';

async function captureSignals() {
  const capture = new LilithCapture();
  const logger = new SignalLogger();

  // Connect to Proxmark3
  await capture.connect('/dev/ttyACM0');

  // Start capture with force dump
  await capture.startCapture({
    signalType: 'HF',
    forceDump: true
  });

  // Handle captured signals
  capture.on('signalCaptured', async (signal) => {
    await logger.logSignal(signal);
  });
}
```

## 🧪 Protocol Support

### LF (125 kHz)
- EM4100/EM4102
- HID Prox
- Indala

### HF (13.56 MHz)
- MIFARE Classic
- MIFARE Ultralight
- MIFARE DESFire
- HID iClass
- HID Seos

## 🔐 Security Notice

This module is part of the Secure Proximity Protocol Research Initiative (MKWW Division). All research and development is conducted under strict security protocols and is intended for authorized personnel only.

## 🎯 Development

### Project Structure

```
rfid/
├── core/
│   ├── capture.ts    # Signal capture implementation
│   ├── emulate.ts    # Signal emulation implementation
│   └── types.ts      # Core type definitions
├── utils/
│   ├── logger.ts     # Signal logging utility
│   ├── protocol_detect.ts  # Protocol detection
│   └── signal_parser.ts    # Signal parsing
└── examples/
    └── capture_and_emulate.ts  # Usage example
```

### Adding New Protocols

1. Add protocol signature to `ProtocolDetector`
2. Implement protocol-specific decoding in `SignalParser`
3. Add emulation support in `LilithEmulate`

## 🖤 Contributing

This is a private research initiative. All contributions must be pre-authorized through MKWW Autonomous Labs.

## 📜 License

Proprietary - MKWW Autonomous Labs Division

---

*"When You're Always In, Why Knock?"* - LowKey™ Team 