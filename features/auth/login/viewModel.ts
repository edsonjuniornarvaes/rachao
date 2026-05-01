import { useAuth } from "@/contexts/AuthContext";
import { usePostAuthNavigation } from "@/contexts/PostAuthNavigationContext";
import { theme } from "@/constants/theme";
import {
  AUTH_FORM_HEADER_HEIGHT_RATIO,
  ENTRY_CONSTANTS,
} from "@/features/auth/entry/models";
import t from "@/lib/translator";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  clearSavedLoginEmail,
  loadSavedLoginEmail,
  persistLoginEmail,
} from "./loginRememberStorage";
import {
  LOGIN_CONSTANTS,
  LoginDimensions,
  LoginFormState,
} from "./models";

export const useLoginViewModel = () => {
  const { signInWithPassword } = useAuth();
  const { beginPostAuthNavigation } = usePostAuthNavigation();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
    rememberMe: false,
    loading: false,
    oauthLoading: false,
  });
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const saved = await loadSavedLoginEmail();
      if (cancelled || !saved?.trim()) return;
      setForm((prev) => ({
        ...prev,
        email: saved.trim(),
        rememberMe: true,
      }));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const raysW = screenW * 1.2;
  const logoW = screenW * ENTRY_CONSTANTS.LOGO_W_RATIO;
  const logoH = logoW * ENTRY_CONSTANTS.LOGO_ASPECT;

  const dimensions: LoginDimensions = {
    screenW,
    screenH,
    headerH: screenH * AUTH_FORM_HEADER_HEIGHT_RATIO,
    raysW,
    raysH: (293 / 375) * raysW,
    logoW,
    logoH,
    topInset: insets.top,
    bottomPadding: insets.bottom + theme.spacing.xxxl,
  };

  const handleEmailChange = (email: string) => {
    setFeedbackError(null);
    setForm((prev) => ({ ...prev, email }));
  };

  const handlePasswordChange = (password: string) => {
    setFeedbackError(null);
    setForm((prev) => ({ ...prev, password }));
  };

  const handleToggleRememberMe = () => {
    setForm((prev) => {
      const next = !prev.rememberMe;
      if (!next) void clearSavedLoginEmail();
      return { ...prev, rememberMe: next };
    });
  };

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password) {
      setFeedbackError(t.auth.login.errorFillFields);
      return;
    }

    setFeedbackError(null);
    setForm((prev) => ({ ...prev, loading: true }));
    try {
      await signInWithPassword(form.email.trim(), form.password);
      if (form.rememberMe) {
        await persistLoginEmail(form.email.trim());
      } else {
        await clearSavedLoginEmail();
      }
      beginPostAuthNavigation();
      router.replace("/(tabs)/home");
    } catch (e: unknown) {
      setFeedbackError((e as Error).message);
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleNavigateToSignup = () => {
    router.push("/(auth)/signup");
  };

  const handleNavigateToForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return {
    form,
    dimensions,
    feedbackError,
    handleEmailChange,
    handlePasswordChange,
    handleToggleRememberMe,
    handleLogin,
    handleNavigateToSignup,
    handleNavigateToForgotPassword,
    CONSTANTS: LOGIN_CONSTANTS,
  };
};
