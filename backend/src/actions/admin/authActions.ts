import { Request, Response, Router } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import * as ms from "ms";
import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
const router = Router();
router.post("/login", async (req: Request, res: Response, next) => {
  try {
    passport.authenticate(
      "user",
      { session: false },
      async (err, user, message) => {
        if (err) throw err;
        if (!user) {
          return warn(res, message);
        } else {
          const userObject = {
            _id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles,
          };
          if (!user.roles.includes("admin")) {
            return warn(
              res,
              "Your role isn't enough for you to login as admin!"
            );
          }
          const token = jwt.sign(userObject, process.env.JWT_SECRET, {
            expiresIn: ms("1d"),
            algorithm: "HS512",
          });
          return success(res, {
            user: userObject,
            token: token,
          });
        }
      }
    )(req, res, next);
  } catch (e) {
    return error(res, e);
  }
});

export default router;
