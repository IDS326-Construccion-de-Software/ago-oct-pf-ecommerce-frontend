// src/components/Modal.jsx
import "../styles/Modal.css";
import { createPortal } from "react-dom";

export default function Modal({ message, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
          {onConfirm && <button className="modal-btn confirm" onClick={onConfirm}>Confirmar</button>}
          {onClose && <button className="modal-btn close" onClick={onClose}>Cancelar</button>}
        </div>
      </div>
    </div>,
    document.body
  );
}
