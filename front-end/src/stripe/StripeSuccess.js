import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';

const StripeSuccess = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);

  const date = queryParams.get('date');

  useEffect(() => {
    stripeSuccessRequest(token, match.params.roomId, date).then((res) => {
      if (res.data.success) {
        history.push("/dashboard/renter");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.roomId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeSuccess;
