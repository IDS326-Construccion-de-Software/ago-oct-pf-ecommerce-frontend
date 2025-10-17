import React from "react";
import { createPortal } from "react-dom";
import "../styles/SuccessModal.css";

const SuccessModal = ({ isOpen, onClose, title = "¡Acción exitosa!", message = "La operación se completó correctamente." }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="success-modal-overlay" onClick={onClose}>
      <div
        className="success-modal-container"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="success-modal-icon">✓</div>
        <h2 className="success-modal-title">{title}</h2>
        <p className="success-modal-message">{message}</p>

        <button className="success-modal-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
