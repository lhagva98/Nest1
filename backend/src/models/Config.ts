import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const configSchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    }
});


const ConfigModel = mongoose.model("configs", configSchema);

export default ConfigModel
