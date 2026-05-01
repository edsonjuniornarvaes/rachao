import { s } from "@/features/tabs/explore/styles";
import { useExploreViewModel } from "@/features/tabs/explore/viewModel";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import { Text, View } from "react-native";

export default function Index() {
  const { CONSTANTS } = useExploreViewModel();

  useStatusBarOnFocus("dark");

  return (
    <View style={s.container}>
      <Text>{CONSTANTS.PLACEHOLDER_TEXT}</Text>
    </View>
  );
}
