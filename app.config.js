// Dynamic config layered on top of app.json.
//
// Set APP_VARIANT=beta (done automatically by the eas.json "testflight" profile)
// to build a separate "QArt Beta" app with its own bundle id, so it installs
// ALONGSIDE the dev build and the future App Store app — different icon label,
// different app, easy to tell apart on the home screen.
//
// No variable set = the normal production "QArt" (com.jpgmzyl.qart).

module.exports = ({ config }) => {
  const isBeta = process.env.APP_VARIANT === 'beta';
  if (!isBeta) return config;

  return {
    ...config,
    name: 'QArt Beta',
    scheme: 'qartbeta',
    ios: {
      ...config.ios,
      bundleIdentifier: 'com.jpgmzyl.qart.beta',
    },
    android: {
      ...config.android,
      package: 'com.jpgmzyl.qart.beta',
    },
  };
};
