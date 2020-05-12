import { combineReducers } from "redux";
import authReducer from "./authReducer";
import quizReducer from "./quizReducer";
export default combineReducers({
  auth: authReducer,
  quiz: quizReducer,
});
