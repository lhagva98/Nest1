import fetchHandler from "../network/fetchHandler";
import headers from "../api/headers";
import {
  GET_QUIZ_LIST,
  GET_QUESTIONS,
  GET_HISTORY,
  SUBMIT_ANSWER,
  SUBMIT_ANSWER_GUEST,
} from "../api/urls";
import { QUIZ } from "./type";

export function setHistoryData(data) {
  return {
    type: QUIZ.SET_SCORE_HISTORY,
    payload: data,
  };
}
export function setQuizList(data) {
  return {
    type: QUIZ.SET_QUIZ_LIST,
    payload: data,
  };
}
export function addHistory(data) {
  return {
    type: QUIZ.ADD_SCORE_CARD,
    payload: data,
  };
}

export const getQuizList = () => {
  return fetchHandler(GET_QUIZ_LIST, {
    method: "get",
    headers: headers(),
  });
};

export const getQuestions = (data) => {
  return fetchHandler(GET_QUESTIONS, {
    method: "post",
    headers: headers(),
    body: JSON.stringify(data),
  });
};
// export const getHistory = () => {
//   return fetchHandler(GET_HISTORY, {
//     method: "get",
//     headers: headers(true),
//   });
// };
export const submitAnswerUser = (data) => {
  return fetchHandler(SUBMIT_ANSWER, {
    method: "post",
    headers: headers(true),
    body: JSON.stringify(data),
  });
};
export const submitAnswerGuest = (data) => {
  return fetchHandler(SUBMIT_ANSWER_GUEST, {
    method: "post",
    headers: headers(),
    body: JSON.stringify(data),
  });
};
