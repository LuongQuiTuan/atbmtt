import NoteLists from "../note/NoteLists";
import NoteDisplay from "../note/NoteDisplay";
import "./Mainpage.css";
import React, { useState } from "react";
import { deleteNote, updateNote } from "../note/noteHandlers";
import { createFolder, getAllFolders } from "../folder/folderHandlers";
import Sidebar from "./../folder/Sidebar";
import PasswordModal from "../PasswordModal";
import Modal from "../Modal";
const Mainpage = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [folderTitle, setFolderTitle] = useState("");
  const [folderPassword, setFolderPassword] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const bearerToken = localStorage.getItem("accessToken");
  const handleFolderDeletion = (deleteFolderId) => {
    if (deleteFolderId === selectedFolderId) {
      setSelectedNote(null);
      setNotes([]);
      setSelectedFolderId(null);
    }
  };
  const resetSelectedNote = () => {
    setSelectedNote(null);
  };
  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId, bearerToken, notes, setNotes);
    setSelectedNote(null);
  };
  const handleUpdateNote = async (noteId, newTitle, newContent) => {
    await updateNote(
      noteId,
      bearerToken,
      newTitle,
      newContent,
      notes,
      setNotes
    );
  };
  const handleCreateFolder = async () => {
    try {
      console.log("Before creating folder. Folder title:", folderTitle);

      if (folderTitle.trim() !== "") {
        await createFolder(
          folders,
          setFolders,
          bearerToken,
          folderTitle,
          folderPassword
        );
      } else {
        console.error("Folder title is empty or undefined");
      }

      // Reset the state
      setCreateModalOpen(false);
      setFolderTitle("");
      setFolderPassword("");
    } catch (error) {
      console.error("Error when creating the folder: ", error);
    }
  };
  return (
    <div className="Mainpage">
      <Sidebar
        folders={folders}
        setFolders={setFolders}
        onFolderSelect={setSelectedFolderId}
        onFolderDeleted={handleFolderDeletion}
        onNoteReset={resetSelectedNote}
        setCreateModalOpen={setCreateModalOpen}
        folderTitle={folderTitle}
        setFolderTitle={setFolderTitle}
        folderPassword={folderPassword}
        setFolderPassword={setFolderPassword}
      />

      {isCreateModalOpen && (
        <Modal
          onClose={() => setCreateModalOpen(false)}
          title="Tạo thư mục mới"
          content={
            <>
              <label htmlFor="folderTitle">Tên thư mục:</label>
              <input
                type="text"
                id="folderTitle"
                value={folderTitle}
                required
                onChange={(e) => setFolderTitle(e.target.value)}
              />
              <label htmlFor="folderPassword">Mật khẩu:</label>
              <input
                type="password"
                id="folderPassword"
                value={folderPassword}
                onChange={(e) => setFolderPassword(e.target.value)}
              />
            </>
          }
          onConfirm={handleCreateFolder}
          onDecline={() => {
            console.log("Declined to create folder");
          }}
        />
      )}
      <div className="middle-container">
        <div className="note-container">
          <NoteLists
            selectedFolderId={selectedFolderId}
            onNoteSelect={setSelectedNote}
            notes={notes}
            setNotes={setNotes}
          />

          <NoteDisplay
            note={selectedNote}
            notes={notes}
            setNotes={setNotes}
            onDelete={handleDeleteNote}
            onUpdate={handleUpdateNote}
            bearerToken
          />
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
