import { body } from "express-validator";

export enum NAME_TYPE {
  USER,
}

export default (field: string, type: NAME_TYPE = NAME_TYPE.USER) => {
  return body(field)
    .isString()
    .withMessage(`The field ${field} must be a string!`);
};
