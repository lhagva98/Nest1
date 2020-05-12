import fetchHandler from "../network/fetchHandler";
import headers from "../api/headers";
import { USER_INFO, LOGIN_URL, SIGNUP_URL } from "../api/urls";
import { AUTH } from "./type";

export function setLoginData(data) {
  return {
    type: AUTH.SET_USER_DATA,
    payload: data,
  };
}
export function showLogin() {
  return {
    type: AUTH.SHOW_LOGIN_MODAL,
  };
}
export function showRegister() {
  return {
    type: AUTH.SHOW_REGISTER_MODAL,
  };
}
export function closeAUTH() {
  return {
    type: AUTH.CLOSE_LOGIN_REGISTER,
  };
}
export function loginGuest() {
  return {
    type: AUTH.LOGIN_GUEST,
  };
}
export function logout() {
  return {
    type: AUTH.LOG_OUT,
  };
}
export const userInfo = () => {
  return fetchHandler(USER_INFO, {
    method: "get",
    headers: headers(true),
  });
};

export const login = (data) => {
  return fetchHandler(LOGIN_URL, {
    method: "post",
    headers: headers(),
    body: JSON.stringify(data),
  });
};
export const register = (data) => {
  return fetchHandler(SIGNUP_URL, {
    method: "post",
    headers: headers(),
    body: JSON.stringify(data),
  });
};
