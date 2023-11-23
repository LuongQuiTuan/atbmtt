import "./NoteLists.css";
import React, { useState, useEffect } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SearchIcon from "@mui/icons-material/Search";
import { getNotesFromFolder, createNote, getNoteDisplay } from "./noteHandlers";

const NoteLists = ({ selectedFolderId, onNoteSelect, notes, setNotes }) => {
  const bearerToken = localStorage.getItem("accessToken");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  useEffect(() => {
    if (selectedFolderId) {
      getNotesFromFolder(selectedFolderId, bearerToken, setNotes);
    }
  }, [bearerToken, selectedFolderId]);
  const handleCreateNote = () => {
    createNote(bearerToken, selectedFolderId, setNotes, notes);
  };
  const handleNoteSelect = (note) => {
    onNoteSelect(note);
  };
  const handleNoteClick = async (noteId) => {
    console.log("Note clicked Id:", noteId);
    setSelectedNoteId(noteId);
    const note = await getNoteDisplay(noteId, bearerToken);
    if (note) {
      handleNoteSelect(note);
    }
  };
  const truncateContent = (content, maxLength = 30) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div className="NoteLists">
      <div className="first-row">
        <span className="note-list-label">
          <StickyNote2Icon className="note-list-icon" />
          Note List
        </span>
        <button onClick={handleCreateNote}>
          <NoteAddIcon />
        </button>
      </div>
      <div className="search-bar">
        <a className="search-button">
          <SearchIcon />
        </a>
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note._id}
            className={`note ${selectedNoteId === note._id ? "active" : ""}`}
            onClick={() => handleNoteClick(note._id)}
          >
            <span className="note-title">{note.title}</span>
            <span className="note-content">
              {truncateContent(note.content)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteLists;
