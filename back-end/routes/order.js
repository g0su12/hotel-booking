import express from "express";
import {orderOwner, requireSignIn} from "../middlewares";
import {
  orderRoom,
  checkOutOrder,
  stripeSuccess,
  userRoomOrders,
  getOrdersByUserId,
} from "../controllers/order";

const orderRouter = express.Router();

// initialization stripe session for payment
orderRouter.get("/user-orders", requireSignIn, userRoomOrders);
orderRouter.post("/stripe-session-id", requireSignIn, orderRoom);
//handle success payment => create new order with user and hotel => save to db
orderRouter.post("/stripe-success", requireSignIn, stripeSuccess);
orderRouter.post("/orders/:userId", requireSignIn, getOrdersByUserId);
orderRouter.delete("/orders/check-out/:orderId", requireSignIn, orderOwner, checkOutOrder);

export default orderRouter;
