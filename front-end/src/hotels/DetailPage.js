import '../assets/css/detail.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Card, Image} from 'antd';
import {CarOutlined, CustomerServiceOutlined, WifiOutlined} from '@ant-design/icons';
import {diffDays, read} from "../actions/hotel";
import {API} from '../common/constants/api';
import {useSelector} from "react-redux";
import {getSessionId} from "../actions/stripe";
import {loadStripe} from "@stripe/stripe-js";
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

function DetailPage({match, history}) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  const {auth} = useSelector((state) => ({...state}));
  // state
  const [values, setValues] = useState({
    title: "", content: "", image: "", price: "", from: "", to: "", bed: "",
  });
  const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

  useEffect(() => {
    loadSellerHotel().then(r => {
    });
  }, []);


  const confirmInfoBooking = (e) => {
    if (!auth || !auth.token) {
      history.push("/auth/login");
      return;
    }
    const htmlContent = `
    <div>
      <label for="name">Tên người thuê:</label>
      <input disabled value="${auth.user.name}" id="name" class="swal2-input">
      <br/>
      <label for="email">Số điện thoại:</label><br/>
      <input disabled value="${auth.user.phoneNumber}" id="email" class="swal2-input">
      <br/>
      <label for="email">Số giường:</label><br/>
      <input disabled value="${values.bed}" id="email" class="swal2-input">
      <br/>
      <label for="email">Thời gian thuê từ ngày:</label><br/>
      <input disabled value="${date.split(",")[0]}" id="email" class="swal2-input">
      <br/>
      <label for="email">đến ngày</label><br/>
      <input disabled value="${date.split(",")[1]}" id="email" class="swal2-input">
      <label for="email">Số tiền phải thanh toán:</label><br/>
      <input disabled value="${values.price * diffDays(date.split(",")[0], date.split(",")[1])}" id="email" class="swal2-input">
    </div>
  `;
    Swal.fire({
      title: `Thông tin đặt phòng ${values.title}`,
      html: htmlContent,
      showCancelButton: true,
      confirmButtonText: 'Xác nhận và thanh toán',
    }).then((result) => {
      if (result.isConfirmed) {
        handleBookHotel(e);
      }
      const cancelButton = document.querySelector('.swal2-cancel');
      if (cancelButton) {
        cancelButton.textContent = 'Huỷ đặt phòng';
      }
    });
  }

  const handleBookHotel = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res = await getSessionId(auth.token, match.params.roomId, date);
    console.log(res)
    if (res.data == "Thời gian bạn muốn thuê không khả dụng!") {
      toast.error(res.data);
      setLoading(false);
    } else {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      stripe
        .redirectToCheckout({
          sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result));
    }

  };

  const loadSellerHotel = async () => {
    let res = await read(match.params.roomId);
    // console.log(res);
    setValues({...values, ...res.data});
    setPreview(`${API.BASE_URL}${API.GET_IMAGE_BY_ID}${match.params.roomId}`);
  }

  return (<div className='detail'>
    <div className='detailBodyTitle'>
      <h1>{values.title}</h1>
      <h2>{values.location}</h2>
    </div>
    <div className='detailBody'>
      <div className='detailBodyImage'>
        <Image
          width={500}
          height={300}
          src={preview}
        />
      </div>
      <div className='detailBodyContent'>
        <div className='center'>
          <Card
            style={{
              width: 500,
            }}
          >
            <div className='detailLocationRoomTitle'>
              <p>
                {values.content}
              </p>
              <h1>
                {values.price}USD/đêm ({values.bed} giường)
              </h1>
              <ul>
                <li><WifiOutlined/> Wifi miễn phí</li>
                <li><CarOutlined/> Có chỗ đỗ xe</li>
                <li><CustomerServiceOutlined/> Dịch vụ 24/7</li>
              </ul>
              <button onClick={confirmInfoBooking} className='bookNow' disabled={loading}>
                {loading ? "Loading..." : auth && auth.token ? "Đặt phòng ngay" : "Đăng nhập để đặt phòng"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>)
}

export default DetailPage;