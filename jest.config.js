module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' for browser-like environment
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};