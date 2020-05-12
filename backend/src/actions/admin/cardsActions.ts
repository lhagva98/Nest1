import { Request, Response, Router } from "express";
import * as bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import success from "../../handlers/responder/success";
import error from "../../handlers/responder/error";
import warn from "../../handlers/responder/warn";
import Card from "../../models/Card";
import validWarn from "../../handlers/responder/validWarn";
import isMongoID from "../../validators/isMongoID";
import ObjectId from "../../utils/ObjectId";

const router = Router();

router.post(
  "/card/create",
  [
    // isCardName(""),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err: any = errors.array();
        return validWarn(res, err, "Validation Error!");
      }
      const { title, questions, answer, category } = req.body;

      let card: any;
      const newCard: any = await Card.create({
        title: title,
        questions: questions,
        answer: answer,
        categoryId: ObjectId(category),
      });

      card = newCard;
      return success(res, {
        card: newCard,
      });
    } catch (e) {
      return error(res, e);
    }
  }
);

export default router;
