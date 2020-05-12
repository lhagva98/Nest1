import { Response } from "express";
import constants from "./constants";

export default function (res: Response, error: Error, message?: string){
    console.error(error);
    let statusCode = 500;
    let status = constants.ERROR;
    if (error.name === "ValidationError") {
        statusCode = 400;
        status = constants.WARN
    }
    return res.status(statusCode).json({
        payload: null,
        message: message || error.message,
        status: status,
        error: error
    });
}
