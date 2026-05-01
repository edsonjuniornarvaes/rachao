import { useAuth } from "@/contexts/AuthContext";
import { theme } from "@/constants/theme";
import {
  AUTH_FORM_HEADER_HEIGHT_RATIO,
  ENTRY_CONSTANTS,
} from "@/features/auth/entry/models";
import t from "@/lib/translator";
import { isValidEmail } from "@/lib/validation/isValidEmail";
import { router } from "expo-router";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ForgotPasswordFormState, LoginDimensions } from "./models";

export type ForgotPasswordFeedback =
  | { kind: "idle" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export const useForgotPasswordViewModel = () => {
  const { resetPasswordForEmail } = useAuth();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState<ForgotPasswordFormState>({
    email: "",
    loading: false,
  });
  const [feedback, setFeedback] = useState<ForgotPasswordFeedback>({
    kind: "idle",
  });

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
    setForm((prev) => ({ ...prev, email }));
    setFeedback((prev) =>
      prev.kind === "idle" ? prev : { kind: "idle" },
    );
  };

  const emailValid = isValidEmail(form.email);

  const handleSubmit = async () => {
    const email = form.email.trim();
    if (!email) {
      setFeedback({
        kind: "error",
        message: t.auth.forgotPassword.errorNoEmail,
      });
      return;
    }
    if (!isValidEmail(email)) {
      setFeedback({
        kind: "error",
        message: t.auth.forgotPassword.errorInvalidEmail,
      });
      return;
    }

    setFeedback({ kind: "idle" });
    setForm((prev) => ({ ...prev, loading: true }));
    try {
      await resetPasswordForEmail(email);
      setForm((prev) => ({ ...prev, loading: false }));
      setFeedback({ kind: "success" });
    } catch (e: unknown) {
      setFeedback({
        kind: "error",
        message: (e as Error).message,
      });
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleNavigateToLogin = () => {
    router.replace("/(auth)/login");
  };

  return {
    form,
    dimensions,
    emailValid,
    feedback,
    handleEmailChange,
    handleSubmit,
    handleNavigateToLogin,
  };
};
