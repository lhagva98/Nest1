import { Request, Response, Router } from "express";
import * as bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import validWarn from "../../handlers/responder/validWarn";
import isEmail from "../../validators/isEmail";
import isPassword from "../../validators/isPassword";
import isName, { NAME_TYPE } from "../../validators/isName";
import isMongoID from "../../validators/isMongoID";
import Card from "../../models/Card";
import Category from "../../models/Category";
import authError from "../../handlers/responder/authError";
import ObjectId from "../../utils/ObjectId";
const router = Router();

router.get("/getCategories", [], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err: any = errors.array();
      return validWarn(res, err, "Validation Error!");
    }
    const aggregations = [];
    aggregations.push({
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "categoryId",
        as: "cards",
      },
    });
    aggregations.push({
      $project: {
        _id: 1,
        name: 1,
        cardCount: {
          $size: "$cards",
        },
      },
    });
    const category = await Category.aggregate(aggregations);
    console.log(category);
    return success(res, {
      list: category,
    });
  } catch (e) {
    return error(res, e);
  }
});
router.post("/questions", async (req: Request, res: Response) => {
  try {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err: any = errors.array();
        return validWarn(res, err, "Validation Error!");
      }
      const { categoryId } = req.body;
      const cards = await Card.find(
        {
          categoryId: ObjectId(categoryId),
        },
        { questions: 1, title: 1, _id: 1 }
      );
      const category = await Category.findOne({
        _id: ObjectId(categoryId),
      });
      return success(res, {
        results: cards,
        category: category,
      });
    } catch (e) {
      error(res, e);
    }
  } catch (e) {
    return error(res, e);
  }
});
export default router;
