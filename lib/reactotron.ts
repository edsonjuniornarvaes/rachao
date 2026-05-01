import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";

/**
 * Só é importado em `__DEV__` nativo (ver `app/_layout.tsx`).
 *
 * App desktop: https://github.com/infinitered/reactotron/releases
 * Android físico: `adb reverse tcp:9090 tcp:9090`
 * Dispositivo na LAN: defina `EXPO_PUBLIC_REACTOTRON_HOST` (IP da máquina com o Reactotron).
 */
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "rachao",
    ...(process.env.EXPO_PUBLIC_REACTOTRON_HOST
      ? { host: process.env.EXPO_PUBLIC_REACTOTRON_HOST }
      : {}),
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate|127\.0\.0\.1:8081|localhost:8081/,
    },
    overlay: false,
  })
  .connect();

console.tron = reactotron;

export { reactotron };
