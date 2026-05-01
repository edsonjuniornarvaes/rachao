import { theme } from "@/constants/theme";

export interface SignupFormState {
  name: string;
  email: string;
  password: string;
  loading: boolean;
}

export type SignupFeedback =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success" };

export interface SignupDimensions {
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

export const SIGNUP_CONSTANTS = {
  GOLD: theme.colors.gold,
  MIN_PASSWORD_LENGTH: 6,
  TIMEOUT_MS: 20000,
} as const;
