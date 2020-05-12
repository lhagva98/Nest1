import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as passport from "passport";
import * as session from "express-session";

import passportConfig from "./handlers/passport";

passportConfig(passport);

import routesAdmin from "./routesAdmin";
import routesUser from "./routesUser";
import routesGuest from "./routesGuest";
import { Request, Response, NextFunction } from "express";
import success from "./handlers/responder/success";

declare module "express" {
  interface Request {
    user?: jwtUser;
    categoryId: string;
  }
}

interface jwtUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

class server {
  public app: express.Application;
  public mongoUrl: string | null = null;

  constructor() {
    const env = process.env;
    const DB_HOST =
      process.env.NODE_ENV === "development" ? env.DB_HOST_DEV : env.DB_HOST;
    this.mongoUrl = `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@${DB_HOST}`;

    this.app = express();
    this.config()
      .then()
      .catch((err) => {
        console.error(err);
      });
  }

  private async config(): Promise<void> {
    const connect = async () => {
      console.log("Attempting connection with mongodb");
      await mongoose.connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    };
    console.log(this.mongoUrl);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use("/", (req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });
    this.app.use("/", (req: Request, res: Response, next: NextFunction) => {
      console.log(req.method);
      if (req.method === "OPTIONS") {
        return success(res, {});
      } else {
        next();
      }
    });
    try {
      mongoose.connection.on("disconnected", () => {
        console.error("Disconnected! Reconnecting in 5 seconds.");
        setTimeout(connect, 5000);
      });
      // @ts-ignore
      mongoose.Promise = global.Promise;
      mongoose.set("useFindAndModify", false);
      await connect();
      routesAdmin(this.app);
      routesUser(this.app);
      routesGuest(this.app);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new server().app;
