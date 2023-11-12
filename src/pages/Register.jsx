import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const PWD_REGEX = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    matchPassword: "",
    focused: { email: false, password: false, matchPassword: false },
  });

  const handleFocus = (e) => {
    setValues({
      ...values,
      focused: { ...values.focused, [e.target.name]: true },
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      values.email + " " + values.password + " " + values.matchPassword
    );
  };
  return (
    <>
      <div className="auth-form-container">
        <h1>Đăng ký</h1>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Nhập vào email"
            id="email"
            name="email"
            value={values.email}
            onChange={onChange}
            onBlur={handleFocus}
            focused={values.focused.email.toString()}
            required
          ></input>
          {values.focused.email && !EMAIL_REGEX.test(values.email) && (
            <span>Email không đúng định dạng</span>
          )}
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            placeholder="Nhập vào mật khẩu"
            id="password"
            name="password"
            value={values.password}
            onChange={onChange}
            onBlur={handleFocus}
            focused={values.focused.password.toString()}
            required
          ></input>
          {values.focused.password && !PWD_REGEX.test(values.password) && (
            <span>Vui lòng nhập vào mật khẩu</span>
          )}
          <label htmlFor="password">Nhập lại mật khẩu:</label>
          <input
            type="password"
            placeholder="Mật khẩu không trùng khớp"
            id="matchPassword"
            name="matchPassword"
            value={values.matchPassword}
            onChange={onChange}
            pattern={values.password}
            onBlur={handleFocus}
            focused={values.focused.matchPassword.toString()}
            required
          ></input>
          {values.focused.matchPassword &&
            values.password !== values.matchPassword && (
              <span>Mật khẩu không trùng khớp</span>
            )}
          <button type="submit">Đăng ký</button>
        </form>

        <div>
          <Link to="/Login" className="link-btn">
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
