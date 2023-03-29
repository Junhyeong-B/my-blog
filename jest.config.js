const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/service/**/*.ts'],
  testMatch: ['<rootDir>/src/__test__/**/*test.ts'],
};

module.exports = createJestConfig(customJestConfig);
