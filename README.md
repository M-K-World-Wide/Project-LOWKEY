# Project Low-Key

## Vehicle Override Integration Layer (2024-06-10)

### Objectives
- Integrate command override modules for Cadillac (active remote) and Mercedes (VIN-based ECU link)
- Establish signal emulator + RF/Bluetooth dashboard
- Maintain stealth, trace-clearing, and route-routing capability

### Components
- **RemoteSignalSniffer.js**: Captures and replays remote RF/Bluetooth signals for vehicle override operations. Integrates with orchestrator for signal interception and emulation.
- **VINDecoderDaemon.py**: Daemon for decoding VINs and mapping to override profiles, enabling VIN-based ECU spoofing and authentication bypass.
- **OBD2LinkBridge.cpp**: C++ bridge for interfacing with vehicle OBD-II port, sending/receiving CAN messages, and relaying override commands.
- **ASCIIControlDashboard.jsx**: React component providing an ASCII UI dashboard for RF/Bluetooth operations, override activation, and status monitoring.
- **ESP32StealthModule.ino**: Arduino sketch for ESP32 module, enabling stealth mode, trace-clearing, and silent ignition.

### High-Level Integration Flow
1. **Signal Capture**: `RemoteSignalSniffer.js` intercepts and records remote signals (RF/Bluetooth).
2. **VIN Lookup**: `VINDecoderDaemon.py` decodes VIN and retrieves the appropriate override profile.
3. **ECU Spoofing**: `OBD2LinkBridge.cpp` uses the profile to send spoofed commands to the vehicle's ECU via OBD-II/CAN bus.
4. **Operator Dashboard**: `ASCIIControlDashboard.jsx` provides a stealthy, ASCII-based UI for monitoring and manual overrides.
5. **Stealth Operations**: `ESP32StealthModule.ino` ensures trace-clearing and silent ignition, maintaining operational stealth.

### Security & Performance
- All modules restrict access, sanitize inputs, and ensure secure communication.
- Real-time performance is prioritized for signal processing and CAN bus operations.
- Stealth and trace-clearing are enforced at both software and hardware levels.

### Next Steps
- Implement inter-module communication (IPC, REST, serial, or message queue)
- Define schemas for data exchange
- Begin feature implementation and integration testing

---

For detailed documentation, see `@docs/`, `@memories.md`, `@lessons-learned.md`, and `@scratchpad.md`.
