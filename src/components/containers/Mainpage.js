import NoteLists from "../note/NoteLists";
import NoteDisplay from "../note/NoteDisplay";
import "./Mainpage.css";
import React, { useState } from "react";
import { deleteNote, updateNote } from "../note/noteHandlers";
import Sidebar from "./../folder/Sidebar";

const Mainpage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
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

  return (
    <div className="Mainpage">
      <Sidebar
        onFolderSelect={setSelectedFolderId}
        onFolderDeleted={handleFolderDeletion}
        onNoteReset={resetSelectedNote}
      />
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
  );
};

export default Mainpage;
