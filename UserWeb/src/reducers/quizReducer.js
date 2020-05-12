import { QUIZ, AUTH } from "../actions/type";

const INITIAL_STATE = {
  quiz_list: [],
  score_card: [],
  quiz_questions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUIZ.SET_QUIZ_LIST:
      return { ...state, quiz_list: action.payload.list };
    case QUIZ.SET_SCORE_HISTORY:
      return { ...state, score_card: action.payload };
    case QUIZ.ADD_SCORE_CARD:
      return { ...state, score_card: [action.payload, ...state.score_card] };
    case AUTH.LOG_OUT:
      return { ...state, score_card: [] };
    default:
      return { ...state };
  }
};
