import { body } from "express-validator";

const msg = "Email should not be empty and has to be valid!";

export default (field: string) => {
    return body(field,msg).isEmail().normalizeEmail()
}
