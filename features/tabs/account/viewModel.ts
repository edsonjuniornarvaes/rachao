import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";
import { ACCOUNT_CONSTANTS, AccountViewState } from "./models";

export const useAccountViewModel = () => {
  const { user, signOut } = useAuth();

  const userData: AccountViewState = useMemo(() => {
    const name =
      user?.user_metadata?.full_name ??
      user?.user_metadata?.name ??
      user?.email ??
      ACCOUNT_CONSTANTS.DEFAULT_USER_NAME;

    return {
      userName: name,
      userEmail: user?.email ?? "",
    };
  }, [user]);

  const handleLogout = async () => await signOut();

  return {
    userData,
    handleLogout,
    CONSTANTS: ACCOUNT_CONSTANTS,
  };
};
