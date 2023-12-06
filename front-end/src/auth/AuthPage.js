import LoginPage from "./Login";
import "../assets/css/auth.css";
import RegisterPage from "./Register";
import PrivateRoute from "../@components/PrivateRoute";

const AuthPage = () => {
  return (
    <div className="login">
      <div className="loginLeft">
        <div className="loginBody">
          <h1>Chào mừng đến với @homeStay</h1>
          <p>
            Hi vọng bạn có những trải nghiệm tuyệt vời cùng với người thân và gia đình khi sử dụng các
            dịch vụ đặt phòng tài đây
          </p>
          <div className="loginBodyInput">
            <PrivateRoute path="/auth/register" component={RegisterPage} />
            <PrivateRoute path="/auth/login" component={LoginPage} />
          </div>
        </div>
        <div className="loginFooter">
          <p>Copyright © 2023</p>
        </div>
      </div>
      <div className="loginRight"></div>
    </div>
  );
};

export default AuthPage;
