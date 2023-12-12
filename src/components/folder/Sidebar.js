import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import logo from "./logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { deleteFolder, getAllFolders, updateFolder } from "./folderHandlers";
import { logoutApi } from "../../api/UserServices";

const Sidebar = ({
  onFolderSelect,
  onFolderDeleted,
  onNoteReset,
  setCreateModalOpen,
  setFolderTitle,
  folderPassword,
  setFolderPassword,
}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const bearerToken = localStorage.getItem("accessToken");
  const [folders, setFolders] = useState([]);

  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dropDownFolderId, setDropDownFolderId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const [hasPassword, setHasPassword] = useState(false);
  const handleFolderClick = (folderId) => {
    if (hasPassword) {
      // Open the password modal
      setPasswordModalOpen(true);
      setFolderWithPassword(folderId); // Save the folder ID that has a password
    } else {
      // Proceed with the regular folder click behavior
      setSelectedFolderId(folderId);
      onFolderSelect(folderId);
      if (onNoteReset) {
        onNoteReset(null);
      }
    }
  };
  const toggleDropdown = (folderId) => {
    setDropDownFolderId(dropDownFolderId === folderId ? null : folderId);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutApi();
      console.log(response.data);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      navigate("/login"); // Redirects to the login page
    } catch (error) {
      console.log("Logout failed: ", error); // In case there is an error logging out
    }
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
    setCreateModalOpen(true);
    // Reset the state
    setFolderTitle("");
    setFolderPassword("");
    console.log("Opened create folder modal");
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
    getAllFolders(setFolders, bearerToken, folderPassword);
  }, [bearerToken, folders, folderPassword]);
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
      <div className="folder-container">
        {" "}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      toggleDropdown(folder._id);
                    }}
                    className="dropdown-btn"
                  >
                    <ArrowDropDownIcon />
                  </button>
                  {dropDownFolderId === folder._id ? (
                    <ul className="menu">
                      <li className="menu-item">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleRenameClick(folder);
                          }}
                        >
                          Rename
                        </button>
                      </li>

                      <li className="menu-item">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            handleDeleteFolder(folder._id)();
                          }}
                        >
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
      </div>

      <div className="logout">
        <button onClick={handleLogout}>
          <LogoutIcon /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
