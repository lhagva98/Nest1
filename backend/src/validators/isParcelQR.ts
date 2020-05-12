import { check } from "express-validator";

const qrLength = 8;

export default (field: string) => {
    return check(field).custom((value,{ req }) => {
        const parcelQR = req.body[field];
        if (parcelQR == null){
            return Promise.reject(`The field ${field} missing!`);
        }
        if (!Array.isArray(parcelQR)){
            return Promise.reject(`The field ${field} should be array of strings!`);
        }
        if (parcelQR.length === 0){
            return Promise.reject(`The field ${field} array have to contain at least 1 parcel id string!`);
        }
        let valid = true;
        let msg: string = "";
        parcelQR.map((parcel) => {
            if (valid){
                if (typeof parcel !== "string"){
                    console.log("type checked!");
                    valid = false;
                    msg = `The field ${field} array must only contain string data type!`;
                } else {
                    // if (parcel.length !== qrLength){
                    //     console.log("length checked!");
                    //     valid = false;
                    //     msg = `The parcel with ID ${parcel} in field ${field} array must be ${qrLength} length string!`;
                    // } else {
                    //     if (!parcel.match(/^[0-9a-z]+$/)){
                    //         console.log("format checked!");
                    //         valid = false;
                    //         msg = `The parcel with ID ${parcel} in field ${field} array is wrong format of parcel ID!`;
                    //     }
                    // }
                    if (!parcel.match(/^[0-9a-z]+$/)){
                        console.log("format checked!");
                        valid = false;
                        //msg = `The parcel with ID ${parcel} in field ${field} array is wrong format of parcel ID!`;
                        msg = "Та 8-н оронтой QR код уншуулна уу!";
                    }
                }
            }
        });
        if (!valid){
            return Promise.reject(msg);
        } else {
            return true
        }
    })
}
