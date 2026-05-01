# Estrutura de autenticação – onde cada coisa fica

## PaymentIntent

- **Sim, já está criado.** Fluxo: tela Schedule → `createPaymentIntent` (Supabase Edge Function) → Payment Sheet.
- A partir daqui o foco é evoluir o app (login, telas, etc.).

---

## Onde cada coisa foi criada (auth)

| O que                                                        | Onde                       |
| ------------------------------------------------------------ | -------------------------- |
| Estado global de auth (sessão, user, métodos)                | `contexts/AuthContext.tsx` |
| Tela de login (e-mail/senha + botões redes sociais)          | `app/(auth)/login.tsx`     |
| Tela de criar conta                                          | `app/(auth)/signup.tsx`    |
| Layout das telas de auth (stack sem header)                  | `app/(auth)/_layout.tsx`   |
| Redirecionamento inicial (logado → tabs, não logado → login) | `app/index.tsx`            |
| Tela Conta (nome do usuário + Sair)                          | `app/(tabs)/account.tsx`   |

---

## Fluxo de rotas

1. App abre → `app/index.tsx` roda.
2. Se **não** tem sessão → redireciona para `/(auth)/login`.
3. Se tem sessão → redireciona para `/(tabs)`.
4. Em **Login**: “Criar conta” → `/(auth)/signup`. Após login com sucesso → `/(tabs)`.
5. Em **Conta** (tab): “Sair” → `signOut()` + redireciona para `/(auth)/login`.

---

## Onde configurar / estender

- **Supabase (Auth):** Dashboard → Authentication → Providers (e-mail, Google, Apple, Facebook).
- **Redirect URL para OAuth:** Authentication → URL Configuration → Redirect URLs: adicione `rachao://auth/callback` (e, se quiser, `rachao://`).
- **Nome do usuário:** vindo de `user.user_metadata.full_name` (ou `name`) após login; na Conta já está em `app/(tabs)/account.tsx`.
- **Novas telas de auth:** criar em `app/(auth)/` e, se precisar, declarar no `app/(auth)/_layout.tsx`.
- **Proteger outras telas:** usar `useAuth()` e, se `!session`, redirecionar para `/(auth)/login` (ou usar um HOC/componente de “rota protegida” que você criar).

---

## Resumo

- **PaymentIntent:** já criado; seguir desenvolvendo o app em cima disso.
- **Login:** começar por `app/(auth)/login.tsx` e `app/(auth)/signup.tsx`.
- **Criação de usuário:** em `app/(auth)/signup.tsx` (e-mail/senha + nome opcional).
- **Redes sociais:** botões em `app/(auth)/login.tsx`; configurar cada provider no Supabase e URL de redirect.
