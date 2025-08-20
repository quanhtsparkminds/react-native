import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ERole } from "hooks";
import { persistReducer } from "redux-persist";
import { api } from "services";
import { RootState } from "store/Store";
import { reduxSecureStorage, secureStorage, StorageKeys } from "utils";

export const authSliceKey = "auth";

type AuthState = {
  token: string;
  role: ERole;
};

const initialState: AuthState = {
  token: "",
  role: ERole.USER1,
};

export const authSlice = createSlice({
  name: authSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string; role: ERole }>) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      // Store token in secure storage
      secureStorage.setItem(StorageKeys.token, token);

      // Configure API
      api.setup({ token });
    },
    signOut: (state) => {
      state.token = "";
      state.role = ERole.USER1;

      // Clear secure storage
      secureStorage.removeItem(StorageKeys.token);

      // Clear API tokens
      api.ejectTokens();
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);
export const selectRole = (state: RootState) => state.auth.role;


// Configure Redux-persist
export default persistReducer<AuthState>(
  {
    key: authSliceKey,
    storage: reduxSecureStorage,
    blacklist: ["isLoading", "error"], // Don't persist loading state or errors
  },
  authSlice.reducer
);
