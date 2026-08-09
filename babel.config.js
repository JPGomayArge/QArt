const path = require('path');

module.exports = function (api) {
  api.cache(true);
  // In this install, babel-preset-expo lives under expo/node_modules rather
  // than being hoisted to the project root, so a bare 'babel-preset-expo'
  // reference fails to resolve. Resolve it explicitly from expo's location.
  const presetExpo = require.resolve('babel-preset-expo', {
    paths: [path.dirname(require.resolve('expo/package.json'))],
  });
  return {
    presets: [presetExpo],
  };
};
