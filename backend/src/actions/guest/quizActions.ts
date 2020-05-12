import { Request, Response, Router } from "express";
import * as bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
import validWarn from "../../handlers/responder/validWarn";
import isEmail from "../../validators/isEmail";
import isPassword from "../../validators/isPassword";
import isName, { NAME_TYPE } from "../../validators/isName";
import isMongoID from "../../validators/isMongoID";
import Card from "../../models/Card";
import History from "../../models/history";
import Category from "../../models/Category";
import authError from "../../handlers/responder/authError";
import User from "../../models/User";
import ObjectId from "../../utils/ObjectId";
const router = Router();

router.post("/answer/submit", [], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err: any = errors.array();
      return validWarn(res, err, "Validation Error!");
    }
    const { quizId, answer } = req.body;
    const cards = await Card.find(
      {
        categoryId: ObjectId(quizId),
      },
      { answer, _id: 1 }
    );
    const answerFixed = {};
    answer.map((item) => {
      answerFixed[item.key] = item.selected;
    });
    console.log(answerFixed);
    console.log(cards);
    let right = 0;
    const countCard = cards.length;
    cards.map((item) => {
      if (typeof answerFixed[item._id] !== "undefined") {
        if (answerFixed[item._id] == item.answer) {
          right++;
        }
      }
    });
    const wrong = countCard - right;
    return success(res, {
      right: right,
      wrong: wrong,
    });
  } catch (e) {
    return error(res, e);
  }
});

export default router;
