import Cookies from 'js-cookie'

const TokenKey = 'token';

export function getToken() {
  window.localStorage.getItem("token");
  return Cookies.get(TokenKey)
}

export function setToken(token) {
    window.localStorage.getItem("token",TokenKey);
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    window.localStorage.removeItem("token");
  return Cookies.remove(TokenKey)
}
