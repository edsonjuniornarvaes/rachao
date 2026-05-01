import type { ApplyAuthReturnUrlResult } from "@/lib/auth/applyOAuthReturnUrl";
import { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    metadata?: { full_name?: string },
  ) => Promise<void>;
  signInWithOAuth: (
    provider: "google" | "apple" | "facebook",
  ) => Promise<ApplyAuthReturnUrlResult>;
  signOut: () => Promise<void>;
  resetPasswordForEmail: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};
