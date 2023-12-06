import express from "express";
import {requireSignIn} from "../middlewares";
import {
  payoutSetting,
  getAccountStatus,
  getAccountBalance,
  createConnectAccount,
} from "../controllers/stripe";

const stripeRouter = express.Router();

// payout settings for seller
stripeRouter.post("/payout-setting", requireSignIn, payoutSetting);
stripeRouter.post("/get-account-balance", requireSignIn, getAccountBalance);
stripeRouter.post("/account-stripe-status", requireSignIn, getAccountStatus);
stripeRouter.post("/create-stripe-connect", requireSignIn, createConnectAccount);



export default stripeRouter;