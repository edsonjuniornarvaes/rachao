import { theme } from "@/constants/theme";

export interface PaymentState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface PaymentData {
  amount: number;
  description: string;
  merchantName: string;
}

export const SCHEDULE_CONSTANTS = {
  DEFAULT_AMOUNT: 1000,
  DEFAULT_CURRENCY: "BRL",
  TIMEOUT_MS: 20000,
  BUTTON_COLOR: theme.colors.accent,
  MERCHANT_NAME: "Rachao",
  DEFAULT_CLIENT_NAME: "Cliente Edson",
} as const;
