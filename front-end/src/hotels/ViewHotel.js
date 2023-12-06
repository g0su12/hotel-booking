import '../assets/css/detail.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Card, Image} from 'antd';
import {CarOutlined, CustomerServiceOutlined, WifiOutlined} from '@ant-design/icons';
import {API} from '../common/constants/api';
import {useSelector} from "react-redux";

function DetailPage({hotel}) {
  const [preview, setPreview] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW");

  useEffect(() => {
    loadSellerHotel().then(r => {});
  }, []);

  const loadSellerHotel = async () => {
    setPreview(`${API.BASE_URL}${API.GET_IMAGE_BY_ID}${hotel._id}`);
  }

  return (<div className='detail'>
    <div className='detailBodyTitle'>
      <h1>{hotel.title}</h1>
      <h2>{hotel.location}</h2>
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
                {hotel.content}
              </p>
              <h1>
                {hotel.price}USD/đêm ({hotel.bed} giường)
              </h1>
              <ul>
                <li><WifiOutlined/> Wifi miễn phí</li>
                <li><CarOutlined/> Có chỗ đỗ xe</li>
                <li><CustomerServiceOutlined/> Dịch vụ 24/7</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>)
}

export default DetailPage;