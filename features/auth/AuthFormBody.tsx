import { s } from "@/features/auth/login/styles";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

/**
 * Cartão do formulário (login, cadastro, etc.): fundo suave + fade no topo.
 * Aceita um `footer` opcional que fica fixo acima do teclado via KAV.
 *
 * @param headerHeight – altura do header escuro acima deste cartão;
 *   usado como `keyboardVerticalOffset` para que o botão
 *   sempre fique visível acima do teclado.
 */
export function AuthFormBody({
  children,
  footer,
  headerHeight = 0,
}: {
  children: ReactNode;
  footer?: ReactNode;
  headerHeight?: number;
}) {
  return (
    <View style={s.body}>
      <LinearGradient
        colors={["rgba(13, 13, 18, 0.045)", "transparent"]}
        locations={[0, 1]}
        style={s.bodyTopFade}
        pointerEvents="none"
      />
      <KeyboardAvoidingView
        style={s.bodyContent}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight}
      >
        {children}
        {footer}
      </KeyboardAvoidingView>
    </View>
  );
}
