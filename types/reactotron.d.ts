export {};

declare global {
  interface Console {
    /** Instância do Reactotron (só em `__DEV__` nativo). */
    tron?: import("reactotron-react-native").default;
  }
}
