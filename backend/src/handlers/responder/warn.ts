import { Response } from "express";
import constants from "./constants";

export default function (res: Response, msg: string){
    console.log(msg);
    return res.status(400).json({
        payload: null,
        message: msg,
        status: constants.WARN,
        error: null
    });
}
