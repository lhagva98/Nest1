import { GET_CATEGORIES } from "../constants";
import { ReduxAction } from "../network/reduxHandler";
import { payloads } from "../namespaces";

export default function (state = initialState, action: ReduxAction) {
  switch (action.type) {
    case GET_CATEGORIES.REQ:
      return {
        ...state,
        status: 100,
      };
    case GET_CATEGORIES.RES:
      if (action.success) {
        return {
          ...state,
          status: action.status,
          categories: action.payload.categories,
        };
      } else {
        return {
          ...state,
          status: action.status,
          error: action.error.message,
        };
      }
    case GET_CATEGORIES.ADD: {
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    }
    default:
      return state;
  }
}

export interface CategoryReducer {
  categories: payloads.CategoryList[];
  status: number;
  error: string | null;
}

const initialState: CategoryReducer = {
  categories: [],
  status: 100,
  error: null,
};
