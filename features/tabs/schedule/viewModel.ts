import { createPaymentIntent } from "@/lib/checkout";
import t from "@/lib/translator";
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { PaymentState, SCHEDULE_CONSTANTS } from "./models";

export const useScheduleViewModel = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentState, setPaymentState] = useState<PaymentState>({
    loading: false,
    error: null,
    successMessage: null,
  });

  const handlePayment = async () => {
    setPaymentState({
      loading: true,
      error: null,
      successMessage: null,
    });

    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      setPaymentState({
        loading: false,
        error: t.schedule.timeoutMessage,
        successMessage: null,
      });
    }, SCHEDULE_CONSTANTS.TIMEOUT_MS);

    try {
      const clientSecret = await createPaymentIntent(
        SCHEDULE_CONSTANTS.DEFAULT_AMOUNT,
      );

      if (timedOut) return;

      if (!clientSecret) {
        clearTimeout(timeout);
        setPaymentState({
          loading: false,
          error: t.schedule.errorPaymentCode,
          successMessage: null,
        });
        return;
      }

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: SCHEDULE_CONSTANTS.MERCHANT_NAME,
        defaultBillingDetails: {
          name: SCHEDULE_CONSTANTS.DEFAULT_CLIENT_NAME,
        },
      });

      if (timedOut) return;

      if (initError) {
        clearTimeout(timeout);
        setPaymentState({
          loading: false,
          error: `${t.schedule.errorCheckout}: ${initError.message}`,
          successMessage: null,
        });
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      clearTimeout(timeout);
      if (timedOut) return;

      if (presentError) {
        setPaymentState({
          loading: false,
          error: `${t.schedule.cancelledOrError}: ${presentError.message}`,
          successMessage: null,
        });
      } else {
        setPaymentState({
          loading: false,
          error: null,
          successMessage: t.schedule.successMessage,
        });
      }
    } catch (error: unknown) {
      clearTimeout(timeout);
      if (timedOut) return;
      console.error(error);
      const msg =
        (error as { message?: string })?.message ?? t.schedule.errorGeneric;
      setPaymentState({
        loading: false,
        error: String(msg),
        successMessage: null,
      });
    }
  };

  return {
    paymentState,
    handlePayment,
    CONSTANTS: SCHEDULE_CONSTANTS,
  };
};
