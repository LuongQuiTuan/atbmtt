import React from "react";
import "./ConfirmPopup.css";

const ConfirmPopup = ({ isOpen, title, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup">
        <h2>{title}</h2>
        <div className="confirm-popup-actions">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmPopup;
