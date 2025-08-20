import { MMKV } from "react-native-mmkv";
import * as Keychain from "react-native-keychain";

export const storage = new MMKV({
  id: "BAROPLATE",
});

// Wrapper to maintain compatibility with RNSecureStorage API
const secureStorageWrapper = {
  setItem: async (key: string, value: string) => {
    return await Keychain.setGenericPassword(key, value, { service: key });
  },
  getItem: async (key: string) => {
    const credentials = await Keychain.getGenericPassword({ service: key });
    if (credentials && credentials.username === key) {
      return credentials.password;
    }
    return null;
  },
  removeItem: async (key: string) => {
    return await Keychain.resetGenericPassword({ service: key });
  },
};

export const secureStorage = secureStorageWrapper;
