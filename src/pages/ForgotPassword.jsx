// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/ForgotPassword.css";
import logo from "../assets/LogoTheRevenge.svg";
import inboxIcon from "../assets/Inbox.svg";
import validator from "validator";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();
  const { setRecoveryEmail, setIsCodeVerified } = useAuth();

  // Usa validator para validar el email
  const validate = (value) => validator.isEmail(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!validate(email)) {
      setMessage("Por favor, introduce un correo válido.");
      return;
    }

    // Guardar email en contexto y limpiar verificación previa
    setRecoveryEmail(email);
    setIsCodeVerified(false);

    setMessage(" Se ha enviado un código de recuperación a tu correo.");
    // simulamos que el flujo sigue al paso de código después de 1.5s
    setTimeout(() => {
      navigate("/recover/code");
    }, 1500);
  };

  return (
    <div className="fp-page">
      <div className="fp-card">
        <img src={logo} alt="logo" className="fp-logo" />
        <h2 className="fp-title">¿Olvidaste tu contraseña?</h2>
        <p className="fp-text">
          Ingresa tu correo electrónico y te enviaremos un código para verificar
          el cambio de contraseña.
        </p>

        <form onSubmit={handleSubmit} className="fp-form" noValidate>
          <div className="fp-input-wrapper">
            <input
              type="email"
              placeholder="Ejemplo: micorreo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className={`fp-input ${touched && !validate(email) ? "invalid" : ""}`}
            />
            <img src={inboxIcon} alt="mail icon" className="fp-mail-icon" />
          </div>

          <button type="submit" className="fp-btn-primary">Enviar código de acceso</button>
        </form>


        <button onClick={() => navigate("/login")} className="fp-btn-secondary">Atrás</button>
        {/* Mensaje de éxito debajo de los botones */}
        {message && <div className="fp-success">{message}</div>}
      </div>
    </div>
  );
}
