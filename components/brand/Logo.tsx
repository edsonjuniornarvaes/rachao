import React, { useId } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, Rect, G, Defs, RadialGradient, Stop } from "react-native-svg";
import { Typography } from "@/constants/theme";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "text";
  colorScheme?: "dark" | "light";
}

const sizes = {
  sm: { icon: 32, fontSize: 18, height: 40 },
  md: { icon: 48, fontSize: 28, height: 60 },
  lg: { icon: 64, fontSize: 36, height: 80 },
  xl: { icon: 80, fontSize: 44, height: 100 },
};

export function Logo({
  size = "md",
  variant = "full",
  colorScheme = "dark",
}: LogoProps) {
  const { icon: iconSize, fontSize, height } = sizes[size];
  const textColor = colorScheme === "dark" ? "#EEEEEE" : "#1A1A1A";
  const gradId = `rachao-bg-${useId().replace(/:/g, "")}`;

  /** Ícone: noite de campo + traços verdes (gramado / bola) + contorno claro. */
  const BallIcon = () => (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={gradId} cx="50%" cy="42%" rx="58%" ry="58%" fx="50%" fy="42%">
          <Stop offset="0%" stopColor="#122018" />
          <Stop offset="100%" stopColor="#050a08" />
        </RadialGradient>
      </Defs>
      <Rect width="100" height="100" fill={`url(#${gradId})`} />
      <G>
        <Circle cx="50" cy="50" r="33.5" stroke="#4ade80" strokeWidth={1.15} fill="none" />
        <Path
          d="M50 36.2 L61.35 44.5 L57.05 58.1 L42.95 58.1 L38.65 44.5 Z"
          stroke="#4ade80"
          strokeWidth={1.05}
          fill="none"
          strokeLinejoin="round"
        />
        <Path
          d="M22 72 Q34 58 50 54 Q66 50 78 62"
          stroke="#22c55e"
          strokeWidth={1.35}
          strokeLinecap="round"
          opacity={0.9}
          fill="none"
        />
      </G>
      <G opacity={0.9}>
        <Circle cx="50" cy="50" r="33.5" stroke="#ecfdf5" strokeWidth={0.5} fill="none" />
        <Path
          d="M50 36.2 L61.35 44.5 L57.05 58.1 L42.95 58.1 L38.65 44.5 Z"
          stroke="#ecfdf5"
          strokeWidth={0.48}
          fill="none"
          strokeLinejoin="round"
          opacity={0.95}
        />
        <Path
          d="M22 72 Q34 58 50 54 Q66 50 78 62"
          stroke="#ecfdf5"
          strokeWidth={0.55}
          strokeLinecap="round"
          opacity={0.3}
          fill="none"
        />
      </G>
    </Svg>
  );

  if (variant === "icon") {
    return <BallIcon />;
  }

  if (variant === "text") {
    return (
      <View style={styles.textContainer}>
        <Text style={[styles.logoText, { fontSize, color: textColor }]}>
          RACHÃO
        </Text>
        <View
          style={[
            styles.underline,
            { width: fontSize * 2.5, backgroundColor: "#22c55e" },
          ]}
        />
      </View>
    );
  }

  // Full logo (icon + text)
  return (
    <View style={[styles.container, { height }]}>
      <BallIcon />
      <View style={styles.textContainer}>
        <Text style={[styles.logoText, { fontSize, color: textColor }]}>
          RACHÃO
        </Text>
        <View
          style={[
            styles.underline,
            { width: fontSize * 2.2, backgroundColor: "#22c55e" },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  logoText: {
    fontFamily: Typography.fontFamily.headingBold,
    fontWeight: "800",
    letterSpacing: 2,
  },
  underline: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});

export default Logo;
