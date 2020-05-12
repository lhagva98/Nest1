import reduxHandler, { ReduxFunction } from "../network/reduxHandler";
import * as constants from "../constants";
import urls from "../urls";
import headers from "../headers";
import fetchHandler, { NetworkResponse } from "../network/fetchHandler";

export async function createCard(data: object): Promise<NetworkResponse> {
  return fetchHandler(urls("createCard"), {
    method: "post",
    headers: headers(true),
    body: JSON.stringify(data),
  });
}
export async function createCategory(data: object): Promise<NetworkResponse> {
  return fetchHandler(urls("createCategory"), {
    method: "post",
    headers: headers(true),
    body: JSON.stringify(data),
  });
}
export function getCategories(): ReduxFunction {
  return reduxHandler(constants.GET_CATEGORIES, urls("getCategories"), {
    method: "get",
    headers: headers(true),
  });
}

export function addCategory(data: Object) {
  return {
    type: constants.GET_CATEGORIES.ADD,
    payload: data,
  };
}
