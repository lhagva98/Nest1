export default interface ReduxConstants {
  REQ?: string;
  RES: string;
  ADD?: string;
}

export const SET_USER_DATA: ReduxConstants = {
  RES: "SET_USER_DATA",
};

export const GET_QUISTIONS: ReduxConstants = {
  REQ: "GET_QUISTIONS_REQ",
  RES: "GET_QUISTIONS_RES",
};

export const GET_CATEGORIES: ReduxConstants = {
  REQ: "GET_CATEGORIES_REQ",
  RES: "GET_CATEGORIES_RES",
  ADD: "ADD_CATEGORY",
};
