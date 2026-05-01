import { theme } from "@/constants/theme";

export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
  /** Envio do formulário e-mail/senha */
  loading: boolean;
  /** OAuth em andamento — não deve trocar o layout inteiro por um spinner */
  oauthLoading: boolean;
}

export interface LoginDimensions {
  screenW: number;
  screenH: number;
  headerH: number;
  raysW: number;
  raysH: number;
  logoW: number;
  logoH: number;
  topInset: number;
  bottomPadding: number;
}

export interface ForgotPasswordFormState {
  email: string;
  loading: boolean;
}

export interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
  loading: boolean;
}

export type OAuthProvider = "google" | "apple" | "facebook";

export const LOGIN_CONSTANTS = {
  GOLD: theme.colors.gold,
  MIN_PASSWORD_LENGTH: 6,
  TIMEOUT_MS: 20000,
} as const;
