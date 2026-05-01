# Configuração atual e migração para conta do cliente

## Resumo do que está configurado

### Stack atual
- **Expo** (React Native) – app mobile
- **Supabase** – backend (Auth pronto para uso, Edge Functions para Stripe)
- **Stripe** – pagamentos (Payment Sheet no app, PaymentIntent na Edge Function)

### Onde estão as credenciais

| Serviço | Onde fica | Variáveis |
|--------|-----------|-----------|
| **Supabase** | `.env` no app | `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` |
| **Stripe (app)** | `.env` no app | `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| **Stripe (backend)** | Supabase Dashboard → Edge Functions → Secrets | `STRIPE_SECRET_KEY` |

### O que cada parte faz
- **App:** tabs (Home, Explorar, Schedule, Agenda, Conta), StripeProvider, tela de pagamento em Schedule.
- **Supabase:** cliente em `lib/supabase.ts`; Edge Function `create-payment-intent` em `supabase/functions/create-payment-intent/`.
- **Checkout:** `lib/checkout.ts` chama a Edge Function e devolve o `clientSecret` para o Payment Sheet.

---

## Como trocar as credenciais no futuro

### 1. Trocar para outra conta Supabase (ex.: conta do cliente)

- Crie um **novo projeto** no Supabase (na conta do cliente).
- Em **Project Settings → API** copie:
  - **Project URL** → novo `EXPO_PUBLIC_SUPABASE_URL`
  - **anon public** → novo `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- No app, atualize o `.env` com esses dois valores (e faça novo build/instalação do app).
- Se usar Edge Functions, faça **deploy de novo** no projeto novo:
  - `supabase link --project-ref NOVO_PROJECT_REF`
  - Configure de novo os **Secrets** (ex.: `STRIPE_SECRET_KEY` do cliente).
  - `supabase functions deploy create-payment-intent` (e outras que tiver).

Ou seja: **sim, consegue migrar** para a conta Supabase do cliente; é só usar outro projeto e trocar URL + anon key no app e redeploy das functions no projeto novo.

### 2. Trocar para outra conta Stripe (ex.: Stripe do cliente)

- No **Stripe do cliente** (dashboard.stripe.com da conta dele):
  - **Chave pública:** Developers → API Keys → Publishable key → `pk_test_...` ou `pk_live_...`
  - **Chave secreta:** Secret key → `sk_test_...` ou `sk_live_...`
- No **app** (`.env`):
  - Troque `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` pela publishable key do cliente.
- No **Supabase** (Edge Function):
  - Em **Edge Functions → create-payment-intent → Secrets** (ou "Secrets" do projeto), defina:
    - `STRIPE_SECRET_KEY` = secret key do cliente.
  - Não é preciso mudar código; só a variável de ambiente.

Ou seja: **sim, consegue migrar** o Stripe para a conta do cliente; só trocar as duas chaves (uma no app, outra no Supabase).

---

## Checklist para "entregar" para um cliente

| O que fazer | Onde |
|-------------|------|
| Criar projeto Supabase na conta do cliente | supabase.com |
| Colocar URL e anon key do projeto no `.env` do app | `EXPO_PUBLIC_SUPABASE_*` |
| Criar conta Stripe do cliente (ou usar a que ele já tem) | dashboard.stripe.com |
| Colocar publishable key do cliente no `.env` do app | `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| Configurar secret key do Stripe no projeto Supabase do cliente | Edge Functions → Secrets → `STRIPE_SECRET_KEY` |
| Fazer deploy da Edge Function no projeto Supabase do cliente | `supabase link` + `supabase functions deploy` |
| Gerar novo build do app (com o `.env` atualizado) | `eas build` ou build local |

Nada disso exige reescrever a lógica: é troca de credenciais e, no Supabase, usar outro projeto e redeploy das functions. Tanto Supabase quanto Stripe **dão para migrar** para a conta do cliente só trocando projeto/credenciais.
