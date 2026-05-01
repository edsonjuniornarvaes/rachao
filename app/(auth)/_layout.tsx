import { theme } from "@/constants/theme";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
}
