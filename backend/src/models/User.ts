import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  roles: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("users", userSchema);
