const BASE_URL = "https://norma.nomoreparties.space/api";

export const getApiData = async () => {
  const res = await fetch(BASE_URL + '/ingredients');
  if (!res.ok) {
    throw new Error(`Ошибка получения данных в getApiData: ${res.status}`);
  }

  return res.json();
}