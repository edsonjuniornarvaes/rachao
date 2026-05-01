import { useAuth } from "@/contexts/AuthContext";
import { usePostAuthNavigation } from "@/contexts/PostAuthNavigationContext";
import { router } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EntryDimensions, ENTRY_CONSTANTS } from "./models";

export const useEntryViewModel = () => {
  const { signInWithOAuth } = useAuth();
  const { beginPostAuthNavigation } = usePostAuthNavigation();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [oauthLoading, setOauthLoading] = useState(false);

  const raysW = screenW * 1.2;
  const raysH = (293 / 375) * raysW;
  const logoW = screenW * ENTRY_CONSTANTS.LOGO_W_RATIO;
  const logoH = logoW * ENTRY_CONSTANTS.LOGO_ASPECT;
  const logoCenterY = screenH * ENTRY_CONSTANTS.LOGO_CENTER_Y_RATIO;
  const logoTop = logoCenterY - logoH / 2;

  const dimensions: EntryDimensions = {
    screenW,
    screenH,
    raysW,
    raysH,
    logoW,
    logoH,
    logoCenterY,
    logoTop,
    topInset: insets.top,
  };

  const handleOAuth = async (provider: "google") => {
    setOauthLoading(true);
    try {
      const r = await signInWithOAuth(provider);
      if (!r.success) return;
      if (r.isPasswordRecovery) {
        router.replace("/(auth)/reset-password");
        return;
      }
      beginPostAuthNavigation();
      router.replace("/(tabs)/home");
    } catch {
      // silently ignore – entry has no feedback banner
    } finally {
      setOauthLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    router.push("/(auth)/login");
  };

  const handleNavigateToSignup = () => {
    router.push("/(auth)/signup");
  };

  return {
    dimensions,
    oauthLoading,
    handleOAuth,
    handleNavigateToLogin,
    handleNavigateToSignup,
  };
};
