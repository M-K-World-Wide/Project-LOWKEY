#!/bin/bash
# start-broker.sh
#
# 📋 Quantum Documentation: Script to launch the Project Low Key broker with environment configuration.
# 🧩 Feature Context: Ensures broker.js runs with correct env vars for secure, modular operation.
# 💡 Usage Example:
#   ./scripts/start-broker.sh
#
# Requires: .env file in project root, Node.js 18+

set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

node src/lib/vehicular-override/integrations/broker.js 