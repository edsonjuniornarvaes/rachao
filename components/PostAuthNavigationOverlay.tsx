import { LoadingScreen } from "@/components/LayoutPlaceholder";
import { usePostAuthNavigation } from "@/contexts/PostAuthNavigationContext";
import { StyleSheet, View } from "react-native";

/**
 * Overlay após login/OAuth enquanto a navegação vai para a home.
 * Não é usado no fluxo entry → home (sessão já existente).
 */
export function PostAuthNavigationOverlay() {
  const { isPostAuthNavigating } = usePostAuthNavigation();

  if (!isPostAuthNavigating) {
    return null;
  }

  return (
    <View
      style={styles.wrap}
      pointerEvents="auto"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <LoadingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});
