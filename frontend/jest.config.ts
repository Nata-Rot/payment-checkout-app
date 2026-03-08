import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\.(ts|tsx)$': ['ts-jest', {
      tsconfig: { esModuleInterop: true, jsx: 'react-jsx' },
      diagnostics: { ignoreCodes: [1343, 2339, 1259] },
    }],
  },
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(.*/)?api\.service$': '<rootDir>/src/services/__mocks__/api.service.ts',
    '^(.*/)?wompi\.service$': '<rootDir>/src/services/__mocks__/wompi.service.ts',
  },
  collectCoverageFrom: [
    'src/utils/**/*.ts',
    'src/store/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts',
  ],
};

export default config;