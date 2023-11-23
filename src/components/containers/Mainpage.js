import Sidebar from "../components/folder/Sidebar";
import NoteLists from "../components/note/NoteLists";
import NoteDisplay from "../components/note/NoteDisplay";
import "./Mainpage.css";
import React, { useState } from "react";
const Mainpage = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  return (
    <div className="Mainpage">
      <Sidebar onFolderSelect={setSelectedFolderId} />
      <div className="note-container">
        <NoteLists
          selectedFolderId={selectedFolderId}
          onNoteSelect={setSelectedNote}
        />
        <NoteDisplay note={selectedNote} />
      </div>
    </div>
  );
};

export default Mainpage;
