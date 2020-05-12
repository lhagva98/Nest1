import { Request, Response, Router } from "express";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import * as ms from "ms";
import { body, validationResult } from "express-validator";
import * as validator from "validator";
import validWarn from "../../handlers/responder/validWarn";
import * as bcrypt from "bcryptjs";
import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
import User from "../../models/User";
import ObjectId from "../../utils/ObjectId";
import History from "../../models/history";
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
            name: user.name,
          };
          if (!user.roles.includes("user")) {
            return warn(
              res,
              "Your role isn't enough for you to login as user!"
            );
          }
          const token = jwt.sign(userObject, process.env.JWT_SECRET, {
            expiresIn: ms("1d"),
            algorithm: "HS512",
          });
          const aggregations = [];
          aggregations.push({
            $match: {
              userId: ObjectId(user._id),
            },
          });
          aggregations.push({
            $lookup: {
              from: "categories",
              localField: "cardId",
              foreignField: "_id",
              as: "category",
            },
          });
          aggregations.push({
            $unwind: "$category",
          });
          aggregations.push({
            $sort: {
              dateCreated: -1,
            },
          });

          const history = await History.aggregate(aggregations);
          return success(res, {
            user: userObject,
            token: token,
            history: history,
          });
        }
      }
    )(req, res, next);
  } catch (e) {
    return error(res, e);
  }
});

router.post(
  "/register",
  [
    body("email", "Please enter your email").isEmail().normalizeEmail(),
    body(
      "password",
      "Password must be at least 6 characters and less than 32 characters!"
    )
      .isString()
      .isLength({ min: 6, max: 32 }),
    body("name", "Enter your  name!"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err: any = errors.array();
        return validWarn(res, err, "Validation Error!");
      }
      const { name, email, password } = req.body;
      if (!validator.isEmail(email)) {
        return warn(res, "Invalid email address!");
      }
      if (!password) {
        return warn(res, "Please enter your password");
      }
      if (password.length < 6) {
        return warn(res, "Password must be at least 6 characters");
      }
      const userCheck = await User.findOne({
        email: email,
        roles: "user",
      });
      if (userCheck) {
        return warn(res, "Email is already registered");
      }
      const newUser: any = new User({
        name: name,
        email: email,
        password: password,
        roles: ["user"],
      });
      bcrypt.genSalt(10, async (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          await newUser.save();
          return success(res);
        });
      });
    } catch (e) {
      return error(res, e);
    }
  }
);

export default router;
