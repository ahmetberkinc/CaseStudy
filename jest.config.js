/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|react-navigation-tabs' +
      '|react-native-screens' +
      '|react-native-vector-icons' +
      ')/)',
  ],
};

module.exports = config;
