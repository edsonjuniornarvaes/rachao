export const theme = {
  colors: {
    background: "#0D0D12",
    surface: "#FAFAFA",
    white: "#FFFFFF",
    /** Fundo do cartão login/cadastro — menos choque que branco puro no preto. */
    authSheetFill: "#F5F5F7",

    gold: "#22c55e",
    goldLight: "rgba(34,197,94,0.15)",
    goldShadow: "#16a34a",
    accent: "#4ade80",
    brand: "#22c55e",
    brandLight: "#4ade80",

    card: "rgba(255,255,255,0.07)",
    cardBorder: "rgba(255,255,255,0.12)",

    textPrimary: "#1A1A1A",
    textSecondary: "#888",
    textMuted: "#555",
    textHint: "#666",
    textLight: "rgba(255,255,255,0.55)",
    textLighter: "rgba(255,255,255,0.75)",
    textDivider: "rgba(255,255,255,0.35)",
    placeholder: "#A0A0A0",

    inputBg: "#F7F8F9",
    inputBorder: "#E8ECF4",
    shadow: "#000",
    divider: "#E0E0E0",
    dividerText: "#999",
    dividerDark: "rgba(255,255,255,0.15)",
    secondaryBorder: "rgba(255,255,255,0.2)",

    tabActive: "#4ade80",
    tabInactive: "#A4ACB9",

    google: "#4285F4",
    error: "red",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  radius: {
    sm: 6,
    md: 14,
    lg: 24,
    xl: 28,
    /** Topo do cartão branco nas telas de auth (alinhado à landing). */
    authSheet: 32,
    /** Botões primários (landing, login, cadastro, etc.). */
    buttonLg: 16,
  },
} as const;
