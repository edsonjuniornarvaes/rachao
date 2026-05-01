// Roda no Deno (Supabase Edge Functions). O IDE pode apontar erros; o deploy usa Deno.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Stripe from "https://esm.sh/stripe@14.0.0?target=deno";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { amount, currency = "brl" } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 50) {
      return new Response(
        JSON.stringify({
          error: "amount é obrigatório e deve ser >= 50 (centavos)",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
