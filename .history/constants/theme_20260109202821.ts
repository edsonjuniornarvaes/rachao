/**
 * 🎨 RACHÃO - Identidade Visual
 *
 * Conceito: Urbano + Tech + Futebol
 * Interface: Dark Mode
 * Vibe: Moderna, esportiva, comunitária
 */

import { Platform } from "react-native";

/**
 * Paleta Principal - "Urbano + Fut"
 */
export const Brand = {
  // Verde Esportivo - Cor principal (gramado/campo)
  primary: "#2E7D32",
  primaryLight: "#4CAF50",
  primaryDark: "#1B5E20",

  // Amarelo Destaque - Cor de ação/alerta
  secondary: "#F9A825",
  secondaryLight: "#FFD54F",
  secondaryDark: "#F57F17",

  // Sucesso/Confirmado
  success: "#4CAF50",

  // Erro/Cancelado
  error: "#EF5350",

  // Aviso/Pendente
  warning: "#FFA726",

  // Info
  info: "#29B6F6",
};

/**
 * Cores de Interface - Dark Mode
 */
export const Colors = {
  light: {
    // Fundos
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceVariant: "#F5F5F5",

    // Textos
    text: "#1A1A1A",
    textSecondary: "#666666",
    textMuted: "#999999",

    // UI
    tint: Brand.primary,
    icon: "#666666",
    border: "#E0E0E0",

    // Tab Bar
    tabIconDefault: "#999999",
    tabIconSelected: Brand.primary,
    tabBackground: "#FFFFFF",
  },
  dark: {
    // Fundos
    background: "#121212",
    surface: "#1E1E1E",
    surfaceVariant: "#2A2A2A",

    // Textos
    text: "#EEEEEE",
    textSecondary: "#B0B0B0",
    textMuted: "#757575",

    // UI
    tint: Brand.primaryLight,
    icon: "#B0B0B0",
    border: "#333333",

    // Tab Bar
    tabIconDefault: "#757575",
    tabIconSelected: Brand.primaryLight,
    tabBackground: "#1E1E1E",
  },
};

/**
 * Tipografia
 *
 * Fontes recomendadas para instalar:
 * - Montserrat (títulos e botões)
 * - Inter (corpo de texto)
 *
 * Para instalar:
 * npx expo install expo-font @expo-google-fonts/montserrat @expo-google-fonts/inter
 */
export const Typography = {
  // Família de fontes
  fontFamily: {
    heading: "Montserrat_600SemiBold",
    headingBold: "Montserrat_700Bold",
    body: "Inter_400Regular",
    bodyMedium: "Inter_500Medium",
    button: "Montserrat_700Bold",
  },

  // Tamanhos
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

/**
 * Espaçamentos
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
};

/**
 * Border Radius
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
};

/**
 * Sombras (para cards e elevação)
 */
export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

/**
 * Fontes do Sistema (fallback)
 */
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "'Montserrat', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});

/**
 * Tema completo exportado
 */
export const Theme = {
  brand: Brand,
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  fonts: Fonts,
};

export default Theme;
