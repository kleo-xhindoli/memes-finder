module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
