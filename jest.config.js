/**
 * LowKey™ - Primal Genesis Engine™ Edition
 * Jest Configuration for Testing
 */

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Test match patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],
  
  // Module name mapping
  moduleNameMapping: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/api/(.*)$': '<rootDir>/src/pages/api/$1',
  },
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/**/types.{js,jsx,ts,tsx}',
    '!src/**/constants.{js,jsx,ts,tsx}',
    '!src/**/config.{js,jsx,ts,tsx}',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'lcov',
    'html',
    'json',
  ],
  
  // Coverage directory
  coverageDirectory: 'coverage',
  
  // Test timeout
  testTimeout: 30000,
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Reset modules between tests
  resetModules: true,
  
  // Restore mocks between tests
  restoreMocks: true,
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  
  // Test environment setup
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  
  // Global setup and teardown
  globalSetup: '<rootDir>/jest.global-setup.js',
  globalTeardown: '<rootDir>/jest.global-teardown.js',
  
  // Setup files
  setupFiles: [
    '<rootDir>/jest.setup.js',
  ],
  
  // Test suites
  projects: [
    {
      displayName: 'unit',
      testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
      testPathIgnorePatterns: [
        '<rootDir>/src/**/__tests__/integration/**',
        '<rootDir>/src/**/__tests__/e2e/**',
      ],
    },
    {
      displayName: 'integration',
      testMatch: [
        '<rootDir>/src/**/__tests__/integration/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
    {
      displayName: 'authority',
      testMatch: [
        '<rootDir>/src/**/__tests__/authority/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/src/lib/primal-genesis/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
    {
      displayName: 'quantum',
      testMatch: [
        '<rootDir>/src/**/__tests__/quantum/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/src/lib/quantum/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
    {
      displayName: 'override',
      testMatch: [
        '<rootDir>/src/**/__tests__/override/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/src/lib/user-override/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
    {
      displayName: 'vehicle',
      testMatch: [
        '<rootDir>/src/**/__tests__/vehicle/**/*.{test,spec}.{js,jsx,ts,tsx}',
        '<rootDir>/src/lib/vehicular-override/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
    {
      displayName: 'security',
      testMatch: [
        '<rootDir>/src/**/__tests__/security/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
  ],
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  
  // Notify mode
  notify: true,
  notifyMode: 'change',
  
  // Cache configuration
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Force exit
  forceExit: true,
  
  // Detect open handles
  detectOpenHandles: true,
  
  // Worker threads
  workerIdleMemoryLimit: '512MB',
  
  // Max workers
  maxWorkers: '50%',
  
  // Bail on first failure
  bail: false,
  
  // Fail fast
  failFast: false,
  
  // Retry failed tests
  retryTimes: 3,
  
  // Retry delay
  retryDelay: 1000,
  
  // Test retry configuration
  testRetryTimes: 3,
  
  // Test retry delay
  testRetryDelay: 1000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig); 