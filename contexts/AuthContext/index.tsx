import React, { createContext, useContext } from "react";
import { AuthContextType } from "./models";
import { useAuthViewModel } from "./viewModel";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    session,
    loading,
    signInWithPassword,
    signUp,
    signInWithOAuth,
    signOut,
    resetPasswordForEmail,
    updatePassword,
  } = useAuthViewModel();
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithPassword,
        signUp,
        signInWithOAuth,
        signOut,
        resetPasswordForEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
