import { s } from "@/features/tabs/agenda/styles";
import { useAgendaViewModel } from "@/features/tabs/agenda/viewModel";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import { Text, View } from "react-native";

export default function Index() {
  const { CONSTANTS } = useAgendaViewModel();

  useStatusBarOnFocus("dark");

  return (
    <View style={s.container}>
      <Text>{CONSTANTS.PLACEHOLDER_TEXT}</Text>
    </View>
  );
}
