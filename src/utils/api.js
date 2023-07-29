const BASE_URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
  return request('/ingredients');
};

export const createOrder = async (data) => {
  return request('/orders', {
    method: 'POST',
    body: getBody(data),
  });
};

const request = async (url, init = {}) => {
  const res = await fetch(BASE_URL + url, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Ошибка получения данных в ${url}: ${res.status}`);
  }

  const json = await res.json();

  return json;
};

const getBody = (data) => JSON.stringify(data);