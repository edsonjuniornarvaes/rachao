import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.textLighter,
    fontSize: 18,
  },
  headerContainer: {
    flex: 0.5,
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  bodyContainer: {
    flex: 1,
    width: "100%",
    borderTopStartRadius: theme.radius.lg,
    borderTopEndRadius: theme.radius.lg,
    backgroundColor: theme.colors.white,
  },
});
