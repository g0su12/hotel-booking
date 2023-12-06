import {useSelector} from "react-redux";
import "../assets/css/dashboard.css";
import {changeHotelStatus, getAllHotels} from "../actions/hotel";
import {useEffect, useState} from "react";
import {API} from "../common/constants/api";
import {Modal} from "antd";
import ViewHotel from "../hotels/ViewHotel";
import Swal from "sweetalert2";

const DashboardHotels = () => {
  const {auth} = useSelector((state) => ({...state}));
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState("");

  useEffect(() => {
    updateRooms().then(r => {
    });
  }, []);

  const updateRooms = async () => {
    let {data} = await getAllHotels(auth.token);
    setHotels(data);
  };

  const handleShowInfo = async (roomId) => {
    setOpen(roomId);
  }

  const approveHotel = (roomId, status) => {
    setOpen("");
    if (!status) {
      Swal.fire({
        title: "Bạn chắc chắn muốn duyệt phòng",
        text: "Kiểm tra chính xác các thông tin là hợp lệ trước khi duyệt",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ"
      }).then((result) => {
        if (result.isConfirmed) {
          changeHotelStatus(auth.token, roomId).then(r => {
            Swal.fire({
              title: "Đã duyệt phòng!", icon: "success"
            });
            updateRooms();
          });
        }
      });
    }else {
      Swal.fire({
        icon: "error",
        title: "Phòng đã đươc duyệt trước đó",
      });
    }
  }

  return (<>
    {auth && auth.user.role === 3 ? (<div className="container">
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách phòng trên hệ thống</h2>
        </div>
        {hotels.length === 0 ? <div className="col-md-6 offset-md-3 text-center">
          <p className="center lead">
            Chưa có phòng nào trên hệ thống
          </p>
        </div> : <div className="container">
          <div className="row">
            <table className="table table-image">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" className="col-3">Hình ảnh</th>
                <th scope="col" className="col-2">Tên phòng</th>
                <th scope="col" className="col-3">Mô tả</th>
                <th scope="col" className="col-2">Địa chỉ</th>
                <th scope="col" className="col-1">Giá tiền</th>
                <th scope="col" className="col-2">Số giường</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {hotels.map((hotel, index) => {
                return (<tr key={index}>
                  <th className="hotel-item" scope="row">
                    {index + 1}
                  </th>
                  <td className="hotel-item">
                    <img
                      width={200}
                      src={`${API.BASE_URL}${API.GET_IMAGE_BY_ID}${hotel._id}`}
                    />
                  </td>
                  <td className="hotel-item">{hotel.title}</td>
                  <td className="hotel-item">
                    {hotel.content.length > 50 ? hotel.content.slice(0, 130) + "..." : hotel.content}
                  </td>
                  <td className="hotel-item">{hotel.location}</td>
                  <td className="hotel-item">{hotel.price}</td>
                  <td className="hotel-item">{hotel.bed}</td>
                  <td className="hotel-item">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm p-3 m-1"
                      onClick={() => handleShowInfo(hotel._id)}
                    >
                      Xem phòng
                    </button>

                  </td>
                  <td className="hotel-item">
                    <button
                      type="button"
                      disabled={true}
                      className="btn btn-success btn-sm p-3 m-1"
                    >
                      {hotel.status ? "Đã duyệt" : "Chưa duyệt"}
                    </button>
                  </td>
                  <Modal
                    title={hotel.title}
                    centered
                    open={open === hotel._id}
                    onOk={() => approveHotel(hotel._id, hotel.status)}
                    onCancel={() => setOpen("")}
                    width={1000}
                  >
                    <ViewHotel hotel={hotel}></ViewHotel>
                  </Modal>
                </tr>);
              })}
              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>) : <div className="container-fluid"></div>}
  </>);
};

export default DashboardHotels;
