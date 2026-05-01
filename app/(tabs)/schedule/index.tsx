import { s } from "@/features/tabs/schedule/styles";
import { useScheduleViewModel } from "@/features/tabs/schedule/viewModel";
import { useStatusBarOnFocus } from "@/hooks/useStatusBarOnFocus";
import t from "@/lib/translator";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Index() {
  const { paymentState, handlePayment, CONSTANTS } = useScheduleViewModel();

  useStatusBarOnFocus("dark");

  const amountInReais = (CONSTANTS.DEFAULT_AMOUNT / 100).toFixed(2);

  return (
    <View style={s.container}>
        <Text style={s.title}>{t.schedule.title}</Text>

        {paymentState.loading ? (
          <ActivityIndicator size="large" color={CONSTANTS.BUTTON_COLOR} />
        ) : (
          <Button
            title={t.schedule.pay(amountInReais)}
            onPress={handlePayment}
            color={CONSTANTS.BUTTON_COLOR}
          />
        )}

        {paymentState.error ? (
          <Text style={s.errorText}>{paymentState.error}</Text>
        ) : null}

        {paymentState.successMessage ? (
          <Text style={s.successText}>{paymentState.successMessage}</Text>
        ) : null}
      </View>
  );
}
