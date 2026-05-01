import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { AuthFormBody } from "@/features/auth/AuthFormBody";
import { s as loginS } from "@/features/auth/login/styles";
import { s } from "@/features/auth/signup/styles";
import { useSignupViewModel } from "@/features/auth/signup/viewModel";
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

export default function Index() {
  useStatusBarOnFocus("light");

  const {
    form,
    dimensions,
    feedback,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleGoToLoginAfterSignup,
    handleNavigateBack,
  } = useSignupViewModel();

  const scrollRef = useRef<ScrollView>(null);
  const raysLeft = (dimensions.screenW - dimensions.raysW) / 2;
  const contentPaddingBottom = dimensions.bottomPadding + theme.spacing.lg;

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
                {feedback.kind !== "success" ? (
                  <Pressable
                    onPress={handleSignUp}
                    disabled={form.loading}
                    style={({ pressed }) => [
                      s.goldButton,
                      pressed && s.pressed,
                      form.loading && s.disabledOpacity,
                    ]}
                  >
                    {form.loading ? (
                      <ActivityIndicator color={theme.colors.white} />
                    ) : (
                      <Text style={s.goldButtonText}>
                        {t.auth.signup.submit}
                      </Text>
                    )}
                  </Pressable>
                ) : null}

                <Pressable onPress={handleNavigateBack} style={s.loginLinkWrap}>
                  <Text style={s.loginLink}>
                    {t.auth.signup.hasAccount}
                    <Text style={s.loginLinkHighlight}>
                      {t.auth.signup.loginLink}
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
              <Text style={s.title}>{t.auth.signup.title}</Text>
              <Text style={s.subtitle}>{t.auth.signup.subtitle}</Text>

              {feedback.kind === "success" ? (
                <View style={[loginS.feedbackBanner, loginS.feedbackSuccess]}>
                  <Text style={loginS.feedbackTitle}>
                    {t.auth.signup.successTitle}
                  </Text>
                  <Text style={loginS.feedbackBody}>
                    {t.auth.signup.successMessage}
                  </Text>
                  <Pressable
                    onPress={handleGoToLoginAfterSignup}
                    style={({ pressed }) => [
                      loginS.goldButton,
                      { marginTop: theme.spacing.lg },
                      pressed && loginS.pressed,
                    ]}
                  >
                    <Text style={loginS.goldButtonText}>
                      {t.auth.signup.loginLink}
                    </Text>
                  </Pressable>
                </View>
              ) : null}

              {feedback.kind === "error" ? (
                <View
                  style={[loginS.feedbackBanner, loginS.feedbackError]}
                  accessibilityRole="alert"
                >
                  <Text style={loginS.feedbackTitle}>{t.common.error}</Text>
                  <Text style={loginS.feedbackBody}>{feedback.message}</Text>
                </View>
              ) : null}

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.signup.namePlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.name}
                  onChangeText={handleNameChange}
                  style={s.input}
                  editable={!form.loading && feedback.kind !== "success"}
                />
              </View>

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.signup.emailPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={s.input}
                  editable={!form.loading && feedback.kind !== "success"}
                />
              </View>

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.signup.passwordPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry
                  style={s.input}
                  editable={!form.loading && feedback.kind !== "success"}
                />
              </View>
            </ScrollView>
          </AuthFormBody>
        </View>
      </SafeAreaView>
    </View>
  );
}
