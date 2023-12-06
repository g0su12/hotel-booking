import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkOutOrder, getOrdersByUserId} from "../../actions/order";


export const SellerOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const {auth} = useSelector((state) => ({...state}));

  useEffect(() => {
    updateSellerData().then((r) => {});
  }, []);

  const updateSellerData = async () => {
    const orders = await getOrdersByUserId(auth.token, auth.user._id);
    setOrders(orders.data);
  };
  const handleCheckout = async (orderId) => {
    const res = await checkOutOrder(auth.token, orderId);
    if (res) {
      dispatch({
        type: "SHOW_LOADING",
      });
      await updateSellerData();
      dispatch({
        type: "HIDE_LOADING",
      });
      window.location.reload();
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <h2>Danh sách các phòng đang được thuê</h2>
        </div>
        {orders?.length === 0 ? (
          <div className="col-md-6 offset-md-3 text-center">
            <p className="center lead">
              Chưa có bất kỳ phòng nào được thuê
            </p>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <table className="table table-image">
                <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col" className="col-2">
                    Tên phòng
                  </th>
                  <th scope="col" className="col-3">
                    Thời gian thuê
                  </th>
                  <th scope="col" className="col-2">
                    Số tiền đã thanh toán
                  </th>
                  <th scope="col" className="col-2">
                    Trạng thái
                  </th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {orders?.map((order, index) => {
                  return (
                    <tr key={index}>
                      <th className="hotel-item" scope="row">
                        {index + 1}
                      </th>
                      <td className="hotel-item">{order.hotel.title}</td>
                      <td
                        className="hotel-item">{new Date(order.from).toLocaleDateString('en-GB')} - {new Date(order.to).toLocaleDateString('en-GB')}</td>
                      <td className="hotel-item">{order.session.amount_total / 100} USD</td>
                      <td className="hotel-item">
                        {order.status ? "Đã checkout" : "Chưa checkout"}
                      </td>
                      <td className="hotel-item">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm p-3 m-1"
                          disabled={order.status}
                          onClick={() => handleCheckout(order._id)}
                        >
                          Checkout
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
  );
};