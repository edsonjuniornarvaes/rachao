import GoogleSvg from "@/assets/svg/google";
import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { s } from "@/features/auth/entry/styles";
import { useEntryViewModel } from "@/features/auth/entry/viewModel";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { session, loading } = useAuth();
  const {
    dimensions,
    oauthLoading,
    handleOAuth,
    handleNavigateToLogin,
    handleNavigateToSignup,
  } = useEntryViewModel();

  useStatusBarOnFocus("light");

  if (!loading && session) {
    return <Redirect href="/(tabs)/home" />;
  }

  const logoTop = dimensions.logoTop + Math.min(dimensions.topInset * 0.35, 28);
  const busy = oauthLoading;

  return (
    <View style={s.root}>
      <View
        style={[
          s.raysWrap,
          {
            left: (dimensions.screenW - dimensions.raysW) / 2,
            width: dimensions.raysW,
            height: dimensions.raysH,
          },
        ]}
        pointerEvents="none"
      >
        {/* <RaysSvg width={dimensions.raysW} height={dimensions.raysH} /> */}
      </View>

      <LinearGradient
        colors={[
          "transparent",
          "rgba(13,13,18,0.5)",
          "rgba(13,13,18,0.88)",
          theme.colors.background,
        ]}
        locations={[0, 0.38, 0.7, 1]}
        style={[s.gradientOverlay, { height: dimensions.screenH * 0.62 }]}
        pointerEvents="none"
      />

      <View style={[s.logoArea, { top: logoTop }]}>
        <WhiteLogoSvg width={dimensions.logoW} height={dimensions.logoH} />
      </View>

      <View style={s.bottomSafe}>
        <SafeAreaView edges={["bottom"]} style={s.bottomSafeArea}>
          <View style={s.sheet}>
            <LinearGradient
              colors={[
                "rgba(254, 186, 67, 0.1)",
                "rgba(254, 186, 67, 0.02)",
                "transparent",
              ]}
              locations={[0, 0.5, 1]}
              style={s.sheetTopGlow}
              pointerEvents="none"
            />

            <Pressable
              style={({ pressed }) => [
                s.googleButton,
                pressed && !busy && s.pressed,
                busy && s.buttonDisabled,
              ]}
              onPressIn={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
              onPress={() => handleOAuth("google")}
              disabled={busy}
              accessibilityRole="button"
              accessibilityLabel={t.auth.entry.googleLabel}
            >
              {oauthLoading ? (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.gold}
                  style={s.oauthSpinner}
                />
              ) : (
                <GoogleSvg />
              )}
              <Text style={s.googleLabel}>{t.auth.entry.googleLabel}</Text>
            </Pressable>

            <View style={s.dividerRow}>
              <View style={s.dividerLine} />
              <Text style={s.dividerText}>{t.common.or}</Text>
              <View style={s.dividerLine} />
            </View>

            <Pressable
              style={({ pressed }) => [
                s.secondaryButton,
                pressed && !busy && s.secondaryPressed,
                busy && s.buttonDisabled,
              ]}
              onPressIn={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              onPress={handleNavigateToLogin}
              disabled={busy}
              accessibilityRole="button"
              accessibilityLabel={t.auth.entry.emailLogin}
            >
              <Text style={s.secondaryButtonText}>
                {t.auth.entry.emailLogin}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
            </Pressable>

            <Pressable
              onPress={handleNavigateToSignup}
              disabled={busy}
              style={s.signupLinkWrap}
            >
              <Text style={s.signupLink}>
                {t.auth.entry.noAccount}
                <Text style={s.signupLinkHighlight}>
                  {t.auth.entry.createAccount}
                </Text>
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
