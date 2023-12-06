import Stripe from "stripe";
import User from "../models/user";
import Hotel from "../models/room";
import Order from "../models/order";
import {diffDays, isOverlapWithExistingRanges} from "../common/util";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const userRoomOrders = async (req, res) => {
  const all = await Order.find({orderedBy: req.user._id})
    .select("session")
    .populate("hotel", "-image.data")
    .exec();
  res.json(all);
};


export const orderRoom = async (req, res) => {
  const {roomId, date} = req.body;
  const fromDate = date.split(",");
  const item = await Hotel.findById(roomId).populate("postedBy").populate("orderIds").exec();
  if (isOverlapWithExistingRanges(fromDate[0], fromDate[1], item.orderIds)) {
    return res.send("Thời gian bạn muốn thuê không khả dụng!");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100 * diffDays(date.split(",")[0], date.split(",")[1]),
        product_data: {
          name: item.title, // Replace with your product name
        },
      }, quantity: 1, // Quantity is 1 for the total amount you want to charge
    },],
    payment_intent_data: {
      application_fee_amount: 0, transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    mode: 'payment', // success and cancel urls
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}?date=${date}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  // add this session object to user in the db
  await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec();
  // send session id as resposne to frontend
  res.send({
    sessionId: session.id,
  });
}

export const stripeSuccess = async (req, res) => {
  try {
    const {roomId, date} = req.body;
    const [from, to] = date.split(",");
    const currentUser = await User.findById(req.user._id).exec();
    if (!currentUser.stripeSession) return;
    const session = await stripe.checkout.sessions.retrieve(currentUser.stripeSession.id);
    if (session.payment_status === "paid") {
      const orderExist = await Order.findOne({
        "session.id": session.id,
      }).exec();
      if (orderExist) {
        res.json({success: true});
      } else {
        const newOrder = await new Order({
          hotel: roomId, session, orderedBy: currentUser._id, from: new Date(from), to: new Date(to),
        }).save();
        await User.findByIdAndUpdate(currentUser._id, {
          $set: {stripeSession: {}},
        });
        await Hotel.findByIdAndUpdate(roomId, {
          $push: {orderIds: newOrder},
        }, {new: true});
        res.json({success: true});
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const getOrdersByUserId = async (req, res) => {
  // get all orders populate to hotel then filter by hotel owner
  const sellerId = req.params.userId;
  let allOrders = await Order.find()
    .populate("hotel")
    .exec();
  res.json(allOrders.filter(order => order.hotel.postedBy == sellerId));
}

export const checkOutOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId).exec();
  await Hotel.updateOne({_id: order.hotel}, {$pull: {orderIds: req.params.orderId}}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  })
  await Order.findByIdAndUpdate(req.params.orderId, {
    $set: {status: true},
  });
  return res.send({success: true});
}