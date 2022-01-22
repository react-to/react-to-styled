module.exports = {
  automock: false,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ['./test/setup.ts'],
  collectCoverageFrom: ['**/*.tsx'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/apps/web/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/test/mocks/styleMock.js',
  },
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/test/Storyshots.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest',
  },
}
