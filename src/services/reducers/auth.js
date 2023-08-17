import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import * as api from '../../utils/api';

export const DATA_KEY = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

const getInitialState = () => ({
  user: null,
  accessToken: getCookie(DATA_KEY.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(DATA_KEY.REFRESH_TOKEN) || null,
  returnUrl: '',
  restoreOk: false,
});

const setAccessToken = (state, accessToken) => {
  state.accessToken = accessToken;

  if (accessToken) {
    const minutes20 = new Date(Date.now() + 20 * 60 * 1000).toUTCString();
    document.cookie = `${DATA_KEY.ACCESS_TOKEN}=${accessToken}; expires=${minutes20}`;
  } else {
    document.cookie = `${DATA_KEY.ACCESS_TOKEN}=; max-age=-1`;
  }
};

const setRefreshToken = (state, refreshToken) => {
  state.refreshToken = refreshToken;
  if (refreshToken) {
    localStorage.setItem(DATA_KEY.REFRESH_TOKEN, refreshToken);
  } else {
    localStorage.removeItem(DATA_KEY.REFRESH_TOKEN);
  }
};

export const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setReturnUrl(state, { payload }) {
      state.returnUrl = payload;
    },
    setRestoreOk(state) {
      state.restoreOk = true;
    }
  },
  extraReducers: (builder) => {
    const onRegister = (state, {
      payload
    }) => {
      setAccessToken(state, payload.accessToken);
      setRefreshToken(state, payload.refreshToken);
      state.user = payload.user;
    };

    builder.addCase(authRegister.fulfilled, onRegister);
    builder.addCase(authLogin.fulfilled, onRegister);
    builder.addCase(authRefresh.fulfilled, (state, {
      payload
    }) => {
      setAccessToken(state, payload.accessToken);
    });
    builder.addCase(authLogout.fulfilled, (state) => {
      setAccessToken(state, null);
      setRefreshToken(state, null);
      state.user = null;
    });
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;

    });
    // кейс для записи изменений в стор
    builder.addCase(patchUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    })
  }
});

export const authSelectors = {
  user: (state) => state.auth.user,
  accessToken: (state) => state.auth.accessToken,
  refreshToken: (state) => state.auth.refreshToken,
};

export const authRegister = createAsyncThunk(
  'auth/register',
  async (data) => {
    return await api.authRegister(data);
  },
);

export const authLogin = createAsyncThunk(
  'auth/login',
  async (data) => {
    return await api.authLogin(data);
  },
);

export const authRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, { getState }) => {
    const state = getState();
    const refreshToken = state.auth.refreshToken;
    return await api.authRefresh({ token: refreshToken });
  },
);

export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, {
    getState
  }) => {
    const state = getState();

    return await api.authLogout({
      token: state.auth.refreshToken
    });
  },
);

export const authUser = createAsyncThunk(
  'auth/user',
  async (_, { getState }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    return await api.authUser({ accessToken });
  },
);



// функция усилитель измен данные юзера
export const patchUser = createAsyncThunk(
  'auth/profile',
  async (data, { getState }) => {
    const state = getState();
    const accessToken = state.auth.accessToken;

    return await api.patchUser({data, accessToken });
  },
)

export const authActions = slice.actions;
export default slice.reducer;