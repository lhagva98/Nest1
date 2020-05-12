import * as express from "express";

import quizActions from "./actions/guest/quizActions";
export default function (app: express.Application): void {
  app.use("/guest", quizActions);
}
