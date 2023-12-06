import * as React from "react";
import "../assets/css/homepage.css";
import brand1 from "../assets/images/F1.webp";
import brand2 from "../assets/images/F2.webp";
import brand3 from "../assets/images/F3.webp";
import brand4 from "../assets/images/F4.webp";
import brand5 from "../assets/images/F5.webp";
import brand6 from "../assets/images/F6.webp";
import SearchForm from "../@components/SearchForm";


function Homepage() {

  return (
    <div className="homepage">
      <div className="centerHomepage">
      </div>
      <SearchForm/>
      <div>
        <h1>Đặt Phòng Trực Tuyến - Đơn Giản, Tiện Lợi, An Toàn!</h1>
        <p>
          Toàn bộ thao tác đặt phòng sẽ được hoàn thành chỉ sau vào cú click,
          thanh toán trực tiếp qua cổng thanh toán Stripe
        </p>
      </div>
      <div className="bottomHomepage">
        <img src={brand1} className="brand-img" alt="hotel"/>
        <img src={brand2} className="brand-img" alt="hotel"/>
        <img src={brand3} className="brand-img" alt="hotel"/>
        <img src={brand4} className="brand-img" alt="hotel"/>
        <img src={brand5} className="brand-img" alt="hotel"/>
        <img src={brand6} className="brand-img" alt="hotel"/>
      </div>
    </div>
  );
}


export default Homepage;
