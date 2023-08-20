import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookie";
import { AppState } from "../store";
import { IFormProps } from "../../types/form";
import { User } from "../../utils/api";
import { createAppAsyncThunk } from "../thunk";
import { RequestStatus } from "../../utils/request-status";
import * as api from "../../utils/api";

export const DATA_KEY = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

type authState = {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  returnUrl: string;
  restoreOk: boolean;
  status: RequestStatus;
};

const setAccessToken = (state: authState, accessToken: string) => {
  state.accessToken = accessToken;

  if (accessToken) {
    const minutes20 = new Date(Date.now() + 20 * 60 * 1000).toUTCString();
    document.cookie = `${DATA_KEY.ACCESS_TOKEN}=${accessToken}; expires=${minutes20}`;
  } else {
    document.cookie = `${DATA_KEY.ACCESS_TOKEN}=; max-age=-1`;
  }
};

const setRefreshToken = (state: authState, refreshToken: string) => {
  state.refreshToken = refreshToken;
  if (refreshToken) {
    localStorage.setItem(DATA_KEY.REFRESH_TOKEN, refreshToken);
  } else {
    localStorage.removeItem(DATA_KEY.REFRESH_TOKEN);
  }
};

export const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: getCookie(DATA_KEY.ACCESS_TOKEN) || "",
    refreshToken: localStorage.getItem(DATA_KEY.REFRESH_TOKEN) || "",
    returnUrl: "",
    restoreOk: false,
    status: RequestStatus.INITIAL,
  } as authState,
  reducers: {
    setReturnUrl(state, { payload }) {
      state.returnUrl = payload;
    },
    setRestoreOk(state) {
      state.restoreOk = true;
    },
  },
  extraReducers: (builder) => {
    type RegisterPayload = PayloadAction<{
      accessToken: string;
      refreshToken: string;
      user: User;
    }>;

    const onRegister = (state: authState, { payload }: RegisterPayload) => {
      setAccessToken(state, payload.accessToken);
      setRefreshToken(state, payload.refreshToken);
      state.user = payload.user;
    };

    builder.addCase(authRegister.fulfilled, onRegister);
    builder.addCase(authLogin.fulfilled, onRegister);
    builder.addCase(authRefresh.fulfilled, (state, { payload }) => {
      setAccessToken(state, payload.accessToken);
      setRefreshToken(state, payload.refreshToken);
    });
    builder.addCase(authLogout.fulfilled, (state) => {
      setAccessToken(state, "");
      setRefreshToken(state, "");
      state.user = null;
      state.status = RequestStatus.INITIAL;
    });
    builder.addCase(authUser.pending, (state) => {
      state.status = RequestStatus.PENDING;
    });
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.status = RequestStatus.SUCCESS;
    });
    builder.addCase(authUser.rejected, (state) => {
      state.status = RequestStatus.ERROR;
    });
    builder.addCase(authRefresh.rejected, (state) => {
      state.status = RequestStatus.ERROR;
    });

    builder.addCase(patchUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
  },
});

export const authSelectors = {
  user: (state: AppState) => state.auth.user,
  accessToken: (state: AppState) => state.auth.accessToken,
  refreshToken: (state: AppState) => state.auth.refreshToken,
};

export const authRegister = createAppAsyncThunk(
  "auth/register",
  api.authRegister
);

export const authLogin = createAppAsyncThunk("auth/login", api.authLogin);

export const authRefresh = createAppAsyncThunk(
  "auth/refresh",
  async (_, { getState }) => {
    const state = getState();
    const refreshToken = state.auth.refreshToken;
    return await api.authRefresh({ token: refreshToken });
  }
);

export const authLogout = createAppAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const state = getState();

    return await api.authLogout({
      token: state.auth.refreshToken,
    });
  }
);

export const authUser = createAppAsyncThunk(
  "auth/user",
  async (_, { getState }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    return await api.authUser({ accessToken });
  }
);

export const patchUser = createAppAsyncThunk(
  "auth/profile",
  async (data: IFormProps, { getState }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    return await api.patchUser({ data, accessToken });
  }
);

export const authActions = slice.actions;
export default slice.reducer;
