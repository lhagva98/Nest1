const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

export default function (id: string){
    return ObjectId(id);
}
