import { combineReducers } from "redux";

import main, { MainReducer } from "./reducers/main";
import categories, { CategoryReducer } from "./reducers/categories";
const reducers = combineReducers({
  main,
  categories,
});

export interface ReducerProps {
  main: MainReducer;
  categories: CategoryReducer;
}

export default reducers;
