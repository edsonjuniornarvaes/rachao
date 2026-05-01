import { useAuth } from "@/contexts/AuthContext";
import { useLinkingURL } from "expo-linking";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, loading } = useAuth();
  const linkingUrl = useLinkingURL();

  if (loading) {
    return null;
  }

  // Cold start com exp://.../auth/callback#... — evita ir à entry antes de processar tokens.
  if (linkingUrl?.includes("auth/callback")) {
    return <Redirect href="/auth/callback" />;
  }

  if (session) return <Redirect href="/(tabs)/home" />;
  return <Redirect href="/(auth)/entry" />;
}
