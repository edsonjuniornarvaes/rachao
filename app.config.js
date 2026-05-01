/**
 * Estende app.json. Sentry:
 * - Sempre inclui o plugin nativo (prebuild / código nativo).
 * - Com SENTRY_ORG + SENTRY_PROJECT + SENTRY_AUTH_TOKEN (EAS ou local), o plugin
 *   `@sentry/react-native/expo` envia source maps nos builds.
 */
module.exports = ({ config }) => {
  const plugins = (config.plugins ?? []).filter(
    (p) =>
      p !== "@sentry/react-native" &&
      !(
        Array.isArray(p) &&
        (p[0] === "@sentry/react-native" || p[0] === "@sentry/react-native/expo")
      ),
  );

  const org = process.env.SENTRY_ORG?.trim();
  const project = process.env.SENTRY_PROJECT?.trim();

  const sentryPlugin =
    org && project
      ? [
          "@sentry/react-native/expo",
          {
            url: "https://sentry.io/",
            organization: org,
            project,
          },
        ]
      : "@sentry/react-native";

  return {
    ...config,
    plugins: [...plugins, sentryPlugin],
  };
};
