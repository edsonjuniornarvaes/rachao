import { supabase } from "@/lib/supabase";

export async function createPaymentIntent(amount: number, currency = "brl") {
  const notConfigured =
    !process.env.EXPO_PUBLIC_SUPABASE_URL ||
    !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (notConfigured) {
    throw new Error(
      "Configure EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY no .env",
    );
  }
  const { data, error } = await supabase.functions.invoke(
    "create-payment-intent",
    {
      body: { amount, currency },
    },
  );

  if (error) throw error;
  if (!data?.clientSecret) throw new Error("Resposta inválida da API");
  return data.clientSecret;
}
