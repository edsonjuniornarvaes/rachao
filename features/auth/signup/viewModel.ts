import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
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
  SIGNUP_CONSTANTS,
  SignupDimensions,
  SignupFeedback,
  SignupFormState,
} from "./models";

export const useSignupViewModel = () => {
  const { signUp } = useAuth();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState<SignupFormState>({
    name: "",
    email: "",
    password: "",
    loading: false,
  });
  const [feedback, setFeedback] = useState<SignupFeedback>({ kind: "idle" });

  const raysW = screenW * 1.2;
  const logoW = screenW * ENTRY_CONSTANTS.LOGO_W_RATIO;
  const logoH = logoW * ENTRY_CONSTANTS.LOGO_ASPECT;

  const dimensions: SignupDimensions = {
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

  const handleNameChange = (name: string) => {
    setFeedback({ kind: "idle" });
    setForm((prev) => ({ ...prev, name }));
  };

  const handleEmailChange = (email: string) => {
    setFeedback({ kind: "idle" });
    setForm((prev) => ({ ...prev, email }));
  };

  const handlePasswordChange = (password: string) => {
    setFeedback({ kind: "idle" });
    setForm((prev) => ({ ...prev, password }));
  };

  const handleSignUp = async () => {
    if (!form.email.trim() || !form.password) {
      setFeedback({ kind: "error", message: t.auth.signup.errorFillFields });
      return;
    }

    if (form.password.length < SIGNUP_CONSTANTS.MIN_PASSWORD_LENGTH) {
      setFeedback({
        kind: "error",
        message: t.auth.signup.errorPasswordMin(
          SIGNUP_CONSTANTS.MIN_PASSWORD_LENGTH,
        ),
      });
      return;
    }

    setFeedback({ kind: "idle" });
    setForm((prev) => ({ ...prev, loading: true }));
    try {
      await signUp(form.email.trim(), form.password, {
        full_name: form.name.trim() || undefined,
      });
      setFeedback({ kind: "success" });
    } catch (e: unknown) {
      setFeedback({ kind: "error", message: (e as Error).message });
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleGoToLoginAfterSignup = () => {
    router.replace("/(auth)/login");
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return {
    form,
    dimensions,
    feedback,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleGoToLoginAfterSignup,
    handleNavigateBack,
    CONSTANTS: SIGNUP_CONSTANTS,
  };
};
