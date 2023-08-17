import { Ingredient } from '../types/ingredient';

const BASE_URL = 'https://norma.nomoreparties.space/api';

type BaseResponse = {
  success: boolean;
}

export type User = {
  email: string;
  name: string;
}

export type GetIngredientsResponse = BaseResponse & {
  data: Ingredient[];
}

export const getIngredients = () => {
  return request<GetIngredientsResponse>('/ingredients');
};

export type CreateOrderData = {
  ingredients: string[];
}
export type CreateOrderResponse = BaseResponse & {
  name: string;
  order: {
    number: number;
  };
}

export const createOrder = async (data: CreateOrderData) => {
  return request<CreateOrderResponse>('/orders', {
    method: 'POST',
    body: getBody(data),
  });
};

export type RestorePasswordData = {
  email: string;
}

export type RestorePasswordResponse = BaseResponse & {
  message: string;
}

export const restorePassword = (data: RestorePasswordData) => {
  return request<RestorePasswordResponse>('/password-reset', {
    method: 'POST',
    body: getBody(data),
  });
};

export type ResetPasswordData = {
  password: string;
  token: string;
}

export type ResetPasswordResponse = BaseResponse & {
  message: string;
}

export const resetPassword = (data: ResetPasswordData) => {
  return request<ResetPasswordResponse>('/password-reset/reset', {
    method: 'POST',
    body: getBody(data),
  });
};

export type AuthRegisterData = User & {
  password: string;
}

export type AuthRegisterResponse = BaseResponse & {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authRegister = (data: AuthRegisterData) => {
  return request<AuthRegisterResponse>('/auth/register', {
    method: 'POST',
    body: getBody(data),
  });
};

export type AuthLoginData = {
  email: string;
  password: string;
}
export type AuthLoginResponse = BaseResponse & {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authLogin = (data: AuthLoginData) => {
  return request<AuthLoginResponse>('/auth/login', {
    method: 'POST',
    body: getBody(data),
  });
};

export type AuthRefreshData = {
  token: string;
}
export type AuthRefreshResponse = BaseResponse & {
  accessToken: string;
  refreshToken: string;
}

export const authRefresh = ({ token }: AuthRefreshData) => {
  return request<AuthRefreshResponse>('/auth/token', {
    method: 'POST',
    body: getBody({ token }),
  });
};

export type AuthLogoutData = {
  token: string;
}
export type AuthLogoutResponse = {
  success: true;
  message: string;
}

export const authLogout = (data: AuthLogoutData) => {
  return request<AuthLogoutResponse>('/auth/logout', {
    method: 'POST',
    body: getBody(data),
  });
};

export type AuthUserData = {
  accessToken: string;
}

export type AuthUserResponse = BaseResponse & {
  user: User;
}

export const authUser = ({ accessToken }: AuthUserData) => {
  return request<AuthUserResponse>('/auth/user', {
    method: 'GET',
    accessToken,
  });
};

export type PatchUserData = {
  data: User & {
    password: string;
  };
  accessToken: string;
}

export type PatchUserResponse = BaseResponse & {
  user: User;
}

export const patchUser = ({ data, accessToken }: PatchUserData) => {
  return request<PatchUserResponse>('/auth/user', {
    method: 'PATCH',
    body: getBody(data),
    accessToken,
  });
}

export type Init = RequestInit & { accessToken?: string };

const request = async <TResponse>(url: string, init: Init = {}) => {
  const res = await fetch(BASE_URL + url, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
      'Authorization': init.accessToken || '',
    },
  });

  if (!res.ok) {
    throw new Error(`Ошибка получения данных в ${url}: ${res.status}`);
  }

  const json = await res.json();

  return json as TResponse;
};

const getBody = (data: object) => JSON.stringify(data);