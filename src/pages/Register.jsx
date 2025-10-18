import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import logoUrl from '../assets/LogoTheRevenge.svg'
import isEmail from 'validator/lib/isEmail'
import { User, Mail, Lock, Phone, MapPin, Eye } from 'lucide-react'

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Paso 1: nombre, email, contraseña
  function handleStep1Submit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim()) return setError('Ingrese su nombre.')
    if (!isEmail(email.trim())) return setError('Correo electrónico inválido.')
    if (!pwd) return setError('Ingrese una contraseña.')
    if (pwd.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    if (pwd !== confirmPwd) return setError('Las contraseñas no coinciden.')
    setError('')
    setCurrentStep(2)
  }

  // Paso 2: teléfono, dirección
  async function handleStep2Submit(e) {
    e.preventDefault()
    setError('')
    if (!phone.trim()) return setError('Ingrese su número de teléfono.')
    if (!address.trim()) return setError('Ingrese su dirección.')
    setLoading(true)
    const fakeUser = { id: Date.now(), name, email, phone, address, token: 'demo' }
    login(fakeUser)
    setTimeout(() => {
      setLoading(false)
      // Activa el modal como en SettingPage: navega y muestra modal tras registro exitoso
      navigate('/', { state: { showSuccessModal: true, successTitle: "¡Registro exitoso!", successMessage: "Tu cuenta ha sido creada correctamente." } });
    }, 800)
  }

  const goBackToStep1 = () => {
    setCurrentStep(1)
    setError('')
  }

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit}>
      <label className="auth-label">Nombre completo</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><User size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="text"
          placeholder="Ingrese su nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <label className="auth-label">Correo electrónico</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Mail size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <label className="auth-label">Contraseña</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Lock size={18} /></span>
        <input
          className="input-base input-with-icons"
          type={showPwd ? 'text' : 'password'}
          placeholder="Cree una contraseña"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="eye-btn input-right"
          onClick={() => setShowPwd(s => !s)}
        >
          <Eye size={20} />
        </button>
      </div>

      <label className="auth-label">Confirmar contraseña</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Lock size={18} /></span>
        <input
          className="input-base input-with-icons"
          type={showPwd ? 'text' : 'password'}
          placeholder="Repita su contraseña"
          value={confirmPwd}
          onChange={e => setConfirmPwd(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={loading}>
        Siguiente
      </button>

      <div className="auth-bottom">
        <span className="ask">¿Ya tienes una cuenta? </span>
        <span className="cta" onClick={() => navigate('/login')}>Inicia sesión</span>
      </div>
    </form>
  )

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit}>
      <label className="auth-label">Número de teléfono</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Phone size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="tel"
          placeholder="Ingrese su número de teléfono"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </div>

      <label className="auth-label">Dirección</label>
      <div className="input-wrap" style={{ marginBottom: 32 }}>
        <span className="input-left"><MapPin size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="text"
          placeholder="Ingrese su dirección"
          value={address}
          onChange={e => setAddress(e.target.value)}
          autoComplete="street-address"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Registrando…' : 'Registrarse'}
      </button>

      <div className="auth-bottom">
        <span className="ask">¿Ya tienes una cuenta? </span>
        <span className="cta" onClick={() => navigate('/login')}>Inicia sesión</span>
      </div>
      <button type="button" className="back-arrow" onClick={goBackToStep1}>
        ← Volver
      </button>
    </form>
  )

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logoUrl} alt="Logo The Revenge" />
        </div>
        <h2 className="auth-title">Crea tu cuenta</h2>
        <div className="progress">
          <span className={`dot ${currentStep === 1 ? 'active' : ''}`} />
          <div className="line" />
          <span className={`dot ${currentStep === 2 ? 'active' : ''}`} />
        </div>
        {currentStep === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  )
}
