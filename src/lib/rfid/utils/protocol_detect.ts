import { ProtocolType } from '../core/types';

export class ProtocolDetector {
  private static readonly PROTOCOL_SIGNATURES = {
    MIFARE: {
      patterns: [
        /^02.{32}$/,  // Standard MIFARE Classic
        /^04.{32}$/,  // MIFARE Ultralight
        /^08.{32}$/   // MIFARE DESFire
      ],
      frequency: 13.56,
      modulation: 'ASK'
    },
    HID: {
      patterns: [
        /^26.{10}$/,  // HID Prox
        /^27.{10}$/,  // HID iClass
        /^28.{10}$/   // HID Seos
      ],
      frequency: 125,
      modulation: 'FSK'
    },
    EM4100: {
      patterns: [
        /^26.{10}$/,  // EM4100
        /^27.{10}$/   // EM4102
      ],
      frequency: 125,
      modulation: 'Manchester'
    }
  };

  static detectProtocol(data: Buffer, frequency?: number): ProtocolType {
    const hexData = data.toString('hex');
    let bestMatch: { protocol: ProtocolType; confidence: number } | null = null;

    for (const [protocol, signature] of Object.entries(this.PROTOCOL_SIGNATURES)) {
      const confidence = this.calculateConfidence(hexData, signature, frequency);
      
      if (confidence > 0.8 && (!bestMatch || confidence > bestMatch.confidence)) {
        bestMatch = {
          protocol: protocol as ProtocolType,
          confidence
        };
      }
    }

    return bestMatch?.protocol || 'UNKNOWN';
  }

  private static calculateConfidence(
    data: string,
    signature: {
      patterns: RegExp[];
      frequency: number;
      modulation: string;
    },
    frequency?: number
  ): number {
    let confidence = 0;

    // Check pattern matches
    for (const pattern of signature.patterns) {
      if (pattern.test(data)) {
        confidence += 0.6;
        break;
      }
    }

    // Check frequency if provided
    if (frequency && Math.abs(frequency - signature.frequency) < 0.1) {
      confidence += 0.4;
    }

    return confidence;
  }

  static getProtocolInfo(protocol: ProtocolType): {
    frequency: number;
    modulation: string;
    security: string[];
  } {
    switch (protocol) {
      case 'MIFARE':
        return {
          frequency: 13.56,
          modulation: 'ASK',
          security: ['Crypto1', 'AES', '3DES']
        };
      case 'HID':
        return {
          frequency: 125,
          modulation: 'FSK',
          security: ['Proprietary', 'iClass', 'Seos']
        };
      case 'EM4100':
        return {
          frequency: 125,
          modulation: 'Manchester',
          security: ['None']
        };
      default:
        return {
          frequency: 0,
          modulation: 'Unknown',
          security: []
        };
    }
  }
} 