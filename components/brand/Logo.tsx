import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, Rect, G } from "react-native-svg";
import { Brand, Typography } from "@/constants/theme";

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

  const BallIcon = () => (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
      {/* Soccer Ball */}
      <Circle cx="50" cy="50" r="45" fill={Brand.primary} />

      {/* Pentagon patterns */}
      <Path d="M50 15L62 32L56 52L44 52L38 32L50 15Z" fill={Brand.primaryDark} />
      <Path
        d="M72 38L84 54L72 72L56 66L56 52L72 38Z"
        fill={Brand.primaryDark}
      />
      <Path
        d="M28 38L44 52L44 66L28 72L16 54L28 38Z"
        fill={Brand.primaryDark}
      />
      <Path
        d="M38 76L50 85L62 76L56 66L44 66L38 76Z"
        fill={Brand.primaryDark}
      />

      {/* Shine */}
      <Circle cx="36" cy="32" r="10" fill={Brand.primaryLight} opacity="0.5" />

      {/* Motion accent */}
      <Path
        d="M10 50C10 50 22 42 34 46"
        stroke={Brand.secondary}
        strokeWidth="5"
        strokeLinecap="round"
      />
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
            { width: fontSize * 2.5, backgroundColor: Brand.secondary },
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
            { width: fontSize * 2.2, backgroundColor: Brand.secondary },
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
