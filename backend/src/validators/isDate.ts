import { body } from "express-validator";

export default (field: string) => {
    return body(field).custom((value,{ req }) => {
        const dateField = req.body[field];
        const parsedDate = Date.parse(dateField);
        if (dateField == null){
            return Promise.reject(`The field ${field} is missing!`);
        }
        if (isNaN(parsedDate)){
            return Promise.reject(`The field ${field} should be a valid date format!`);
        }
        return true
    });
}
