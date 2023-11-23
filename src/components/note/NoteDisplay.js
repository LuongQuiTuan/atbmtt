import React from "react";
import "./NoteDisplay.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
const NoteDisplay = ({ note }) => {
  const handleDeleteNote = () => {
    console.log("button Cliked");
  };

  if (!note) {
    return <div className="NoteDisplay">Select a note to display...</div>;
  }
  return (
    <div className="NoteDisplay">
      <div className="first-row-note">
        <h1 className="note-title">{note.title}</h1>
        <div className="two-btn">
          <button>
            <SaveIcon />
          </button>
          <button onClick={handleDeleteNote}>
            <DeleteForeverIcon />
          </button>
        </div>
      </div>

      <p className="note-date">{note.updatedAt}</p>
      <p className="note-folder">folder Name</p>
      <input type="" name="" value="" />
    </div>
  );
};
export default NoteDisplay;
