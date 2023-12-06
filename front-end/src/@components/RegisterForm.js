import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  role,
  setRole,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3" style={{width: "100%"}}>
    <div className="form-group mb-3">
      <label className="form-label">Tên của bạn</label>
      <input
        type="text"
        className="form-control"
        placeholder="Nhập tên của bạn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Email đăng ký</label>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label className="form-label">Số điện thoại</label>
      <input
        className="form-control"
        placeholder="Số điện thoại"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label className="form-label">Bạn muốn đăng ký trở thành?</label>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value={1}
          checked={role === 1}
          onChange={(e) => {
            setRole(parseInt(e.target.value, 10));
          }}
        />
        <label className="form-check-label" for="flexRadioDefault1">
          Người thuê phòng
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value={2}
          checked={role === 2}
          onChange={(e) => {
            setRole(parseInt(e.target.value, 10));
          }}
        />
        <label className="form-check-label" for="flexRadioDefault2">
          Người cho thuê
        </label>
      </div>
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Mật khẩu</label>
      <input
        type="password"
        className="form-control"
        placeholder="Nhập mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="switch-mode">
      Bạn đã có tài khoản? <Link to="/auth/login">Đăng nhập</Link>
    </div>
    <button disabled={!name || !email || !password} className="btn btn-primary">
      Đăng ký tài khoản
    </button>
  </form>
);

export default RegisterForm;
