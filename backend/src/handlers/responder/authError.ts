import { Response } from "express";
import constants from "./constants";

export default function(res: Response, message?: string) {
  return res.status(401).json({
    payload: null,
    message: message,
    status: constants.AUTH_ERROR,
    error: null
  });
}
