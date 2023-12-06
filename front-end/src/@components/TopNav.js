import {useDispatch, useSelector} from "react-redux";
import "../assets/css/topnav.css";
import logo from "../assets/images/logo.png";
import {Link, useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {DownOutlined, UserOutlined} from '@ant-design/icons';
import {Dropdown, Space} from 'antd';
import {currencyFormatter, getAccountBalance, payoutSetting} from "../actions/stripe";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const TopNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => ({...state}));
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      getAccountBalance(auth?.token).then((res) => {
        setBalance(res.data);
      });
    }
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(auth?.token);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Xảy ra lỗi vui lòng thử lại");
    }
  };
  const logout = () => {
    dispatch({
      type: "SHOW_LOADING",
    });
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    setTimeout(() => {
      dispatch({
        type: "HIDE_LOADING",
      });
    }, 1000);
    window.localStorage.removeItem("auth");
    history.push("/");
  };

  const items = [
    {
      key: '1',
      label: (
        auth?.user.role === 1 ? <Link to="/dashboard/renter">
          Quản lý phòng đã thuê
        </Link> : auth?.user.role === 2 ? <Link to="/dashboard/seller/rooms">
          Quản lý phòng đã đăng
        </Link> : <Link to="/dashboard/rooms">
          Quản lý danh sách phòng
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link to="/dashboard/seller/orders">
          Quản lý các đơn đặt phòng
        </Link>
      ),
      disabled: !(auth?.user.role === 2 && auth?.user.stripe_seller &&
        auth?.user.stripe_seller.charges_enabled)
    },
    {
      key: '2',
      label: 'Quản lý thanh toán',
      children: [
        {
          key: '2-1',
          label: balance && balance.pending && balance.pending.map((bp, i) => (<span key={i}>
                Khoản thanh toán đang chờ  <h5>{currencyFormatter(bp)}</h5>
                    </span>)),
        },
        {
          key: '2-2',
          label: 'Cài đặt thanh toán',
          onClick: () => handlePayoutSettings()
        },
      ],
      disabled: !(auth?.user.role === 2 && auth?.user.stripe_seller &&
        auth?.user.stripe_seller.charges_enabled),
    },
    {
      key: '3',
      danger: true,
      label: 'Đăng xuất',
      onClick: () => logout()
    },
  ];

  return (
    <div className="header">
      <div className="leftHeader">
        <Link to="/">
          <h1 style={{color: "white"}}>@homeStay</h1>
        </Link>
        <img src={logo}/>
      </div>
      <div className="rightHeader">
        {auth && (
          <Dropdown menu={{items}}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined/>
                {auth?.user.name}
                <DownOutlined/>
              </Space>
            </a>
          </Dropdown>
        )}
        {!auth && (
          <div>
            <Link className="nav-text" to="/auth/login">
              Đăng nhập
            </Link>
            <Link className="nav-text" to="/auth/register">
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
