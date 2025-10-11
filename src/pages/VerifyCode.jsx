// src/pages/VerifyCode.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/VerifyCode.css";
import logo from "../assets/LogoTheRevenge.svg";

export default function VerifyCode() {
  const { recoveryEmail, setIsCodeVerified } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    // si no hay email en el contexto, volver al primer paso
    if (!recoveryEmail) {
      navigate("/forgot-password");
    } else {
      if (inputsRef.current[0]) inputsRef.current[0].focus();
    }
    // eslint-disable-next-line
  }, [recoveryEmail]);

  function handleChange(e, idx) {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...values];
    next[idx] = val;
    setValues(next);
    if (val && inputsRef.current[idx + 1]) inputsRef.current[idx + 1].focus();
  }

  function handleKeyDown(e, idx) {
    if (e.key === "Backspace" && !values[idx] && inputsRef.current[idx - 1]) {
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === "ArrowLeft" && inputsRef.current[idx - 1]) {
      inputsRef.current[idx - 1].focus();
    }
    if (e.key === "ArrowRight" && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }
  }

  function handlePaste(e) {
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length) {
      const next = [...values];
      for (let i = 0; i < 6; i++) next[i] = digits[i] || "";
      setValues(next);
      const lastIndex = Math.min(5, digits.length - 1);
      if (inputsRef.current[lastIndex + 1]) inputsRef.current[lastIndex + 1].focus();
    }
    e.preventDefault();
  }

  const codeString = () => values.join("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const code = codeString();
    if (code.length !== 6) {
      setError("Por favor introduce los 6 dígitos.");
      return;
    }

    setLoading(true);
    try {
      // UI-only: aceptamos cualquier 6-digit. Aquí va la llamada real cuando integren.
      await new Promise((r) => setTimeout(r, 600));
      setIsCodeVerified(true);
      navigate("/new-password");
    } catch (err) {
      setError(err.message || "Error al verificar el código");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="vc-page">
      <div className="vc-card">
        <img src={logo} alt="logo" className="vc-logo" />
        <h2 className="vc-title">Introducir Código</h2>
        <p className="vc-desc">Se ha enviado un código a: <strong>{recoveryEmail}</strong></p>

        <form onSubmit={handleSubmit} onPaste={handlePaste} className="vc-form">
          <div className="vc-inputs">
            {values.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                className="vc-digit"
                value={v}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && <div className="vc-error">{error}</div>}

          <button type="submit" className="vc-btn-primary" disabled={loading}>
            {loading ? "Verificando..." : "Verificar Código"}
          </button>
          <button type="button" className="vc-btn-secondary" onClick={() => navigate(-1)}>
            Atrás
          </button>
        </form>
      </div>
    </div>
  );
}
