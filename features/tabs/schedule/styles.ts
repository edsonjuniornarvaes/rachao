import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  title: {
    marginBottom: theme.spacing.xl,
    fontSize: 18,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.md,
    textAlign: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  successText: {
    color: "#156b2f",
    marginTop: theme.spacing.md,
    textAlign: "center",
    paddingHorizontal: theme.spacing.lg,
    fontWeight: "600",
  },
});
