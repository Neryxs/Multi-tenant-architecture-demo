// jest.config.mjs
import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Carga el tsconfig para mapear paths si es necesario
 */
const tsconfig = JSON.parse(readFileSync(resolve('./apps/backend/tsconfig.json'), 'utf-8'));

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/apps/', '<rootDir>/packages/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './apps/backend/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
    prefix: '<rootDir>/apps/backend/',
  }),
  setupFiles: ['dotenv/config'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './apps/backend/tsconfig.json',
    },
  },
  verbose: true,
};
