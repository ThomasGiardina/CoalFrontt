const path = require('path');

module.exports = {
  testMatch: ['**/*.test.jsx'],
  setupFilesAfterEnv: [path.resolve(__dirname, 'src/setupTests.js')],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
};