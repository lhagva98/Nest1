import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import warn from "./responder/warn";
import error from "./responder/error";

import User from "../models/User";
import authError from "./responder/authError";

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

type WHICH_REQUESTER = "admin" | "user";

export default async function (
  req: Request,
  res: Response,
  next,
  which: WHICH_REQUESTER
) {
  try {
    if (which === "admin" || which === "user") {
      const token = extractToken(req);
      if (token == null) {
        return warn(res, "Authorization is required!");
      } else {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        const userCheck: any = await User.findOne({
          _id: req.user._id,
          roles: which,
        });
        if (userCheck) {
          req.user.roles = userCheck.roles;
          return next();
        } else {
          return authError(
            res,
            "Token expired or your role has been changed recently!"
          );
        }
      }
    }
  } catch (e) {
    console.log(e);
    if (e.message.includes("Error: Incorrect data or key")) {
      return authError(res, "Authorization invalid! Incorrect data or key!");
    }
    return error(res, e);
  }
}
