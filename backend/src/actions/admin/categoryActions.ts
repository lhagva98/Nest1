import { Request, Response, Router } from "express";
import * as bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
import User from "../../models/User";
import Category from "../../models/Category";
import validWarn from "../../handlers/responder/validWarn";
import isEmail from "../../validators/isEmail";
import isPassword from "../../validators/isPassword";
import isName, { NAME_TYPE } from "../../validators/isName";
import isMongoID from "../../validators/isMongoID";

const router = Router();

router.post("/category/create", [], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err: any = errors.array();
      return validWarn(res, err, "Validation Error!");
    }
    const { name } = req.body;
    if (!name) {
      return warn(res, "Please enter your name!");
    }
    const categoryCheck = await Category.findOne({
      name: name,
    });
    if (!req.body.force) {
      if (categoryCheck != null) {
        return warn(res, "Аль хэдийн бүртгэгдсэн байна!");
      }
    }
    const category = await Category.create({
      name: req.body.name,
    });
    return success(res, {
      category: category,
    });
  } catch (e) {
    return error(res, e);
  }
});

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
      categories: category,
    });
  } catch (e) {
    return error(res, e);
  }
});

export default router;
