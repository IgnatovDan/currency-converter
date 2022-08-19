module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest.setup.js']
}
