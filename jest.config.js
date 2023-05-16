module.exports = {
    testPathIgnorePatterns: [ '<rootDir>/node_modules', '<rootDir>/dist'],
    moduleDirectories: [ '<rootDir>/node_modules', '<rootDir>/src'],
    setupFilesAfterEnv: [ '<rootDir>/setupTests.js' ],
    testEnvironment:  'jsdom',
    modulePathIgnorePatterns: [ '<rootDir>/dist/', '<rootDir>/vendor/'],
}
