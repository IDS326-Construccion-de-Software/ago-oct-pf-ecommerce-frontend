import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import logoUrl from '../assets/LogoTheRevenge.svg'
import isEmail from 'validator/lib/isEmail'
import { Mail, Lock, Eye } from 'lucide-react'

export default function Login(){
  const [email,setEmail] = useState('')
  const [pwd,setPwd] = useState('')
  const [showPwd,setShowPwd] = useState(false)
  const [remember,setRemember] = useState(false)
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setError('')
    const emailToCheck = email.trim()
    if (!isEmail(emailToCheck)) return setError('Correo inválido.')
    if(!pwd) return setError('Ingrese su contraseña.')
    const fakeUser = { id: 1, email, name: 'User', token: 'demo' }
    login(fakeUser)
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      navigate('/')
    }, 500)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logoUrl} alt="Logo The Revenge" />
        </div>

        <h2 className="auth-title">Inicia sesión en tu cuenta</h2>

        <form onSubmit={onSubmit}>
          <label className="auth-label">Correo electrónico</label>
          <div className="input-wrap" style={{ marginBottom: 18 }}>
            <span className="input-left"><Mail size={18}/></span>
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
          <div className="input-wrap" style={{ marginBottom: 18 }}>
            <span className="input-left"><Lock size={18}/></span>
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
            >
              <Eye size={20}/>
            </button>
          </div>

          <div className="auth-row" style={{ marginBottom: 18 }}>
            <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:14 }}>
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
              Recordarme
            </label>
            <button
              type="button"
              className="link-accent"
              onClick={() => navigate('/new-password')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </button>

          <div className="auth-sep">
            <div className="line" />
            <span className="text">O continúa con</span>
            <div className="line" />
          </div>


          <div className="auth-bottom">
            <span className="ask">¿No tienes una cuenta? </span>
            <span
              className="cta"
              style={{ cursor: "pointer", color: "#EC6426", textDecoration: "underline" }}
              onClick={() => navigate('/register')}
            >
              Regístrate aquí
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
