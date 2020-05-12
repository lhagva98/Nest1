import { SET_USER_DATA } from "../constants";
import { ReduxAction } from "../network/reduxHandler";
export default function (state = initialState, action: ReduxAction) {
  switch (action.type) {
    case SET_USER_DATA.RES:
      return {
        user: action.payload.user,
      };
    default:
      return state;
  }
}
export namespace MainReducerNS {
  export interface user {
    _id: string;
    email: string;
  }
}
export interface MainReducer {
  user: MainReducerNS.user;
}
const initialState: MainReducer = {
  user: null,
};
