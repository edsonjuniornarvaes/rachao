import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xxl,
    backgroundColor: theme.colors.white,
  },
  userName: {
    fontSize: 18,
    marginBottom: theme.spacing.sm,
  },
  userEmail: {
    color: theme.colors.textHint,
    marginBottom: theme.spacing.xxl,
  },
});
