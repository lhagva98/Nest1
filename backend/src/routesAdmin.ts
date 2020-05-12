import { Request, Response, NextFunction } from "express";
import * as express from "express";

import authChecker from "./handlers/authChecker";
import authActions from "./actions/admin/authActions";
import userActions from "./actions/admin/userActions";
import categoryActions from "./actions/admin/categoryActions";
import cardActions from "./actions/admin/cardsActions";

export default function (app: express.Application): void {
  app.use("/admin", authActions);
  app.use("/admin", categoryActions);
  app.use("/admin", cardActions);
  app.use("/admin", async (req: Request, res: Response, next: NextFunction) => {
    await authChecker(req, res, next, "admin");
  });
  app.use("/admin", userActions);
}
