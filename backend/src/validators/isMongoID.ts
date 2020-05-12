import { body } from "express-validator";

const msg = (field: string) => {
    return `The field ${field} is not a valid Mongo Object ID!`
};

export default (field: string) => {
    return body(field,msg(field)).isMongoId()
}
