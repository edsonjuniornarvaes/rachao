import WhiteLogoSvg from "@/assets/svg/logo.svg";
import { theme } from "@/constants/theme";
import { ENTRY_CONSTANTS } from "@/features/auth/entry/models";
import t from "@/lib/translator";
import { LinearGradient } from "expo-linear-gradient";
import { setStatusBarStyle } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

function ScreenLayout({ children }: { children?: React.ReactNode }) {
  const { width: screenW, height: screenH } = useWindowDimensions();

  useEffect(() => {
    setStatusBarStyle("light");
  }, []);

  const raysW = screenW * 1.2;
  const raysH = (293 / 375) * raysW;
  const logoW = screenW * ENTRY_CONSTANTS.LOGO_W_RATIO;
  const logoH = logoW * ENTRY_CONSTANTS.LOGO_ASPECT;
  const logoCenterY = screenH * ENTRY_CONSTANTS.LOGO_CENTER_Y_RATIO;
  const logoTop = logoCenterY - logoH / 2;

  return (
    <View style={s.root}>
      <View
        style={[
          s.raysWrap,
          { left: (screenW - raysW) / 2, width: raysW, height: raysH },
        ]}
        pointerEvents="none"
      >
        {/* <RaysSvg width={raysW} height={raysH} /> */}
      </View>
      <LinearGradient
        colors={["transparent", "rgba(13,13,18,0.85)", theme.colors.background]}
        locations={[0, 0.6, 1]}
        style={[s.gradient, { height: screenH * 0.55 }]}
        pointerEvents="none"
      />
      <View style={[s.content, { top: logoTop }]}>
        <WhiteLogoSvg width={logoW} height={logoH} />
        {children}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  raysWrap: {
    position: "absolute",
    top: 0,
    zIndex: 0,
    overflow: "hidden",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  tagline: {
    color: theme.colors.textLight,
    fontFamily: "Chivo_300Light",
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginTop: theme.spacing.xl,
  },
  indicator: {
    marginTop: theme.spacing.xxxl,
  },
  errorText: {
    color: theme.colors.textLight,
    marginTop: theme.spacing.xxl,
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 40,
  },
});

export function LoadingScreen() {
  return (
    <ScreenLayout>
      <ActivityIndicator
        size="small"
        color={theme.colors.gold}
        style={s.indicator}
      />
    </ScreenLayout>
  );
}

const STRIPE_CONFIG_MESSAGE = t.layout.missingStripeKey;

export function MissingStripeKeyScreen() {
  return (
    <ScreenLayout>
      <Text style={s.errorText}>{STRIPE_CONFIG_MESSAGE}</Text>
    </ScreenLayout>
  );
}
