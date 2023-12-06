import axios from "axios";
import { API } from "../common/constants/api";

export const register = async (user) =>
  await axios.post(`${API.BASE_URL}${API.REGISTER}`, user);

export const login = async (user) =>
  await axios.post(`${API.BASE_URL}${API.LOGIN}`, user);

// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
