import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
  Cookies.set(key, value);
};

export const getCookie = (key) => {
  return Cookies.get(key);
};