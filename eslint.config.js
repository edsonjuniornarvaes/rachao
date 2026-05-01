// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'console',
          property: 'tron',
          message:
            'Não uses console.tron em código que vá para o repositório. Remove antes do commit ou mantém só alterações locais.',
        },
      ],
    },
  },
  {
    files: ['lib/reactotron.ts'],
    rules: {
      'no-restricted-properties': 'off',
    },
  },
]);
