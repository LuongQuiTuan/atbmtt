import React from "react";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Use history.push instead of window.location.href to avoid reloading the app

    navigate("/login");
  };

  return (
    <div className="Sidebar">
      <div className="Logo">
        <img src={logo} alt="logo" />
        NoteWise
      </div>
      <span className="welcome">Xin chào, {username}</span>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li className="row" key={key}>
              <NavLink
                to={val.link} // Specify the path to navigate to
                activeclassname="active" // This is the class that will be applied when the route is active
                onClick={() => val.title === "Logout" && handleLogout()} // Just handle logout if it's the logout button
              >
                <div id="icon">{val.icon}</div>

                <div id="title">{val.title}</div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
