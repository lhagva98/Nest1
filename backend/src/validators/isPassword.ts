import { body } from "express-validator";

const msg = "Password must be at least 6 characters and less than 32 characters!";

export default (field: string) => {
    return body(field,msg)
        .isString().withMessage("Password must be a string!")
        .isLength({ min: 2 }).withMessage("Password must be at least 6 characters!")
        .isLength({ max: 32 }).withMessage("Password must be less than 32 characters!")
}
