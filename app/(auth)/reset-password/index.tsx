import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { AuthFormBody } from "@/features/auth/AuthFormBody";
import { useResetPasswordViewModel } from "@/features/auth/login/resetPasswordViewModel";
import { s } from "@/features/auth/login/styles";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
  useStatusBarOnFocus("light");

  const {
    form,
    dimensions,
    authLoading,
    hasSession,
    feedbackError,
    handlePasswordChange,
    handleConfirmChange,
    handleSubmit,
    handleNavigateToLogin,
  } = useResetPasswordViewModel();

  const scrollRef = useRef<ScrollView>(null);
  const raysLeft = (dimensions.screenW - dimensions.raysW) / 2;
  const contentPaddingBottom = dimensions.bottomPadding + theme.spacing.lg;

  if (authLoading) {
    return (
      <View style={s.root}>
        <SafeAreaView style={s.safeArea} edges={["left", "right"]}>
          <View style={[s.mainColumn, { justifyContent: "center", flex: 1 }]}>
            <ActivityIndicator size="large" color={theme.colors.gold} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!hasSession) {
    return (
      <View style={s.root}>
        <SafeAreaView style={s.safeArea} edges={["left", "right"]}>
          <View style={[s.mainColumn, { flex: 1, justifyContent: "center" }]}>
            <Text
              style={[
                s.subtitle,
                { textAlign: "center", paddingHorizontal: theme.spacing.xxl },
              ]}
            >
              {t.auth.resetPassword.noSession}
            </Text>
            <Pressable
              onPress={handleNavigateToLogin}
              style={({ pressed }) => [
                s.goldButton,
                {
                  marginHorizontal: theme.spacing.xxl,
                  marginTop: theme.spacing.xxl,
                },
                pressed && s.pressed,
              ]}
            >
              <Text style={s.goldButtonText}>
                {t.auth.forgotPassword.backToLogin}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safeArea} edges={["left", "right"]}>
        <View style={s.mainColumn}>
          <View style={[s.header, { height: dimensions.headerH }]}>
            <View
              style={[
                s.raysWrap,
                {
                  left: raysLeft,
                  width: dimensions.raysW,
                  height: dimensions.raysH,
                },
              ]}
              pointerEvents="none"
            >
              {/* <RaysSvg width={dimensions.raysW} height={dimensions.raysH} /> */}
            </View>
            <View
              style={[s.headerContent, { paddingTop: dimensions.topInset }]}
            >
              <WhiteLogoSvg
                width={dimensions.logoW}
                height={dimensions.logoH}
              />
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              s.backButton,
              { top: dimensions.topInset + theme.spacing.lg },
              pressed && s.pressedLight,
            ]}
            onPress={() => router.replace("/(auth)/login")}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel={t.common.back}
          >
            <View style={s.backButtonCard}>
              <Ionicons
                name="chevron-back"
                size={26}
                color="rgba(255, 255, 255, 0.95)"
              />
            </View>
          </Pressable>
          <AuthFormBody
            headerHeight={dimensions.headerH}
            footer={
              <View
                style={[
                  s.stickyFooter,
                  { paddingBottom: contentPaddingBottom },
                ]}
              >
                <Pressable
                  onPress={handleSubmit}
                  disabled={form.loading}
                  style={({ pressed }) => [
                    s.goldButton,
                    pressed && s.pressed,
                    form.loading && s.buttonDisabled,
                  ]}
                >
                  {form.loading ? (
                    <ActivityIndicator color={theme.colors.white} />
                  ) : (
                    <Text style={s.goldButtonText}>
                      {t.auth.resetPassword.submit}
                    </Text>
                  )}
                </Pressable>
              </View>
            }
          >
            <ScrollView
              ref={scrollRef}
              style={s.scrollView}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              contentContainerStyle={[
                s.scrollContent,
                { paddingBottom: theme.spacing.lg },
              ]}
              showsVerticalScrollIndicator={false}
            >
              <Text style={s.title}>{t.auth.resetPassword.title}</Text>
              <Text style={s.subtitle}>{t.auth.resetPassword.subtitle}</Text>

              {feedbackError ? (
                <View
                  style={[s.feedbackBanner, s.feedbackError]}
                  accessibilityRole="alert"
                >
                  <Text style={s.feedbackTitle}>{t.common.error}</Text>
                  <Text style={s.feedbackBody}>{feedbackError}</Text>
                </View>
              ) : null}

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.resetPassword.passwordPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={s.input}
                  editable={!form.loading}
                />
              </View>

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.resetPassword.confirmPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.confirmPassword}
                  onChangeText={handleConfirmChange}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={s.input}
                  editable={!form.loading}
                />
              </View>
            </ScrollView>
          </AuthFormBody>
        </View>
      </SafeAreaView>
    </View>
  );
}
