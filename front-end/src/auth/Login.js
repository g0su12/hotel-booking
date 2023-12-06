import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../@components/LoginForm";
import { useDispatch } from "react-redux";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      let res = await login({ email, password });
      dispatch({
        type: "HIDE_LOADING",
      });
      if (res.data) {
        if (res.data) {
          window.localStorage.setItem("auth", JSON.stringify(res.data));
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          history.goBack();
        }
      }
    } catch (err) {
      dispatch({
        type: "HIDE_LOADING",
      });
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default LoginPage;
