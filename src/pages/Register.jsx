import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import logoUrl from '../assets/LogoTheRevenge.svg'
import isEmail from 'validator/lib/isEmail'

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
function UserIcon(){ return (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)}
function EyeIcon(){ return (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)}

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    const cleanEmail = email.trim()
    if (!name.trim()) return setError('Ingrese su nombre.')
    if (!isEmail(cleanEmail)) return setError('Correo electrónico inválido.')
    if (!pwd) return setError('Ingrese una contraseña.')
    if (pwd.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    if (pwd !== confirmPwd) return setError('Las contraseñas no coinciden.')

    setLoading(true)
    const fakeUser = { id: Date.now(), name, email, token: 'demo' }
    login(fakeUser)
    setTimeout(()=>{
      setLoading(false)
      navigate('/')
    }, 800)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logoUrl} alt="Logo The Revenge" />
        </div>

        <h2 className="auth-title">Crea tu cuenta</h2>

        <form onSubmit={onSubmit}>
          <label className="auth-label">Nombre completo</label>
          <div className="input-wrap">
            <span className="input-left"><UserIcon/></span>
            <input
              className="input-base input-with-icons"
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={e=>setName(e.target.value)}
              autoComplete="name"
            />
          </div>

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

          <label className="auth-label">Contraseña</label>
          <div className="input-wrap">
            <span className="input-left"><LockIcon/></span>
            <input
              className="input-base input-with-icons"
              type={showPwd ? 'text' : 'password'}
              placeholder="Cree una contraseña"
              value={pwd}
              onChange={e=>setPwd(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="eye-btn input-right"
              onClick={()=>setShowPwd(s=>!s)}
            >
              <EyeIcon/>
            </button>
          </div>

          <label className="auth-label">Confirmar contraseña</label>
          <div className="input-wrap">
            <span className="input-left"><LockIcon/></span>
            <input
              className="input-base input-with-icons"
              type={showPwd ? 'text' : 'password'}
              placeholder="Repita su contraseña"
              value={confirmPwd}
              onChange={e=>setConfirmPwd(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Registrarse'}
          </button>

          <div className="auth-bottom">
            <span className="ask">¿Ya tienes una cuenta? </span>
            <span className="cta" onClick={()=>navigate('/login')}>Inicia sesión</span>
          </div>
        </form>
      </div>
    </div>
  )
}
