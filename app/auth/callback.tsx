import { usePostAuthNavigation } from "@/contexts/PostAuthNavigationContext";
import { applyOAuthReturnUrl } from "@/lib/auth/applyOAuthReturnUrl";
import { Sentry } from "@/lib/sentry";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View } from "react-native";

/**
 * Trata cold start / deep link: rachao://auth/callback#access_token=…
 * (o fluxo com WebBrowser costuma não passar aqui, mas garante rota válida).
 */
export default function AuthOAuthCallback() {
  const router = useRouter();
  const { beginPostAuthNavigation } = usePostAuthNavigation();
  /** URL com hash (#access_token) — em Expo Go getInitialURL() por vezes vem vazio; useLinkingURL costuma trazer. */
  const linkingUrl = Linking.useLinkingURL();
  const processedRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const finish = (href: "/(tabs)/home" | "/(auth)/reset-password" | "/") => {
      if (!active) return;
      if (href === "/(tabs)/home") {
        beginPostAuthNavigation();
      }
      router.replace(href);
    };

    const run = async (url: string | null) => {
      if (!active) return;
      if (!url) return;
      if (processedRef.current === url) return;
      processedRef.current = url;

      try {
        const result = await applyOAuthReturnUrl(url);
        if (!active) return;
        if (!result.success) {
          processedRef.current = null;
          finish("/");
          return;
        }
        if (result.isPasswordRecovery) {
          finish("/(auth)/reset-password");
          return;
        }
        finish("/(tabs)/home");
      } catch (e: unknown) {
        Sentry.captureException(e, { tags: { flow: "oauth-callback" } });
        if (active) {
          processedRef.current = null;
          finish("/");
        }
      }
    };

    const resolve = async () => {
      const fromHook = linkingUrl;
      const fromInitial = await Linking.getInitialURL();
      const url = fromHook ?? fromInitial;
      await run(url);
    };

    void resolve();

    const sub = Linking.addEventListener("url", ({ url }) => {
      processedRef.current = null;
      void run(url);
    });

    return () => {
      active = false;
      sub.remove();
    };
  }, [router, beginPostAuthNavigation, linkingUrl]);

  return <View style={{ flex: 1 }} />;
}
