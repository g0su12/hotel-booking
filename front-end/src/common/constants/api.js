export const API = Object.freeze({
  BASE_URL: "http://localhost:8080/api",
  STRIPE_CONNECT: "/create-stripe-connect",
  ACCOUNT_STRIPE_STATUS: "/account-stripe-status",
  ACCOUNT_BALANCE: "/get-account-balance",
  SETTING_PAYOUT: "/payout-setting",
  STRIPE_SESSION_ID: "/stripe-session-id",
  STRIPE_SUCCESS: "/stripe-success",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  SEARCH_RESULTS: "/search-results",
  GET_ALL_HOTEL: "/admin/rooms",
  APPROVE_HOTEL: "/rooms/approve-room/{roomId}",
  ADD_HOTEL: "/rooms/add-room",
  GET_HOTEL_DETAIL: "/rooms/{roomId}",
  GET_SELLER_HOTEL: "/rooms/seller/{sellerId}",
  GET_IMAGE_BY_ID: "/rooms/image/",
  UPDATE_HOTEL: "/rooms/update-room/{roomId}",
  DELETE_HOTEL: "/rooms/delete-room/{roomId}",
  CHECK_BOOKED: "/is-already-booked/{roomId}",
  USER_ORDERS: "/user-orders",
  SELLER_ORDERS: "/orders/{userId}",
  CHECKOUT_ORDER: "/orders/check-out/{orderId}"
});
