const { getDefaultConfig } = require('expo/metro-config');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

module.exports = (() => {
  const config = getSentryExpoConfig(__dirname, {
    getDefaultConfig,
  });

  const { transformer, resolver } = config;

  // 1. Configura o transformador para usar o react-native-svg-transformer
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  // 2. Remove o 'svg' das extensões de asset (arquivos comuns)
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    // 3. Adiciona o 'svg' nas extensões de código (fontes)
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();