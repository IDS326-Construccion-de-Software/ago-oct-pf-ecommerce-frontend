import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'
import logoUrl from '../assets/LogoTheRevenge.svg'
import isEmail from 'validator/lib/isEmail'
import { Mail, Lock, Eye } from 'lucide-react'
import { authClient } from '../api/AuthClient'

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
  if (!isEmail(emailToCheck)) return setError('Correo inválido')
  if(!pwd) return setError('Ingrese su contraseña')
  if(pwd.length < 8) return setError('La contraseña debe tener al menos 8 caracteres')
    
    setLoading(true)
    
    try {
      const loginData = {
        email: emailToCheck,
        password: pwd
      }
      
      console.log('Intentando iniciar sesión...')
      
      const result = await authClient.login(loginData)
      
      if (result.success) {
        console.log('Login exitoso:', result.data)
        
        // Guardar tokens y datos del usuario
        const tokens = result.data.tokens
        if (tokens?.access_token) {
          localStorage.setItem('access_token', tokens.access_token)
          // Back-compat with services/orderService which reads 'authToken'
          localStorage.setItem('authToken', tokens.access_token)
        }
        if (tokens?.id_token) {
          localStorage.setItem('id_token', tokens.id_token)
        }
        
        // Crear objeto de usuario para el contexto
        const userData = {
          email: emailToCheck,
          name: emailToCheck.split('@')[0], // Usamos la parte del email como nombre temporal
          token: tokens.access_token
        }
        
        login(userData)
        navigate('/')
      } else {
        console.error('Error en login:', result.error)
        setError(result.error.message || 'Credenciales inválidas o usuario no verificado.')
      }
    } catch (err) {
      console.error('Error inesperado:', err)
      setError('Error inesperado. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logoUrl} alt="Logo The Revenge" />
        </div>

  <h2 className="auth-title">Inicia sesión</h2>

        <form onSubmit={onSubmit}>
          <label className="auth-label" htmlFor="login-email">Correo electrónico</label>
          <div className="input-wrap" style={{ marginBottom: 18 }}>
            <span className="input-left"><Mail size={18}/></span>
            <input
              className="input-base input-with-icons"
              type="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              autoComplete="email"
              id="login-email"
            />
          </div>

          <label className="auth-label" htmlFor="login-password">Contraseña</label>
          <div className="input-wrap" style={{ marginBottom: 18 }}>
            <span className="input-left"><Lock size={18}/></span>
            <input
              className="input-base input-with-icons"
              type={showPwd ? 'text' : 'password'}
              placeholder="Ingrese su contraseña"
              value={pwd}
              onChange={e=>setPwd(e.target.value)}
              autoComplete="current-password"
              id="login-password"
            />
            <button
              type="button"
              className="eye-btn input-right"
              onClick={()=>setShowPwd(s=>!s)}
              aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              aria-pressed={showPwd}
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

          <button type="submit" className="btn-primary" disabled={loading} aria-label="Iniciar sesión">
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </button>

          <div className="auth-sep">
            <div className="line" />
            <span className="text">O continúa con</span>
            <div className="line" />
          </div>


          <div className="auth-bottom">
            <span className="ask">¿No tienes una cuenta? </span>
            <Link
              to="/register"
              className="cta"
              style={{ color: "#EC6426", textDecoration: "underline" }}
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
