import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { AuthFormBody } from "@/features/auth/AuthFormBody";
import { s } from "@/features/auth/login/styles";
import { useLoginViewModel } from "@/features/auth/login/viewModel";

import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useStatusBarOnFocus("light");

  const params = useLocalSearchParams<{ pwdUpdated?: string }>();
  const showPasswordUpdatedBanner = params.pwdUpdated === "1";

  const {
    form,
    dimensions,
    feedbackError,
    handleEmailChange,
    handlePasswordChange,
    handleToggleRememberMe,
    handleLogin,
    handleNavigateToSignup,
    handleNavigateToForgotPassword,
  } = useLoginViewModel();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const raysLeft = (dimensions.screenW - dimensions.raysW) / 2;
  const contentPaddingBottom = dimensions.bottomPadding + theme.spacing.lg;
  const busy = form.loading;

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
            onPress={() => router.replace("/(auth)/entry")}
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
                  onPress={handleLogin}
                  disabled={busy}
                  style={({ pressed }) => [
                    s.goldButton,
                    form.loading && s.goldButtonLoading,
                    pressed && !busy && s.pressed,
                    busy && s.buttonDisabled,
                  ]}
                >
                  {form.loading ? (
                    <ActivityIndicator
                      color={theme.colors.white}
                      size="small"
                    />
                  ) : (
                    <Text style={s.goldButtonText}>{t.auth.login.submit}</Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleNavigateToSignup}
                  disabled={busy}
                  style={s.signupLinkWrap}
                >
                  <Text style={s.signupLink}>
                    {t.auth.login.noAccount}
                    <Text style={s.signupLinkHighlight}>
                      {t.auth.login.signupLink}
                    </Text>
                  </Text>
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
              <Text style={s.title}>{t.auth.login.title}</Text>
              <Text style={s.subtitle}>{t.auth.login.subtitle}</Text>

              {showPasswordUpdatedBanner ? (
                <View style={[s.feedbackBanner, s.feedbackSuccess]}>
                  <Text style={s.feedbackTitle}>
                    {t.auth.resetPassword.successTitle}
                  </Text>
                  <Text style={s.feedbackBody}>
                    {t.auth.resetPassword.successMessage}
                  </Text>
                </View>
              ) : null}

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
                  placeholder={t.auth.login.emailPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={s.input}
                  editable={!busy}
                />
              </View>

              <View style={s.inputWrap}>
                <View style={s.inputRow}>
                  <TextInput
                    placeholder={t.auth.login.passwordPlaceholder}
                    placeholderTextColor={theme.colors.placeholder}
                    value={form.password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!passwordVisible}
                    style={s.inputFlex}
                    editable={!busy}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    onPress={() => setPasswordVisible((v) => !v)}
                    style={({ pressed }) => [
                      s.passwordToggle,
                      pressed && s.pressedLight,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={
                      passwordVisible
                        ? t.auth.login.hidePassword
                        : t.auth.login.showPassword
                    }
                    hitSlop={8}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color={theme.colors.textMuted}
                    />
                  </Pressable>
                </View>
              </View>

              <View style={s.optionsRow}>
                <Pressable
                  onPress={handleToggleRememberMe}
                  style={s.checkRow}
                  hitSlop={8}
                  disabled={busy}
                >
                  <View
                    style={[s.checkbox, form.rememberMe && s.checkboxChecked]}
                  >
                    {form.rememberMe && <Text style={s.checkMark}>✓</Text>}
                  </View>
                  <Text style={s.optionLabel}>{t.auth.login.rememberMe}</Text>
                </Pressable>
                <Pressable
                  hitSlop={8}
                  onPress={handleNavigateToForgotPassword}
                  disabled={busy}
                >
                  <Text style={s.forgotText}>
                    {t.auth.login.forgotPassword}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </AuthFormBody>
        </View>
      </SafeAreaView>
    </View>
  );
}
