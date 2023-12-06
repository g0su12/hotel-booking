import axios from "axios";
import {API} from "../common/constants/api";

export const createConnectAccount = async (token) =>
  await axios.post(`${API.BASE_URL}${API.STRIPE_CONNECT}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getAccountStatus = async (token) =>
  axios.post(`${API.BASE_URL}${API.ACCOUNT_STRIPE_STATUS}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAccountBalance = async (token) =>
  axios.post(`${API.BASE_URL}${API.ACCOUNT_BALANCE}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const payoutSetting = async (token) => await
  axios.post(`${API.BASE_URL}${API.SETTING_PAYOUT}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSessionId = async (token, roomId, date) =>
  await axios.post(`${API.BASE_URL}${API.STRIPE_SESSION_ID}`, {
    roomId,
    date,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const stripeSuccessRequest = async (token, roomId, date) =>
  await axios.post(
    `${API.BASE_URL}${API.STRIPE_SUCCESS}`,
    {roomId, date},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency", currency: data.currency,
  });
};
