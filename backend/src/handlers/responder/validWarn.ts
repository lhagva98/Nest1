import { Response } from "express";
import constants from "./constants";

// noinspection JSUnusedLocalSymbols
export default function (res: Response, errors: any, msg: string){
    let message = "Validation Error!";
    if (Array.isArray(errors)){
        errors.map((err) => {
            message = err.msg;
        });
    }
    return res.status(400).json({
        payload: null,
        message: message,
        status: constants.WARN,
        error: errors
    });
}
