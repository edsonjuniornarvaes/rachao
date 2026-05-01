import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_EMAIL_KEY = "@rachao/savedLoginEmail";

export async function loadSavedLoginEmail(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(SAVED_EMAIL_KEY);
  } catch {
    return null;
  }
}

export async function persistLoginEmail(email: string): Promise<void> {
  try {
    await AsyncStorage.setItem(SAVED_EMAIL_KEY, email.trim());
  } catch {
    /* ignore */
  }
}

export async function clearSavedLoginEmail(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAVED_EMAIL_KEY);
  } catch {
    /* ignore */
  }
}
