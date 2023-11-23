import React, { useState, useEffect } from "react";
import "./NoteDisplay.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import moment from "moment/moment";
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
  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm:ss a"); // e.g., "November 23rd 2023, 12:06:06 pm"
  };
  if (!note) {
    return (
      <div className="display-box">
        <div className="note-placeholder">Chọn 1 note để hiển thị</div>
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

      <p className="note-date">
        <span className="note-icon">
          <CalendarMonthIcon />
        </span>

        {formatDate(note.updateAt)}
      </p>

      <textarea
        className="note-content-input"
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};
export default NoteDisplay;
