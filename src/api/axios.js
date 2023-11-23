import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",

  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that is within the range of 2xx cause this function to trigger
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    // Check if the response status code is 403 and we have not retried the request yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/auth/refresh-jwt",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", response.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return instance(originalRequest); // <-- Retry the original request with the new token
      } catch (refreshError) {
        // Handle token refresh errors, e.g., logout user
        console.error(refreshError);
        // Possible logout code here
        return Promise.reject(refreshError); // <-- Reject the promise if token refresh fails
      }
    }
    // If it's not a token-related error or token refresh failed, pass the error on
    return Promise.reject(error);
  }
);

export default instance;
