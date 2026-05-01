import { usePostAuthNavigation } from "@/contexts/PostAuthNavigationContext";
import { s } from "@/features/tabs/home/styles";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";

export default function Index() {
  const { endPostAuthNavigation } = usePostAuthNavigation();

  useStatusBarOnFocus("light");

  useFocusEffect(
    useCallback(() => {
      endPostAuthNavigation();
    }, [endPostAuthNavigation]),
  );

  return (
    <View style={s.container}>
      <View style={s.headerContainer}></View>
      <View style={s.bodyContainer}></View>
    </View>
  );
}
