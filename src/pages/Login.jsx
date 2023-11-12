import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.email + " " + values.password);
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="auth-form-container">
        <h1>Đăng nhập</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="password">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập vào email"
            value={values.email}
            onChange={onChange}
            required
          />
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập vào mật khẩu"
            value={values.password}
            onChange={onChange}
            required
          />
          <button type="submit">Đăng nhập</button>
        </form>

        <Link to="/Register" className="link-btn">
          Chưa có tài khoản? Đăng ký
        </Link>
      </div>
    </>
  );
};

export default Login;
