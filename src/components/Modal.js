import React from "react";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";

function Modal({ onClose, title, content, onConfirm, onDecline }) {
  const handleConfirm = () => {
    onConfirm(); // Handle the "Agree" action
    onClose();
  };

  const handleDecline = () => {
    onDecline(); // Handle the "Decline" action
    onClose();
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modal-header">
          <h2 className="modal-title">{title} </h2>
        </div>

        <div className="modal-body">{content}</div>
        <div className="modal-footer">
          <button onClick={handleConfirm}>Đồng ý</button>
          <button className="cancelBtn" onClick={handleDecline}>
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
