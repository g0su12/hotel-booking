import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthGuard = ({...rest}) => {
  const {auth} = useSelector((state) => ({...state}));

  if (rest.path === "/hotels/add-hotel" || rest.path === "/hotels/update-hotel/:roomId" && auth.token) {
    return auth.token && auth.user.role === 2 && auth.user.stripe_seller &&
    auth.user.stripe_seller.charges_enabled ? (
      <Route {...rest} />
    ) : (
      <Redirect to="/dashboard/seller"/>
    );
  }

  return auth && auth.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/auth/login"/>
  );
};

export default AuthGuard;
