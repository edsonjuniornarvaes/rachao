-- Security Advisor: "Function Search Path Mutable"
-- Força search_path fixo na função handle_new_user (evita hijack de schema em SECURITY DEFINER).
-- Aplica-se à assinatura que existir em public.handle_new_user (geralmente trigger sem argumentos).

DO $$
DECLARE
  cmd text;
BEGIN
  SELECT format(
    'ALTER FUNCTION %I.%I(%s) SET search_path = public',
    n.nspname,
    p.proname,
    pg_get_function_identity_arguments(p.oid)
  )
  INTO cmd
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public'
    AND p.proname = 'handle_new_user'
  ORDER BY p.oid
  LIMIT 1;

  IF cmd IS NULL THEN
    RAISE NOTICE 'public.handle_new_user não existe — ignore esta migration ou crie a função antes.';
  ELSE
    EXECUTE cmd;
    RAISE NOTICE 'Executado: %', cmd;
  END IF;
END $$;
