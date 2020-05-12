import { Request, Response, Router } from "express";
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

router.get("/info", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id, { name: 1, email: 1 });
    const aggregations = [];
    aggregations.push({
      $match: {
        userId: ObjectId(req.user._id),
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
      user: user,
      history: history,
    });
  } catch (e) {
    return error(res, e);
  }
});

router.post(
  "/answer/submit",
  [
    // isPhoneNumbers("phone"),
  ],
  async (req: Request, res: Response) => {
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
      const category: any = await Category.findOne({ _id: quizId });
      const wrong = countCard - right;
      const newHistory: any = await History.create({
        userId: req.user._id,
        cardId: quizId,
        scoreDetials: [right, wrong],
      });

      return success(res, {
        right: right,
        wrong: wrong,
        history: newHistory,
        category: category,
      });
    } catch (e) {
      return error(res, e);
    }
  }
);

export default router;
