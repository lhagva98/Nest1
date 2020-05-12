export const ROOT_URL = "http://127.0.0.1:5000";
const withKey = (url) => `${ROOT_URL}${url}`;

export const LOGIN_URL = withKey("/user/login");
export const SIGNUP_URL = withKey("/user/register");
export const USER_INFO = withKey("/user/info");
export const GET_QUIZ_LIST = withKey("/user/getCategories");
export const GET_QUESTIONS = withKey("/user/questions");
export const SUBMIT_ANSWER = withKey("/user/answer/submit");
export const GET_HISTORY = withKey("/user/myHistory");
export const SUBMIT_ANSWER_GUEST = withKey("/guest/answer/submit");
