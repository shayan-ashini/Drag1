// Sidebar.js
import React from 'react';

const Sidebar = ({ isVisible, text, onTextChange, onClose, onDelete }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="sidebar">
      <button onClick={onClose}>close</button>
      <textarea     
      onKeyDown={(e) => { 
        if (e.key === "Enter") 
            onClose(); 
        }} 
       value={text} onChange={(e) => onTextChange(e.target.value)} />
      <button onClick={onDelete} className="delete-button">Delete</button>
    </div>
  );
};

export default Sidebar;