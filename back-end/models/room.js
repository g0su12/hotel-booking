import mongoose from "mongoose";

const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema;

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    orderIds:
      [{type: ObjectId, ref: 'Order'}],
    image: {
      data: Buffer,
      contentType: String,
    },
    bed: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false
    },
  },
  {timestamps: true}
);

export default mongoose.model("Hotel", hotelSchema);
