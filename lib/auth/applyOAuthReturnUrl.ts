import { supabase } from "@/lib/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";

export type ApplyAuthReturnUrlResult =
  | { success: false }
  | { success: true; isPasswordRecovery: boolean };

function paramFirst(
  v: string | string[] | undefined,
): string | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

/**
 * Lê access/refresh token da URL (query ou hash), abre sessão no Supabase.
 * Links de recuperação de senha trazem `type=recovery` → abrir tela de nova senha.
 */
export async function applyOAuthReturnUrl(
  url: string,
): Promise<ApplyAuthReturnUrlResult> {
  const { params } = QueryParams.getQueryParams(url);
  if (!params.access_token || !params.refresh_token) {
    return { success: false };
  }
  const flowType = paramFirst(params.type);
  const isPasswordRecovery = flowType === "recovery";

  const { error } = await supabase.auth.setSession({
    access_token: params.access_token,
    refresh_token: params.refresh_token,
  });
  if (error) return { success: false };
  return { success: true, isPasswordRecovery };
}
