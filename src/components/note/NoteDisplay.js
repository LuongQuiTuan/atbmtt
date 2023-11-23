import React, { useState, useEffect } from "react";
import "./NoteDisplay.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";

const NoteDisplay = ({ note, onDelete, onUpdate, bearerToken }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSaveNote = () => {
    onUpdate(note._id, title, content);
  };
  if (!note) {
    return (
      <div className="display-box">
        <div className="note-placeholder">Select a note to display...</div>;
      </div>
    );
  }

  return (
    <div className="NoteDisplay">
      <div className="first-row-note">
        <input
          type="text"
          className="note-title-input"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="two-btn">
          <button onClick={handleSaveNote}>
            <SaveIcon />
          </button>
          <button
            onClick={() => {
              onDelete(note._id);
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      </div>

      <p className="note-date">{note.updatedAt}</p>
      <p className="note-folder">{note.folder}</p>
      <textarea
        className="note-content-input"
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};
export default NoteDisplay;
