import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    minHeight: 0,
  },
  mainColumn: {
    flex: 1,
    minHeight: 0,
  },
  header: {
    backgroundColor: theme.colors.background,
    overflow: "hidden",
  },
  raysWrap: {
    position: "absolute",
    top: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tagline: {
    color: theme.colors.textLight,
    fontFamily: "Chivo_300Light",
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginTop: 10,
    opacity: 0.95,
  },
  scrollView: {
    flexShrink: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: theme.spacing.xxxl,
  },
  title: {
    color: "#242428",
    fontWeight: "700",
    fontSize: 22,
    letterSpacing: -0.3,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.48)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: theme.spacing.xxxl,
  },
  inputWrap: {
    backgroundColor: theme.colors.inputBg,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.xxl,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    padding: theme.spacing.lg,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  backButton: {
    position: "absolute",
    left: theme.spacing.lg,
    zIndex: 2,
  },
  backButtonCard: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.11)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 5,
  },
  stickyFooter: {
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: theme.spacing.md,
    flexShrink: 0,
  },
  goldButton: {
    backgroundColor: theme.colors.gold,
    borderRadius: theme.radius.buttonLg,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "rgba(254, 186, 67, 0.5)",
    shadowColor: theme.colors.goldShadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 8,
  },
  goldButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  loginLink: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  loginLinkWrap: {
    marginTop: theme.spacing.xxl,
    alignItems: "center",
  },
  loginLinkHighlight: {
    color: theme.colors.gold,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  pressedLight: {
    opacity: 0.85,
  },
  disabledOpacity: {
    opacity: 0.7,
  },
});
