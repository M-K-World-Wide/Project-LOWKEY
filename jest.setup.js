/**
 * LowKey™ - Primal Genesis Engine™ Edition
 * Jest Setup Configuration
 */

import '@testing-library/jest-dom';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.PRIMAL_GENESIS_AUTHORITY = 'primary';
process.env.QUANTUM_PROCESSING_ENABLED = 'true';
process.env.USER_OVERRIDE_AUTHORITY = 'ultimate';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock console methods in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock crypto for quantum processing tests
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: jest.fn(),
    subtle: {
      generateKey: jest.fn(),
      encrypt: jest.fn(),
      decrypt: jest.fn(),
      sign: jest.fn(),
      verify: jest.fn(),
    },
  },
});

// Mock WebSocket for real-time communication tests
global.WebSocket = class WebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.CONNECTING;
    this.onopen = null;
    this.onclose = null;
    this.onmessage = null;
    this.onerror = null;
  }
  
  send(data) {
    if (this.onmessage) {
      this.onmessage({ data });
    }
  }
  
  close() {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) {
      this.onclose();
    }
  }
};

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;

// Mock Bluetooth API for proximity tests
global.navigator.bluetooth = {
  requestDevice: jest.fn(),
  getAvailability: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock NFC API for proximity tests
global.navigator.nfc = {
  watch: jest.fn(),
  push: jest.fn(),
  cancelWatch: jest.fn(),
};

// Mock CAN bus for vehicle tests
global.CANBus = class CANBus {
  constructor() {
    this.isConnected = false;
    this.onMessage = null;
    this.onError = null;
  }
  
  connect() {
    this.isConnected = true;
    return Promise.resolve();
  }
  
  disconnect() {
    this.isConnected = false;
    return Promise.resolve();
  }
  
  send(message) {
    if (this.onMessage) {
      this.onMessage(message);
    }
  }
};

// Mock quantum processing for authority tests
global.QuantumProcessor = class QuantumProcessor {
  constructor() {
    this.isInitialized = false;
    this.entanglementLevel = 0;
  }
  
  initialize() {
    this.isInitialized = true;
    return Promise.resolve();
  }
  
  processQuantumData(data) {
    return Promise.resolve({ processed: true, data });
  }
  
  createEntanglement() {
    this.entanglementLevel = 1;
    return Promise.resolve();
  }
};

// Mock authority system for testing
global.AuthoritySystem = class AuthoritySystem {
  constructor() {
    this.currentAuthority = 'primary';
    this.overrideEnabled = true;
  }
  
  setAuthority(level) {
    this.currentAuthority = level;
    return Promise.resolve();
  }
  
  requestOverride() {
    if (this.overrideEnabled) {
      this.currentAuthority = 'ultimate';
      return Promise.resolve();
    }
    return Promise.reject(new Error('Override not available'));
  }
};

// Setup test utilities
global.testUtils = {
  waitFor: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  mockAuthoritySystem: () => new global.AuthoritySystem(),
  mockQuantumProcessor: () => new global.QuantumProcessor(),
  mockCANBus: () => new global.CANBus(),
  mockWebSocket: (url) => new global.WebSocket(url),
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  sessionStorageMock.clear();
});

// Global test timeout
jest.setTimeout(30000); 