// PasswordModal.js
import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component

function PasswordModal({ isOpen, onClose, onConfirm, onDecline }) {
  const [password, setPassword] = useState(""); // State to hold the entered password

  const handleConfirm = () => {
    onConfirm(password); // Pass the entered password to the onConfirm callback
    onClose();
  };

  const handleDecline = () => {
    onDecline(); // Handle the "Decline" action
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enter Password"
      content={
        <div className="passwordModalBody">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      }
      onConfirm={handleConfirm}
      onDecline={handleDecline}
    />
  );
}

export default PasswordModal;
