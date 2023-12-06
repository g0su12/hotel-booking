import Hotel from "../models/room";
import Order from "../models/order";
import expressJwt from "express-jwt";

require("dotenv").config();

export const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const roomOwner = async (req, res, next) => {
  const room = await Hotel.findById(req.params.roomId).exec();
  const owner = room.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

export const orderOwner = async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate("hotel", "postedBy")
    .exec();
  const owner = order.hotel.postedBy == req.user._id;
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
}

