/**
 * Validação pragmática de e-mail (formato local@domínio.tld).
 * Não cobre 100% do RFC; suficiente para habilitar envio no app.
 */
export function isValidEmail(value: string): boolean {
  const s = value.trim();
  if (!s || s.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}
