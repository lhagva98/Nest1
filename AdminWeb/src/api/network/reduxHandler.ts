import chest from "../chest";
import ReduxConstants from "../constants";

export interface ReduxFunction {}

export interface ReduxAction {
  type: string;
  success: boolean;
  status: number;
  payload: any;
  error: {
    message: string;
    type: string;
    details: any;
  };
}

export interface NetworkHandler {
  method: "get" | "post" | "patch" | "delete";
  headers: any;
  body?: string;
}

export default function(
  constant: ReduxConstants,
  url: string,
  options: NetworkHandler
): ReduxFunction {
  const fetch = chest.get("fetch");
  return (dispatch: any) => {
    let status: number | null = null;
    dispatch({
      type: constant["REQ"]
    });
    fetch(url, { ...options })
      .then((res: Response) => {
        status = res.status;
        try {
          return res.json();
        } catch (err) {
          throw {
            success: false,
            ...err
          };
        }
      })
      .then((json: any) => {
        if (json.status === "success") {
          dispatch({
            type: constant["RES"],
            success: true,
            status: status,
            ...json
          });
        } else if (status === 403) {
          chest.get("emitter").emit("invalid-auth");
          dispatch({
            type: constant["RES"],
            success: false,
            status: status,
            ...json
          });
        } else {
          let message = "Sent request came with response http code: " + status;
          throw {
            message: message,
            ...json
          };
        }
      })
      .catch((err: Error) => {
        console.error(err);
        dispatch({
          type: constant["RES"],
          success: false,
          error: {
            message: err.message,
            type: "error",
            details: null
          },
          payload: null,
          status: status
        });
      });
  };
}
