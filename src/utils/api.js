const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return request('/ingredients');
};

export const getIngredientById = ({ id }) => {
  return request(`/ingredients/${id}`);
};

export const createOrder = async (data) => {
  return request('/orders', {
    method: 'POST',
    body: getBody(data),
  });
};

export const restorePassword = (data) => {
  return request('/password-reset', {
    method: 'POST',
    body: getBody(data),
  });
};

export const resetPassword = (data) => {
  return request('/password-reset/reset', {
    method: 'POST',
    body: getBody(data),
  });
};

export const authRegister = (data) => {
  return request('/auth/register', {
    method: 'POST',
    body: getBody(data),
  });
};

export const authLogin = (data) => {
  return request('/auth/login', {
    method: 'POST',
    body: getBody(data),
  });
};

export const authRefresh = ({ token }) => {
  return request('/auth/token', {
    method: 'POST',
    body: getBody({ token }),
  });
};

export const authLogout = (data) => {
  return request('/auth/logout', {
    method: 'POST',
    body: getBody(data),
  });
};

export const authUser = ({ accessToken }) => {
  return request('/auth/user', {
    method: 'GET',
    accessToken,
  });
};

export const patchUser = ({ data, accessToken }) => {
  return request('/auth/user/', {
    method: 'PATCH',
    body: getBody(data),
    accessToken,
  });
}

const request = async (url, init = {}) => {
  const res = await fetch(BASE_URL + url, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
      'Authorization': init.accessToken,
    },
  });

  if (!res.ok) {
    throw new Error(`Ошибка получения данных в ${url}: ${res.status}`);
  }

  const json = await res.json();

  return json;
};

const getBody = (data) => JSON.stringify(data);