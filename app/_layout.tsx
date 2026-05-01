import { AuthRouting } from "@/components/AuthRouting";
import { MissingStripeKeyScreen } from "@/components/LayoutPlaceholder";
import { PostAuthNavigationOverlay } from "@/components/PostAuthNavigationOverlay";
import { StripeWrapper } from "@/components/StripeWrapper";
import { theme } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PostAuthNavigationProvider } from "@/contexts/PostAuthNavigationContext";
import { useStripePublishableKey } from "@/hooks/useStripePublishableKey";
import { Chivo_300Light } from "@expo-google-fonts/chivo/300Light";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import "react-native-reanimated";
import { wrapRootComponent } from "@/lib/sentry";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashAnimation } from "@/components/SplashAnimation";
import "../instrumentation";

SplashScreen.preventAutoHideAsync();

/** Evita fundo branco do root view (iOS/Android) antes do 1º paint e após esconder a splash. */
void SystemUI.setBackgroundColorAsync(theme.colors.background);

/** Evita flash branco: React Navigation usa `colors.background` em várias telas. */
const NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.background,
  },
};

/** Esconde a splash só com sessão hidratada + fontes — evita entry/login desnecessários e spinners. */
function SplashUntilAuthReady({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  const [fontsLoaded] = useFonts({ Chivo_300Light });
  const [showLottie, setShowLottie] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    if (!loading && fontsLoaded) {
      void SplashScreen.hideAsync().then(() => setShowLottie(true));
    }
  }, [loading, fontsLoaded]);

  const handleAnimFinish = useCallback(() => setAnimDone(true), []);

  return (
    <>
      {children}
      {showLottie && !animDone && (
        <SplashAnimation onFinish={handleAnimFinish} />
      )}
    </>
  );
}

function AppNavigation({ publishableKey }: { publishableKey: string }) {
  return (
    <PostAuthNavigationProvider>
      <SplashUntilAuthReady>
        <ThemeProvider value={NavigationTheme}>
          <StripeWrapper publishableKey={publishableKey}>
            <AuthRouting />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "none",
                contentStyle: { backgroundColor: theme.colors.background },
              }}
              initialRouteName="index"
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth/callback" />
            </Stack>
            <PostAuthNavigationOverlay />
          </StripeWrapper>
        </ThemeProvider>
      </SplashUntilAuthReady>
    </PostAuthNavigationProvider>
  );
}

function RootLayout() {
  const { publishableKey } = useStripePublishableKey();

  if (!publishableKey) {
    return <MissingStripeKeyGate />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigation publishableKey={publishableKey} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default wrapRootComponent(RootLayout);

function MissingStripeKeyGate() {
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);
  return <MissingStripeKeyScreen />;
}
