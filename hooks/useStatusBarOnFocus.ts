import { useFocusEffect } from "@react-navigation/native";
import { setStatusBarStyle, type StatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";

/**
 * Bottom tabs mantêm todos os ecrãs montados; vários `<StatusBar />` competem e o último
 * montado “ganha” em todo o app. Isto aplica o estilo da status bar só quando o ecrã está focado.
 */
export function useStatusBarOnFocus(style: StatusBarStyle) {
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(style);
    }, [style]),
  );
}
