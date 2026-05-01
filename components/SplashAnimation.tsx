import { theme } from "@/constants/theme";
import LottieView from "lottie-react-native";
import { useCallback, useRef, useState } from "react";
import { Animated, StyleSheet, useWindowDimensions } from "react-native";

const animation = require("@/assets/animations/scissors-logo.json");

/**
 * Overlay pós-splash: toca a animação Lottie da tesoura e
 * faz fade-out para revelar o conteúdo por baixo.
 */
export function SplashAnimation({ onFinish }: { onFinish: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);
  const { width, height } = useWindowDimensions();

  const lottieSize = Math.min(width, height) * 0.45;

  const handleAnimationFinish = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onFinish();
    });
  }, [onFinish, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[s.overlay, { opacity }]} pointerEvents="none">
      <LottieView
        source={animation}
        autoPlay
        loop={false}
        speed={1.2}
        onAnimationFinish={handleAnimationFinish}
        style={{ width: lottieSize, height: lottieSize }}
      />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});
