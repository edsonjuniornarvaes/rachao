import { useAuth } from "@/contexts/AuthContext";
import { theme } from "@/constants/theme";
import {
  AUTH_FORM_HEADER_HEIGHT_RATIO,
  ENTRY_CONSTANTS,
} from "@/features/auth/entry/models";
import t from "@/lib/translator";
import { router } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LOGIN_CONSTANTS,
  LoginDimensions,
  ResetPasswordFormState,
} from "./models";

export const useResetPasswordViewModel = () => {
  const { updatePassword, session, loading: authLoading, signOut } = useAuth();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState<ResetPasswordFormState>({
    password: "",
    confirmPassword: "",
    loading: false,
  });
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

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

  const handlePasswordChange = (password: string) => {
    setFeedbackError(null);
    setForm((prev) => ({ ...prev, password }));
  };

  const handleConfirmChange = (confirmPassword: string) => {
    setFeedbackError(null);
    setForm((prev) => ({ ...prev, confirmPassword }));
  };

  const handleSubmit = async () => {
    const password = form.password.trim();
    const confirm = form.confirmPassword.trim();
    if (!password || !confirm) {
      setFeedbackError(t.auth.resetPassword.errorFillFields);
      return;
    }
    if (password.length < LOGIN_CONSTANTS.MIN_PASSWORD_LENGTH) {
      setFeedbackError(
        t.auth.signup.errorPasswordMin(LOGIN_CONSTANTS.MIN_PASSWORD_LENGTH),
      );
      return;
    }
    if (password !== confirm) {
      setFeedbackError(t.auth.resetPassword.errorMismatch);
      return;
    }
    if (!session) {
      setFeedbackError(t.auth.resetPassword.noSession);
      return;
    }

    setFeedbackError(null);
    setForm((prev) => ({ ...prev, loading: true }));
    try {
      await updatePassword(password);
      await signOut();
      router.replace({
        pathname: "/(auth)/login",
        params: { pwdUpdated: "1" },
      });
    } catch (e: unknown) {
      setFeedbackError((e as Error).message);
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleNavigateToLogin = () => {
    router.replace("/(auth)/login");
  };

  return {
    form,
    dimensions,
    authLoading,
    hasSession: !!session,
    feedbackError,
    handlePasswordChange,
    handleConfirmChange,
    handleSubmit,
    handleNavigateToLogin,
  };
};
