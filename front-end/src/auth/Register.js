import { useState } from "react";
import RegisterForm from "../@components/RegisterForm";
import { toast } from "react-toastify";
import { register } from "../actions/auth";
import { useDispatch } from "react-redux";

const RegisterPage = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState(1);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await register({
        name,
        email,
        phoneNumber,
        role,
        password,
      });
      toast.success("Đăng ký thành công, hãy đăng nhập lại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push("login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) {
        toast.warn(err?.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } finally {
      dispatch({
        type: "HIDE_LOADING",
      });
    }
  };

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      role={role}
      setRole={setRole}
      password={password}
      setPassword={setPassword}
    />
  );
};

export default RegisterPage;
