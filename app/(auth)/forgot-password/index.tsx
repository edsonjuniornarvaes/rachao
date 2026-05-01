import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { AuthFormBody } from "@/features/auth/AuthFormBody";
import { useForgotPasswordViewModel } from "@/features/auth/login/forgotPasswordViewModel";
import { s } from "@/features/auth/login/styles";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import Ionicons from "@expo/vector-icons/Ionicons";
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

export default function ForgotPasswordScreen() {
  useStatusBarOnFocus("light");

  const {
    form,
    dimensions,
    emailValid,
    feedback,
    handleEmailChange,
    handleSubmit,
    handleNavigateToLogin,
  } = useForgotPasswordViewModel();

  const sentSuccess = feedback.kind === "success";

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
            onPress={handleNavigateToLogin}
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
                  disabled={form.loading || !emailValid || sentSuccess}
                  style={({ pressed }) => [
                    s.goldButton,
                    pressed &&
                      emailValid &&
                      !form.loading &&
                      !sentSuccess &&
                      s.pressed,
                    (form.loading || !emailValid || sentSuccess) &&
                      s.buttonDisabled,
                  ]}
                >
                  {form.loading ? (
                    <ActivityIndicator color={theme.colors.white} />
                  ) : (
                    <Text style={s.goldButtonText}>
                      {sentSuccess
                        ? t.auth.forgotPassword.sentLabel
                        : t.auth.forgotPassword.submit}
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleNavigateToLogin}
                  disabled={form.loading}
                  style={s.signupLinkWrap}
                >
                  <Text style={s.signupLinkHighlight}>
                    {t.auth.forgotPassword.backToLogin}
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
              <Text style={s.title}>{t.auth.forgotPassword.title}</Text>
              <Text style={s.subtitle}>{t.auth.forgotPassword.subtitle}</Text>

              {feedback.kind === "success" && (
                <View style={[s.feedbackBanner, s.feedbackSuccess]}>
                  <Text style={s.feedbackTitle}>
                    {t.auth.forgotPassword.successTitle}
                  </Text>
                  <Text style={s.feedbackBody}>
                    {t.auth.forgotPassword.successMessage}
                  </Text>
                </View>
              )}

              {feedback.kind === "error" && (
                <View style={[s.feedbackBanner, s.feedbackError]}>
                  <Text style={s.feedbackTitle}>{t.common.error}</Text>
                  <Text style={s.feedbackBody}>{feedback.message}</Text>
                </View>
              )}

              <View style={s.inputWrap}>
                <TextInput
                  placeholder={t.auth.forgotPassword.emailPlaceholder}
                  placeholderTextColor={theme.colors.placeholder}
                  value={form.email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  style={s.input}
                  editable={!form.loading && !sentSuccess}
                />
              </View>
            </ScrollView>
          </AuthFormBody>
        </View>
      </SafeAreaView>
    </View>
  );
}
