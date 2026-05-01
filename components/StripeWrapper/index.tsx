import { StripeProvider } from "@stripe/stripe-react-native";
import type { PropsWithChildren, ReactElement } from "react";

type StripeWrapperProps = PropsWithChildren<{
  publishableKey: string;
}>;

/** Import estático evita ecrã intermédio com spinner enquanto o bundle do Stripe carrega. */
export function StripeWrapper({
  publishableKey,
  children,
}: StripeWrapperProps) {
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.com.rachao"
      urlScheme="rachao"
    >
      {children as ReactElement}
    </StripeProvider>
  );
}
