import { makeRedirectUri } from "expo-auth-session";
import { Platform } from "react-native";

const APP_SCHEME = "rachao";
export const AUTH_CALLBACK_PATH = "auth/callback";

/**
 * Redirect que o Supabase deve aceitar (Redirect URLs) e que o app envia em OAuth / email.
 * - Web: makeRedirectUri + scheme
 * - Expo Go / Dev Client: exp://.../--/auth/callback
 * - Build nativo / standalone: rachao://auth/callback
 */
export function resolveAuthCallbackRedirectUri(): string {
  if (Platform.OS === "web") {
    return makeRedirectUri({ scheme: APP_SCHEME, path: AUTH_CALLBACK_PATH });
  }
  return makeRedirectUri({
    native: `${APP_SCHEME}://${AUTH_CALLBACK_PATH}`,
    scheme: APP_SCHEME,
    path: AUTH_CALLBACK_PATH,
    preferLocalhost: true,
  });
}

/**
 * resetPasswordForEmail / emailRedirectTo: respeita HTTPS explícito em produção.
 */
export function resolveSupabaseEmailRedirectUri(): string {
  const explicit = process.env.EXPO_PUBLIC_SUPABASE_EMAIL_REDIRECT_URL?.trim();
  if (explicit) return explicit;
  return resolveAuthCallbackRedirectUri();
}
