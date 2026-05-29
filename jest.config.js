/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/packages/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: {
        esModuleInterop: true,
        resolveJsonModule: true,
      }
    }],
  },
  setupFiles: ['dotenv/config'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
