import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import * as Linking from "expo-linking";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const APP_SCHEME = "rachao";

/**
 * entry + sessão → home sem overlay. Login/OAuth usam PostAuthNavigation (loading global).
 * Corrige deep links vazios tipo rachao:///.
 */
export function AuthRouting() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuth = segments[0] === "(auth)";
    const inTabs = segments[0] === "(tabs)";

    if (session && inAuth) {
      // Só a entry: após login o viewModel faz replace + overlay; evita loading global aqui.
      const leaf = segments[1];
      if (leaf === "entry") {
        router.replace("/(tabs)/home");
      }
    } else if (!session && inTabs) {
      // O contexto pode atrasar após setSession no OAuth/deep link; confirma no cliente.
      void supabase.auth.getSession().then(({ data: { session: live } }) => {
        if (!live) {
          router.replace("/(auth)/entry");
        }
      });
    }
  }, [session, loading, segments, router]);

  useEffect(() => {
    const isBareSchemeRoot = (url: string) => {
      if (!url.startsWith(`${APP_SCHEME}:`)) return false;
      const afterColon = url.slice(APP_SCHEME.length + 1);
      return (
        afterColon === "" ||
        afterColon === "/" ||
        afterColon === "//" ||
        afterColon === "///"
      );
    };

    const handle = (url: string | null) => {
      if (url && isBareSchemeRoot(url)) {
        router.replace("/");
      }
    };

    void Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener("url", ({ url }) => handle(url));
    return () => sub.remove();
  }, [router]);

  return null;
}
