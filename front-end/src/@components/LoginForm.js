import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label">Email của bạn</label>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      Bạn chưa có tài khoản ở @homeStay? <Link to="/auth/register">Tạo tài khoản mới</Link>
    </div>
    <button disabled={!email || !password} className="btn btn-primary">
      Đăng nhập
    </button>
  </form>
);

export default LoginForm;
