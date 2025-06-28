import { writeFile, appendFile, readFile } from 'fs/promises';
import { join } from 'path';
import { CapturedSignal } from '../core/types';

export class SignalLogger {
  private readonly logDir: string;
  private readonly jsonPath: string;
  private readonly logPath: string;

  constructor(logDir: string = 'logs') {
    this.logDir = logDir;
    this.jsonPath = join(logDir, 'rfid-captures.json');
    this.logPath = join(logDir, 'rfid-dumps.log');
  }

  async logSignal(signal: CapturedSignal): Promise<void> {
    await this.appendToJson(signal);
    await this.appendToLog(signal);
  }

  async getCapturedSignals(): Promise<CapturedSignal[]> {
    try {
      const data = await readFile(this.jsonPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async appendToJson(signal: CapturedSignal): Promise<void> {
    try {
      const signals = await this.getCapturedSignals();
      signals.push(signal);
      await writeFile(this.jsonPath, JSON.stringify(signals, null, 2));
    } catch (error) {
      console.error('Failed to write to JSON file:', error);
    }
  }

  private async appendToLog(signal: CapturedSignal): Promise<void> {
    const logEntry = this.formatLogEntry(signal);
    try {
      await appendFile(this.logPath, logEntry + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private formatLogEntry(signal: CapturedSignal): string {
    const { metadata, fingerprint } = signal;
    return `[${metadata.timestamp.toISOString()}] ${metadata.protocol} | ` +
           `Type: ${metadata.signalType} | ` +
           `Freq: ${metadata.frequency}MHz | ` +
           `Strength: ${metadata.strength} | ` +
           `Fingerprint: ${fingerprint}`;
  }

  async clearLogs(): Promise<void> {
    try {
      await writeFile(this.jsonPath, '[]');
      await writeFile(this.logPath, '');
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }
} 