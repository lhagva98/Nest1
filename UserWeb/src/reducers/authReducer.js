import { AUTH } from "../actions/type";
import Cookies from "js-cookie";
const INITIAL_STATE = {
  isGuest: false,
  userData: null,
  isLogin: false,
  loginModal: false,
  registerModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH.SHOW_LOGIN_MODAL:
      return { ...state, loginModal: true, registerModal: false };
    case AUTH.SHOW_REGISTER_MODAL:
      return { ...state, loginModal: false, registerModal: true };
    case AUTH.CLOSE_LOGIN_REGISTER:
      return { ...state, loginModal: false, registerModal: false };
    case AUTH.SET_USER_DATA:
      return { ...state, userData: action.payload, isLogin: true };
    case AUTH.LOGIN_GUEST:
      return {
        ...state,
        userData: { name: "Зочин" },
        isLogin: true,
        isGuest: true,
        loginModal: false,
      };
    case AUTH.LOG_OUT:
      Cookies.remove("token");
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
