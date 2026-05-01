import { applyOAuthReturnUrl } from "@/lib/auth/applyOAuthReturnUrl";
import {
  resolveAuthCallbackRedirectUri,
  resolveSupabaseEmailRedirectUri,
} from "@/lib/auth/authRedirectUri";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const useAuthViewModel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Lógica de Auto-Refresh (Essencial para Mobile)
  useEffect(() => {
    if (Platform.OS === "web") return;
    void supabase.auth.startAutoRefresh();
    const sub = AppState.addEventListener("change", (next) => {
      if (next === "active") {
        void supabase.auth.startAutoRefresh();
        void supabase.auth.getSession().then(({ data: { session: s } }) => {
          setSession(s);
          setUser(s?.user ?? null);
        });
      } else {
        void supabase.auth.stopAutoRefresh();
      }
    });
    return () => {
      sub.remove();
      void supabase.auth.stopAutoRefresh();
    };
  }, []);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: { full_name?: string },
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata?.full_name ?? "",
        },
        emailRedirectTo: resolveSupabaseEmailRedirectUri(),
      },
    });
    if (error) throw error;
  };

  const signInWithOAuth = async (provider: "google" | "apple" | "facebook") => {
    const redirectUri = resolveAuthCallbackRedirectUri();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUri, skipBrowserRedirect: true },
    });
    if (error) throw error;
    if (data?.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUri,
      );
      if (result.type === "success" && result.url) {
        return applyOAuthReturnUrl(result.url);
      }
    }
    return { success: false as const };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPasswordForEmail = async (email: string) => {
    const redirectTo = resolveSupabaseEmailRedirectUri();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  return {
    user,
    session,
    loading,
    signInWithPassword,
    signUp,
    signInWithOAuth,
    signOut,
    resetPasswordForEmail,
    updatePassword,
  };
};
