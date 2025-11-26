module.exports = ({ config }) => {
  const withStorybook = process.env.WITH_STORYBOOK;
  const enableProxyman = process.env.ENABLE_PROXYMAN === 'true';

  return {
    ...config,
    // Override package names to be valid (Android doesn't allow segments starting with numbers)
    ios: {
      ...config.ios,
      bundleIdentifier: 'com.sungurtekin.ttt',
    },
    android: {
      ...config.android,
      package: 'com.sungurtekin.ttt',
    },
    plugins: enableProxyman
      ? config.plugins.concat('expo-android-proxyman')
      : config.plugins,
    extra: {
      ...config.extra,
      withStorybook,
    },
  };
};
