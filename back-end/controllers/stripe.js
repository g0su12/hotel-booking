import Stripe from "stripe";
import User from "../models/user";
import queryString from "query-string";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createConnectAccount = async (req, res) => {
  const currentUser = await User.findById(req.user._id).exec();
  if (!currentUser.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    })
    currentUser.stripe_account_id = account.id;
    // save to db
    await currentUser.save();
  }
  let accountLink = await stripe.accountLinks.create({
    account: currentUser.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_HOTEL,
    return_url: process.env.STRIPE_REDIRECT_HOTEL,
    type: "account_onboarding",
  });
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": currentUser.email || undefined,
  });
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  res.send(link);
  // 4. update payment schedule (optional. default is 2 days
};

export const getAccountStatus = async (req, res) => {
  const currentUser = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(currentUser.stripe_account_id);
  const updatedUser = await User.findByIdAndUpdate(
    currentUser._id,
    {
      stripe_seller: account,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  res.json(updatedUser);
};


export const getAccountBalance = async (req, res) => {
  const currentUser = await User.findById(req.user._id).exec();
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: currentUser.stripe_account_id,
    });
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).exec();

    const loginLink = await stripe.accounts.createLoginLink(
      currentUser.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_REDIRECT_URL,
      }
    );
    res.json(loginLink);
  } catch (err) {
    console.log(err);
  }
};
