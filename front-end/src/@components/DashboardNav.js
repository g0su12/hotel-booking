import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const DashboardNav = () => {
  const active = window.location.pathname;
  const {auth} = useSelector((state) => ({...state}));

  return (
    <ul className="nav nav-tabs">
      {auth.user.role === 1 && (
        <li className="nav-item">
          <Link
            className={`nav-link ${active === "/dashboard/renter" && "active"}`}
            to="/dashboard"
          >
            Các phòng đã đặt
          </Link>
        </li>
      )}

      {auth.user.role === 2 && (
        <React.Fragment>
          <li className="nav-item">
            <Link
              className={`nav-link ${active === "/dashboard/seller" && "active"}`}
              to="/dashboard/seller"
            >
              Các phòng cho thuê
            </Link>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
};

export default DashboardNav;
