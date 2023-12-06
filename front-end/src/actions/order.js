import axios from "axios";
import {API} from "../common/constants/api";
import Swal from "sweetalert2";

export const getOrdersByUserId = async (token, userId) =>
  await axios.post(`${API.BASE_URL}${API.SELLER_ORDERS}`.replace("{userId}", userId), {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const checkOutOrder = async (token, orderId) => {
  const result = await Swal.fire({
    title: 'Thực hiện checkout cho đơn đặt phòng này',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Huỷ',
    preConfirm: () => {
      axios.delete(`${API.BASE_URL}${API.CHECKOUT_ORDER}`.replace("{orderId}", orderId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  })
  return result.isConfirmed;
}