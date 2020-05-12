import chest from "../chest";

export interface NetworkResponse {
  message: string | null;
  status: string;
  error: any;
}

export interface NetworkHandler {
  method: "get" | "post" | "patch" | "delete";
  headers: any;
  body?: string | FormData;
}

export default async function(url: string, options: NetworkHandler) {
  const fetch = chest.get("fetch");
  let status: number | null = null;
  return fetch(url, { ...options })
    .then((res: Response) => {
      status = res.status;
      try {
        return res.json();
      } catch (err) {
        throw {
          success: false,
          message: err.message,
          ...err
        };
      }
    })
    .then((json: any) => {
      if (json.status === "success") {
        return {
          status: status,
          ...json
        };
      } else if (status === 403) {
        chest.get("emitter").emit("invalid-auth");
      } else {
        let message = "Sent request came with response http code: " + status;
        throw {
          message: message,
          ...json
        };
      }
    })
    .catch((err: Error | any) => {
      let errorType = "error";
      let errorMessage = "Unknown error occurred!";
      if (typeof err.message === "string") {
        errorMessage = err.message;
      }
      if (err.error) {
        if (typeof err.error.type === "string") {
          errorType = err.error.type;
        }
        if (typeof err.error.message === "string") {
          errorMessage = err.error.message;
        }
      }
      throw {
        success: false,
        message: errorMessage,
        error: {
          message: errorMessage,
          type: errorType,
          details: null
        },
        payload: null
      };
    });
}
