import * as express from "express";

import { Request, Response, NextFunction } from "express";
import success from "./handlers/responder/success";
import authActions from "./actions/user/authActions";
import quizActions from "./actions/user/quizActions";
import categoryActions from "./actions/user/categoryActions";
import authChecker from "./handlers/authChecker";
export default function (app: express.Application): void {
  app.use("/user", authActions);
  app.use("/user", categoryActions);
  app.use("/user", async (req: Request, res: Response, next: NextFunction) => {
    await authChecker(req, res, next, "user");
  });
  app.use("/user", quizActions);
}
