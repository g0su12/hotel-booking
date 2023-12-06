import {useSelector} from "react-redux";
import DashboardNav from "../@components/DashboardNav";
import {Link} from "react-router-dom/cjs/react-router-dom.min";
import {useEffect, useState} from "react";
import {userHotelBookings} from "../actions/hotel";
import {Card} from "antd";
import {API} from "../common/constants/api";

const Dashboard = () => {
  const {auth: {token}} = useSelector((state) => ({...state}));
  const {auth} = useSelector((state) => ({...state}));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    const res = await userHotelBookings(token);
    setOrders(res.data);
  };
  return (<>
    <div className="container-fluid p-4">
      <DashboardNav/>
    </div>
    {auth.user.role === 2 ? (<div className="container">
      <p>Chức năng này chỉ dành khả dụng cho người cho thuê phòng</p>
    </div>) : (<div className="container">
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách các phòng đã đặt</h2>
        </div>
        <div className="col-md-2">
        </div>
      </div>
      <div className="row">
        {orders?.map((order) => <div className="p-4">
          <Card
            cover={<img alt="example" src={`${API.BASE_URL}/rooms/image/${order.hotel?._id}`}/>}
            hoverable
            style={{ width: 300, height: 350, marginBottom: 16 }}
          >
            <Card.Meta title={order.hotel?.title} description={`Địa chỉ: ${order.hotel?.location}`}/>
          </Card>
        </div>)}
      </div>
    </div>)}
  </>);
};

export default Dashboard;
