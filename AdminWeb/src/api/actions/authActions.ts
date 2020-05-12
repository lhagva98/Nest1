import fetchHandler, { NetworkResponse } from "../network/fetchHandler";
import headers from "../headers";
import urls from "../urls";
import * as constants from "../constants";
import { payloads } from "../namespaces";
import { ReduxFunction } from "../network/reduxHandler";

export interface AdminLoginPayload extends NetworkResponse {
  payload: {
    user: payloads.Admin;
    token: string;
  };
}
interface AdminLoginData {
  email: string;
  password: string;
}

export async function AdminLogin(
  data: AdminLoginData
): Promise<AdminLoginPayload> {
  return fetchHandler(urls("AdminLogin"), {
    method: "post",
    headers: headers(),
    body: JSON.stringify(data),
  });
}

//

interface AdminLoginSetData {
  user: any;
  token: any;
}

export function setLoginData(data: AdminLoginSetData): ReduxFunction {
  return {
    type: constants.SET_USER_DATA.RES,
    payload: data,
  };
}

//

interface AdminInfoPayload extends NetworkResponse {
  payload: {
    user: payloads.Admin;
    token: any;
  };
}

export async function getUserInfo(): Promise<AdminInfoPayload> {
  return fetchHandler(urls("getUserInfo"), {
    method: "get",
    headers: headers(true),
  });
}

// export async function adminLogin(
//   data: AdminLoginData
// ): Promise<AdminLoginPayload> {
//   return fetchHandler(urls("adminLogin"), {
//     method: "post",
//     headers: headers(),
//     body: JSON.stringify(data),
//   });
// }

// //
