module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
