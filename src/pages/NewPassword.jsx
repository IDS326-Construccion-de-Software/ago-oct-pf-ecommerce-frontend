import SuccessModal from "../components/SuccessModal"; // importamos el modal
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NewPassword.css";
import logo from "../assets/LogoTheRevenge.svg";
import eyeIcon from "../assets/Eye.svg";
import unlockIcon from "../assets/Unlock.svg";

export default function NewPassword() {
  const navigate = useNavigate();
  const { isCodeVerified } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- control del modal

  useEffect(() => {
    if (!isCodeVerified) {
      navigate("/forgot-password");
    }
  }, [isCodeVerified, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setMsg("Las contraseñas no coinciden.");
      return;
    }
    // Abrimos el modal en lugar de mensaje de éxito
    setMsg("");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/login"); // redirige automáticamente al login al cerrar el modal
  };

  return (
    <div className="np-page">
      <div className="np-card">
        <img src={logo} alt="logo" className="np-logo" />
        <h2 className="np-title">Nueva contraseña</h2>
        <p className="np-text">
          Introduce tu nueva contraseña, tiene que contener al menos 6 caracteres
        </p>

        <form onSubmit={handleSubmit} className="np-form">
          <div className="np-input-wrapper">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="np-input"
            />
            <img src={unlockIcon} alt="unlock icon" className="np-input-icon np-unlock-icon" />
            <img src={eyeIcon} alt="eye icon" className="np-input-icon np-eye-icon" />
          </div>
          <div className="np-input-wrapper">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="np-input"
            />
            <img src={unlockIcon} alt="unlock icon" className="np-input-icon np-unlock-icon" />
            <img src={eyeIcon} alt="eye icon" className="np-input-icon np-eye-icon" />
          </div>
          {msg && <div className="np-error">{msg}</div>}

          <button type="submit" className="np-btn-primary">Actualizar Contraseña</button>
          <button type="button" className="np-btn-secondary" onClick={() => navigate("/forgot-password")}>Atrás</button>
        </form>
      </div>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="¡Contraseña actualizada exitosamente!"
      />
    </div>
  );
}
