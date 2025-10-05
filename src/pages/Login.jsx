// src/pages/auth/Login.jsx
import { useState } from 'react'
import logoUrl from '../assets/LogoTheRevenge.svg' // logo 

/* ===== Iconos ===== */
function MailIcon(){ return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)}
function LockIcon(){ return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 10V8a4 4 0 118 0v2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)}
function EyeIcon(){ return (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)}
/* Logos sociales, más grandes */
function AppleIcon(){ return (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M16.28 13.5c.03 3.09 2.72 4.12 2.75 4.13-.02.06-.43 1.45-1.43 2.87-.86 1.24-1.75 2.47-3.15 2.5-1.39.02-1.84-.81-3.43-.81-1.58 0-2.08.79-3.4.83-1.36.05-2.4-1.34-3.28-2.58C2.4 18.6 1.3 14.2 3.2 11.47c.9-1.33 2.33-2.18 3.95-2.21 1.55-.03 3.02.86 3.81.86.78 0 2.6-1.06 4.39-.91.75.03 2.85.3 4.21 2.27-.11.07-2.47 1.44-2.47 4.02zM13.9 6.7c.75-.91 1.25-2.18 1.11-3.46-1.08.04-2.41.72-3.19 1.63-.7.8-1.3 2.11-1.14 3.35 1.21.09 2.47-.61 3.22-1.52z"/>
  </svg>
)}
function FacebookIcon(){ return (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M13.5 22v-8h2.7l.4-3h-3.1V8.6c0-.9.3-1.5 1.7-1.5H17V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.4-3.7 3.9V11H8v3h3.1v8h2.4z"/>
  </svg>
)}
function GoogleIcon(){ return (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
    <path d="M21.6 12.23c0-.67-.06-1.34-.18-1.99H12v3.77h5.4c-.23 1.25-.95 2.31-2.02 3v2.49h3.27c1.92-1.77 3.02-4.38 3.02-7.27z" fill="currentColor"/>
    <path d="M12 22c2.73 0 5.02-.9 6.69-2.43l-3.27-2.49c-.91.6-2.08.95-3.42.95-2.63 0-4.86-1.77-5.66-4.16H2.98v2.6A9.997 9.997 0 0012 22z" fill="currentColor" opacity=".7"/>
    <path d="M6.34 13.87a6.001 6.001 0 010-3.74V7.53H2.98a10 10 0 000 8.94l3.36-2.6z" fill="currentColor" opacity=".5"/>
    <path d="M12 5.5c1.48 0 2.81.51 3.86 1.51l2.9-2.9A9.992 9.992 0 0012 2 10 10 0 002.98 7.53l3.36 2.6C7.14 7.74 9.37 5.5 12 5.5z" fill="currentColor" opacity=".35"/>
  </svg>
)}

export default function Login(){
  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')
  const [showPwd,setShowPwd] = useState(false)
  const [remember,setRemember] = useState(false)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    if(!/^\S+@\S+\.\S+$/.test(email)) return setError('Correo inválido.')
    if(!pwd) return setError('Ingrese su contraseña.')
    try{
      setLoading(true)
      await new Promise(r=>setTimeout(r,600))
      alert('Login ok (simulado)')
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      {/* ===== Estilos embebidos ===== */}
      <style>{`
        :root{
          --bg-cream:#FAE5D5;
          --peach:#FCEFE6;
          --accent:#E76B2D;
          --brown:#592B0D;
          --text:#111111;   /* texto de los inputs en negro */
        }
        *,*::before,*::after{ box-sizing:border-box; }
        html,body,#root{ height:100%; }
        body{ margin:0; background:var(--bg-cream); font-family:system-ui,-apple-system,Inter,Segoe UI,Roboto,Ubuntu,Helvetica,Arial; }

        /* CENTRAR EN TODA LA VENTANA SÍ O SÍ */
        .auth-wrap{
          position:fixed;               /* ocupa toda la ventana */
          inset:0;                      /* top:0 right:0 bottom:0 left:0 */
          display:grid;
          place-items:center;           /* centro absoluto */
          padding:24px;
          background:var(--bg-cream);
        }
        .auth-card{
          width:520px; max-width:100%;
          background:#fff; border-radius:16px;
          box-shadow:0 6px 0 rgba(0,0,0,.15),0 16px 40px rgba(0,0,0,.08);
          padding:28px 24px;
        }

        /* Logo: sin línea debajo */
        .auth-logo{ text-align:center; margin-bottom:8px; }
        .auth-logo img{ height:62px; display:block; margin:0 auto; object-fit:contain; } /* un poco más grande */

        .auth-title{ text-align:center; margin:10px 0 18px; color:#1f2937; font-weight:700; font-size:20px; }

        .auth-label{ display:block; font-size:14px; font-weight:700; color:#4b5563; margin:14px 0 6px; }

        .input-wrap{ position:relative; }
        .input-base{
          width:100%; height:48px; background:var(--peach);
          border:1px solid #e5e7eb; border-radius:10px; outline:none; padding:10px 12px;
          font-size:14px; color:var(--text);
        }
        .input-base::placeholder{ color:#9ca3af; }

        .input-left,.input-right{ position:absolute; top:50%; transform:translateY(-50%); color:#8a8a8a; }
        .input-left{ left:12px; }
        .input-right{ right:6px; }
        .input-with-icons{ padding-left:40px; padding-right:44px; }

        .eye-btn{
          border:none; background:transparent; padding:6px 8px; border-radius:8px; cursor:pointer; color:var(--brown);
        }
        .eye-btn:hover{ color:var(--accent); background:#f8f1ec; }
        .eye-btn:focus{ outline:2px solid #f8d8c7; }

        .auth-row{ display:flex; align-items:center; justify-content:space-between; margin:10px 0 16px; }
        .link-accent{ color:var(--accent); text-decoration:none; font-size:14px; }

        .auth-error{ background:#FDE7E9; color:#B4232C; border:1px solid #F3B3B9; padding:8px 10px; border-radius:8px; font-size:13px; }

        .btn-primary{
          width:100%; height:48px; border:none; border-radius:10px;
          background:var(--accent); color:#fff; font-weight:800; cursor:pointer; margin-top:6px;
        }
        .btn-primary:hover{ filter:brightness(0.96); }

        .auth-sep{ display:flex; align-items:center; gap:12px; margin:18px 0; }
        .auth-sep .line{ flex:1; height:1px; background:#d1d5db; }
        .auth-sep .text{ font-size:12px; color:#6b7280; }

        /* Botones sociales: tamaño mayor y SVG centrado */
        .socials{ display:flex; justify-content:center; gap:22px; }
        .socials .btn{
          width:58px; height:58px;                     /* botón más grande */
          border-radius:50%;
          border:2px solid var(--accent); color:var(--accent);
          display:inline-flex; align-items:center; justify-content:center;
          background:#fff; cursor:pointer;
        }
        .socials .btn svg{ width:28px; height:28px; display:block; } /* ícono proporcional */

        .auth-bottom{ text-align:center; margin-top:14px; font-size:14px; }
        .auth-bottom .ask{ color:#111827; }
        .auth-bottom .cta{ color:var(--accent); font-weight:600; cursor:pointer; }
      `}</style>

      <div className="auth-wrap">
        <div className="auth-card">
          {/* Logo (SIN línea extra) */}
          <div className="auth-logo">
            <img src={logoUrl} alt="Logo The Revenge" />
          </div>

          <h2 className="auth-title">Inicia sesión en tu cuenta</h2>

          <form onSubmit={onSubmit}>
            {/* Email */}
            <label className="auth-label">Correo electrónico</label>
            <div className="input-wrap">
              <span className="input-left"><MailIcon/></span>
              <input
                className="input-base input-with-icons"
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <label className="auth-label">Contraseña</label>
            <div className="input-wrap">
              <span className="input-left"><LockIcon/></span>
              <input
                className="input-base input-with-icons"
                type={showPwd ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                value={pwd}
                onChange={e=>setPwd(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn input-right"
                onClick={()=>setShowPwd(s=>!s)}
                aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                title={showPwd ? 'Ocultar' : 'Mostrar'}
              >
                <EyeIcon/>
              </button>
            </div>

            {/* Recordarme + Olvidaste */}
            <div className="auth-row">
              <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:14 }}>
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
                Recordarme
              </label>
              <a href="#" className="link-accent">¿Olvidaste tu contraseña?</a>
            </div>

            {/* Error */}
            {error && <div className="auth-error">{error}</div>}

            {/* Botón principal */}
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </button>

            {/* Separador */}
            <div className="auth-sep">
              <div className="line" />
              <span className="text">O continúa con</span>
              <div className="line" />
            </div>

            {/* Redes más grandes */}
            <div className="socials" aria-label="Login social">
              <button type="button" className="btn" title="Apple" aria-label="Apple"><AppleIcon/></button>
              <button type="button" className="btn" title="Facebook" aria-label="Facebook"><FacebookIcon/></button>
              <button type="button" className="btn" title="Google" aria-label="Google"><GoogleIcon/></button>
            </div>

            {/* Pregunta final */}
            <div className="auth-bottom">
              <span className="ask">¿No tienes una cuenta? </span>
              <span className="cta">Regístrate aquí</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}