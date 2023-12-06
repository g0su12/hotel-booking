import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {HomeOutlined} from "@ant-design/icons";
import {API} from "../../common/constants/api";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createConnectAccount} from "../../actions/stripe";
import {getSellerHotels, handleDeleteHotel} from "../../actions/hotel";

export const SellerRooms = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const {auth} = useSelector((state) => ({...state}));

  useEffect(() => {
    updateSellerData().then((r) => {
    });
  }, []);

  const updateSellerData = async () => {
    const rooms = await getSellerHotels(auth.token, auth.user._id);
    setRooms(rooms.data);
  };
  const handleDelete = async (roomId, orderIds) => {
    if (orderIds.length > 0) {
      toast.error("Không thể xoá khi đang có đơn đặt phòng")
    } else {
      const res = await handleDeleteHotel(auth.token, roomId);
      if (res) {
        dispatch({
          type: "SHOW_LOADING",
        });
        await updateSellerData();
        dispatch({
          type: "HIDE_LOADING",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (e) {
      toast.error("Liên kết thanh toán không thành công, vui lòng thử lại!");
      console.log(e);
    }
  };

  return (
    <>
      {auth.user.role === 2 &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled ? (
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h2>Danh sách phòng của bạn</h2>
            </div>
            <Link to="/rooms/add-room">
              <button type="button" className="btn btn-success btn-sm p-2">
                Thêm phòng mới
              </button>
            </Link>
            {rooms?.length === 0 ? (
              <div className="col-md-6 offset-md-3 text-center">
                <p className="center lead">
                  Chưa đăng tải bất kỳ phòng cho thuê nào
                </p>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <table className="table table-image">
                    <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col" className="col-3">
                        Hình ảnh
                      </th>
                      <th scope="col" className="col-2">
                        Tên phòng
                      </th>
                      <th scope="col" className="col-3">
                        Mô tả
                      </th>
                      <th scope="col" className="col-2">
                        Địa chỉ
                      </th>
                      <th scope="col" className="col-1">
                        Giá tiền
                      </th>
                      <th scope="col" className="col-2">
                        Số giường
                      </th>
                      <th scope="col" className="col-2">
                        Trạng thái
                      </th>
                      <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms?.map((room, index) => {
                      return (
                        <tr key={index}>
                          <th className="hotel-item" scope="row">
                            {index + 1}
                          </th>
                          <td className="hotel-item">
                            <img
                              width={200}
                              src={`${API.BASE_URL}${API.GET_IMAGE_BY_ID}${room._id}`}
                            />
                          </td>
                          <td className="hotel-item">{room.title}</td>
                          <td className="hotel-item">
                            {room.content.length > 50
                              ? room.content.slice(0, 130) + "..."
                              : room.content}
                          </td>
                          <td className="hotel-item">{room.location}</td>
                          <td className="hotel-item">{room.price}</td>
                          <td className="hotel-item">{room.bed}</td>
                          <td className="hotel-item">
                            {room.status ? "Đã được duyệt" : "Chưa được duyệt"}
                          </td>
                          <td className="hotel-item">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm p-3 m-1"
                              onClick={() =>
                                history.push(
                                  `/rooms/update-room/${room._id}`
                                )
                              }
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm p-3 m-1"
                              onClick={() => handleDelete(room._id, room.orderIds)}
                            >
                              Xoá
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        auth.user.role === 2 && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3 text-center">
                <div className="p-5 pointer">
                  <HomeOutlined className="h1"/>
                  <h4>Thông báo quan trọng</h4>
                  <p className="lead">Yêu cầu thiết lập liên kết thanh toán</p>
                  <button
                    disabled={loading}
                    onClick={handleClick}
                    className="btn btn-primary mb-3"
                  >
                    {loading ? "Đang xử lý..." : "Thiết lập thanh toán"}
                  </button>
                  <p className="text-muted">
                    <small>
                      Bạn cần phải liên kết thanh toán qua cổng thanh toán
                      Stripe trước khi bắt đầu sử dụng các dịch vụ dành cho các
                      chủ khách sạn
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};