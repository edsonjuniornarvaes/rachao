import { initSentry } from "@/lib/sentry";
import { Platform } from "react-native";

initSentry();

const isJest = typeof process.env.JEST_WORKER_ID !== "undefined";

if (__DEV__ && Platform.OS !== "web" && !isJest) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- evita carregar Reactotron no web / produção / Jest
  require("./lib/reactotron");
}
