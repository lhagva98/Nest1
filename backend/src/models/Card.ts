import * as mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    requred: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("cards", cardSchema);
