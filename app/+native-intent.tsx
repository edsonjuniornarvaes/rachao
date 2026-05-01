/**
 * Garante que deep links de auth (Supabase) abram a rota correta.
 * O parâmetro `path` pode ser URL completa (exp://... ou rachao://...).
 */
export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): string {
  try {
    if (typeof path === "string" && path.includes("auth/callback")) {
      return "/auth/callback";
    }
  } catch {
    /* evitar crash no cold start */
  }
  return path;
}
