import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;
const orderSchema = new mongoose.Schema(
  {
    hotel: {
      type: ObjectId,
      ref: "Hotel",
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false
    },
    session: {},
    orderedBy: {type: ObjectId, ref: "User"},
  },
  {timestamps: true}
);

export default mongoose.model("Order", orderSchema);
