import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import logo from "./logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
  updateFolder,
} from "./folderHandlers";

const Sidebar = ({ onFolderSelect, onFolderDeleted, onNoteReset }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const bearerToken = localStorage.getItem("accessToken");
  const [folders, setFolders] = useState([]);
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dropDownFolderId, setDropDownFolderId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    onFolderSelect(folderId);
    console.log(folderId);
    if (onNoteReset) {
      onNoteReset(null);
    }

    // Optionally you could navigate to a different route, or set up the API call here
  };
  const toggleDropdown = (folderId) => {
    setDropDownFolderId(dropDownFolderId === folderId ? null : folderId);
  };
  const dropDownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleRenameClick = (folder) => {
    setRenamingFolderId(folder._id);
    setInputValue(folder.title);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputBlur = (folderId) => {
    if (inputValue.trim() !== "") {
      updateFolder(folderId, inputValue, folders, setFolders, bearerToken);
    }
    setRenamingFolderId(null);
    setInputValue("");
  };
  const handleCreateFolder = () => {
    createFolder(folders, setFolders, bearerToken);
    console.log("Check folders: ", folders);
  };
  const handleDeleteFolder = (folderId) => {
    return async () => {
      deleteFolder(folderId, folders, setFolders, bearerToken);
      if (onFolderDeleted) {
        onFolderDeleted(folderId);
      }
    };
  };

  useEffect(() => {
    // Call the getAllFolders function when the component mounts

    getAllFolders(setFolders, bearerToken);
  }, [bearerToken]); // Dependent on bearerToken to refetch when it changes

  return (
    <div className="Sidebar">
      <div className="Logo">
        <img src={logo} alt="logo" />
        NoteWise
      </div>
      <div className="first-row">
        <span className="welcome">Xin chào, {username}</span>
        <button onClick={handleCreateFolder}>
          <CreateNewFolderIcon />
        </button>
      </div>
      <ul>
        {folders.map((folder) => (
          <li
            key={folder._id}
            className={`folder ${
              selectedFolderId === folder._id ? "active" : ""
            }`}
            onClick={() => handleFolderClick(folder._id)}
          >
            <FolderIcon className="folder-icon" />

            {/* Conditionally render the input field or the folder title and actions */}

            {renamingFolderId === folder._id ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={() => handleInputBlur(folder._id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInputBlur(folder._id);
                }}
                autoFocus
              />
            ) : (
              <>
                <span>{folder.title}</span>
                <button onClick={() => toggleDropdown(folder._id)}>
                  <ArrowDropDownIcon />
                </button>
                {dropDownFolderId === folder._id ? (
                  <ul className="menu">
                    <li className="menu-item">
                      <button onClick={() => handleRenameClick(folder)}>
                        Rename
                      </button>
                    </li>
                    <li className="menu-item">
                      <button onClick={handleDeleteFolder(folder._id)}>
                        Delete
                      </button>
                    </li>
                  </ul>
                ) : null}
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="logout">
        <button onClick={handleLogout}>
          <LogoutIcon /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
