# Project Low-Key — System Overview

## Architecture

```mermaid
flowchart TD
    A[Dashboard] -->|API| B(APIClient)
    A -->|WebSocket| C(WebSocketService)
    B -->|REST| D(Broker/Backend)
    C -->|WS| D
    A -->|VitaLink| E(VitaBridge)
    A -->|WhisperRelay| F(EncryptedComms)
    A -->|Metrics| G(MetricsView)
```

## Features
- FaceID/TouchID Auth
- Terminal & Logs
- Real-time WebSocket Core
- VitaLink, WhisperRelay, AdrenalineX hooks
- Metrics & Monitoring
- Profiles & Device States
- Whisper Mode
- ModKit (root features)
- Network Map
- Inline AI Assistant 