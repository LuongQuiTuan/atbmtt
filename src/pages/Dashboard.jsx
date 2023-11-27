import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

import Mainpage from "../components/containers/Mainpage";
import { refreshApi } from "../api/UserServices";

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Track the checking status

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          setAuthenticated(true);
        } else {
          const response = await refreshApi();
          if (response.status === 200 && response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Error during authentication check:", error);

        setAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    alert("Vui lòng đăng nhập");

    return <Navigate replace to="/login" />;
  }

  return (
    <div className="app-container">
      <Mainpage />
    </div>
  );
};

export default Dashboard;
