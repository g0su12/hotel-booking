import axios from "axios";
import {API} from "../common/constants/api";
import Swal from "sweetalert2";

export const createHotel = async (token, data) =>
  await axios.post(`${API.BASE_URL}${API.ADD_HOTEL}`, data, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  return Math.round(Math.abs((start - end) / day));
};

export const getSellerHotels = async (token, sellerId) =>
  await axios.get(`${API.BASE_URL}${API.GET_SELLER_HOTEL}`.replace("{sellerId}", sellerId), {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllHotels = async (token) =>
  await axios.get(`${API.BASE_URL}${API.GET_ALL_HOTEL}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const searchResults = async (query) =>
  await axios.post(`${API.BASE_URL}${API.SEARCH_RESULTS}`, query);

export const handleDeleteHotel = async (token, roomId) => {
  const result = await Swal.fire({
    title: 'Bạn chắc chắn muốn xoá chứ?',
    text: "Hành động xoá này sẽ không thể khôi phục lại",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Huỷ',
    preConfirm: () => {
      axios.delete(`${API.BASE_URL}${API.DELETE_HOTEL}`.replace("{roomId}", roomId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  })
  return result.isConfirmed;
};

export const read = async (roomId) =>
  await axios.get(`${API.BASE_URL}${API.GET_HOTEL_DETAIL}`.replace("{roomId}", roomId));

export const updateHotel = async (token, data, roomId) =>
  await axios.put(
    `${API.BASE_URL}${API.UPDATE_HOTEL}`.replace("{roomId}", roomId),
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const changeHotelStatus = async (token, roomId) =>
  await axios.put(
    `${API.BASE_URL}${API.APPROVE_HOTEL}`.replace("{roomId}", roomId), {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


export const userHotelBookings = async (token) =>
  await axios.get(`${API.BASE_URL}${API.USER_ORDERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

