#!/bin/bash
# start-vin.sh
#
# 📋 Quantum Documentation: Script to launch the VINDecoderDaemon with environment configuration.
# 🧩 Feature Context: Ensures VINDecoderDaemon.py runs with correct env vars for secure, modular operation.
# 💡 Usage Example:
#   ./scripts/start-vin.sh
#
# Requires: .env file in project root, Python 3.8+

set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

python3 src/lib/vehicular-override/integrations/VINDecoderDaemon.py 