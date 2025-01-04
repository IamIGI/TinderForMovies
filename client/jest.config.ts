// filepath: /c:/Users/i.kłusek/Desktop/React/TinderForMovies-PragmaticCoders/client/jest.config.ts
import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'], // Include your setup file
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
  },
};

export default config;
