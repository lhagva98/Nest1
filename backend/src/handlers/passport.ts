import * as bcrypt from "bcryptjs";
import User from "../models/User";

const LocalStrategy = require("passport-local").Strategy;

export default function (passport) {
  passport.use(
    "user",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const userData: any = await User.findOne({ email: email });
        if (userData == null) {
          return done(null, false, "Username is not registered!");
        }
        bcrypt.compare(password, userData.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, userData);
          } else {
            return done(null, false, "Password is incorrect!");
          }
        });
      }
    )
  );
}
