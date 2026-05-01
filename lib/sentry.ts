import * as Sentry from "@sentry/react-native";
import type { ComponentType } from "react";

const isJest = typeof process.env.JEST_WORKER_ID !== "undefined";

/**
 * Inicializa o Sentry quando EXPO_PUBLIC_SENTRY_DSN está definido.
 * Chamar o mais cedo possível (via instrumentation).
 */
export function initSentry(): void {
  if (isJest) return;
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN?.trim();
  if (!dsn) return;

  Sentry.init({
    dsn,
    debug: __DEV__,
    enabled: !__DEV__ || !!process.env.EXPO_PUBLIC_SENTRY_DEBUG,
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    enableAutoSessionTracking: true,
  });
}

/**
 * Envolve o root para capturar erros de render; noop se não houver DSN.
 */
export function wrapRootComponent<P extends object>(
  Root: ComponentType<P>,
): ComponentType<P> {
  if (isJest || !process.env.EXPO_PUBLIC_SENTRY_DSN?.trim()) {
    return Root;
  }
  // Sentry.wrap tipa o componente como Record<string, unknown>; o root layout não recebe props.
  return Sentry.wrap(Root as ComponentType<Record<string, unknown>>) as ComponentType<P>;
}

export { Sentry };
