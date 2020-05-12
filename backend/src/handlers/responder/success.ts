import { Response } from "express";
import constants from "./constants";

export default function (res: Response, payload?: any){
    return res.status(200).json({
        payload: payload || null,
        message: null,
        status: constants.SUCCESS,
        error: null
    });
}
