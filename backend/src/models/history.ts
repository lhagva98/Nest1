import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const testHistorySchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  cardId: {
    type: ObjectId,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  scoreDetials: [
    {
      type: Number,
      required: true,
    },
  ],
});

export default mongoose.model("testHistory", testHistorySchema);
