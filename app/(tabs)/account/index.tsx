import { s } from "@/features/tabs/account/styles";
import { useAccountViewModel } from "@/features/tabs/account/viewModel";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { userData, handleLogout, CONSTANTS } = useAccountViewModel();

  useStatusBarOnFocus("dark");

  return (
    <View style={s.container}>
        <Text style={s.userName}>{userData.userName}</Text>
        {userData.userEmail && (
          <Text style={s.userEmail}>{userData.userEmail}</Text>
        )}
        <Button
          title={t.account.logout}
          onPress={handleLogout}
          color={CONSTANTS.BUTTON_COLOR}
        />
      </View>
  );
}
