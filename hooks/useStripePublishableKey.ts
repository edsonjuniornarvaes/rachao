/** Chave pública do Stripe vem do bundle (.env); não precisa de estado assíncrono. */
export function useStripePublishableKey() {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  return { publishableKey, loading: false };
}
