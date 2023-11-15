import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginApi } from "../api/UserServices";
const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const username = values.username;
  const password = values.password;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Vui lòng nhập username và mật khẩu!");
      return;
    }
    let res = await loginApi(username, password);
    console.log("check response: ", res);
    if (res && res.data.token) {
      localStorage.setItem("token", res.data.token);
    } else {
      if (res && res.status === 400) {
        console.log(res.data.error);
        setError(res.data.error);
      }
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="auth-form-container">
        <h1>Đăng nhập</h1>
        <p className="error">{error}</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="password">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Nhập vào username"
            value={values.username}
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
