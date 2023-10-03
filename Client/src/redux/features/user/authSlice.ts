import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Roles, User } from "../../../types";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export type decodedJWT = {
  user: {
    roles: Roles[];
  };
};

export type AuthState = {
  auth: {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  };
};

const initialState: AuthState["auth"] = {
  user: null,
  token: null,
  isAuthenticated: !!Cookies.get("logged_in"),
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      // decode accessToken to get roles
      const decoded: decodedJWT = jwtDecode(accessToken);

      const newUser: User = { ...user, roles: decoded.user.roles };
      state.user = newUser;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.loading = false
      return state
    },
    logOut: (state, _action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false
      return state
    },
    handleLoading: (state,action) => {
      state.loading = action.payload
      return state
    },
    updateAvatar: (state,action: PayloadAction<string>) => {
      state.user!.avatar = action.payload
      return state
    }
  },
});

export const { setCredentials, logOut, handleLoading,updateAvatar } = authSlice.actions;

export default authSlice.reducer;
