import { Request, Response, Router } from "express";
import * as bcrypt from "bcryptjs";

import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
import User from "../../models/User";

const router = Router();

router.get("/info", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id, { name: 1, email: 1 });
    return success(res, {
      user: user,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.post("/change-password", async (req: Request, res: Response) => {
  try {
    const userData: any = await User.findById(req.user._id);
    bcrypt.compare(
      req.body.oldPass,
      userData.password,
      async (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          console.log("match");
          bcrypt.genSalt(10, async (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.newPass, salt, async (err, hash) => {
              if (err) throw err;
              await User.findByIdAndUpdate(
                req.user._id,
                {
                  password: hash,
                },
                { new: true }
              );
              return success(res, {});
            });
          });
        } else {
          return warn(res, "Your current password is wrong!");
        }
      }
    );
  } catch (e) {
    return error(res, e);
  }
});

export default router;
