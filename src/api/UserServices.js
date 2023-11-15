import axios from "./axios";

const loginApi = (username, password) => {
  return axios.post("/auth/login", { username, password });
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
