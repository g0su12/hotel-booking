import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.token ? <Redirect to="/" /> : <Route {...rest} />;
};

export default PrivateRoute;
