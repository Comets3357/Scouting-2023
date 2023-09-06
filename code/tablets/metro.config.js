/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const packagePath = '/Users/Driver Station/Documents/GitHub/Scouting-2023/code/tablets/packages/react-native-ble';

module.exports = {
  resolver: {
    nodeModulesPaths: [packagePath],
  },
  watchFolders: [packagePath],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
