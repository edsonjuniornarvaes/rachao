import { theme } from "@/constants/theme";
import t from "@/lib/translator";

export interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
}

export interface AccountViewState {
  userName: string;
  userEmail: string;
}

export const ACCOUNT_CONSTANTS = {
  DEFAULT_USER_NAME: t.account.defaultName,
  BUTTON_COLOR: theme.colors.accent,
} as const;
