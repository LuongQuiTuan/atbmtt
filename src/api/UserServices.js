import axios from "./axios";

const loginApi = (username, password) => {
  return axios.post(
    "/auth/login-jwt",
    { username, password },
    {
      headers: { "Content-Type": "application/json" },
    },
    { withCredentials: true }
  );
};

const registerApi = (username, password, email) => {
  return axios.post(
    "/auth/register-jwt",
    {
      username,
      password,
      email,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export { loginApi, registerApi };
