import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'
import logoUrl from '../assets/LogoTheRevenge.svg'
import isEmail from 'validator/lib/isEmail'
import { User, Mail, Lock, Phone, Eye, Calendar, CreditCard } from 'lucide-react'
import { authClient } from '../api/AuthClient'

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [numIdentification, setNumIdentification] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useAuth()
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

  // Paso 2: teléfono, fecha de nacimiento, número de identificación
  async function handleStep2Submit(e) {
    e.preventDefault()
    setError('')
    
    // Validaciones opcionales
    if (phone && phone.length < 8) {
      return setError('El número de teléfono debe tener al menos 8 dígitos.')
    }
    
    if (numIdentification && numIdentification.length < 5) {
      return setError('El número de identificación debe tener al menos 5 dígitos.')
    }
    
    setLoading(true)
    
    try {
      // Preparar datos para el registro
      const registerData = {
        name,
        email,
        password: pwd,
        cellphone: phone || null,
        birthdate: birthdate || null,
        numIdentification: numIdentification ? Number.parseInt(numIdentification, 10) : null
      }
      
      console.log('Registrando usuario:', registerData)
      
      const result = await authClient.register(registerData)
      
      if (result.success) {
        console.log('Registro exitoso:', result.data)
        navigate('/', { 
          state: { 
            showSuccessModal: true, 
            successTitle: "¡Registro exitoso!", 
            successMessage: result.data.message || "Tu cuenta ha sido creada. Por favor, verifica tu email." 
          } 
        })
      } else {
        console.error('Error en registro:', result.error)
        setError(result.error.message || 'Error al registrar usuario.')
      }
    } catch (err) {
      console.error('Error inesperado:', err)
      setError('Error inesperado. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const goBackToStep1 = () => {
    setCurrentStep(1)
    setError('')
  }

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit}>
      <label className="auth-label" htmlFor="register-name">Nombre completo</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><User size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="text"
          placeholder="Ingrese su nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete="name"
          id="register-name"
        />
      </div>

      <label className="auth-label" htmlFor="register-email">Correo electrónico</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Mail size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          id="register-email"
        />
      </div>

      <label className="auth-label" htmlFor="register-password">Contraseña</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Lock size={18} /></span>
        <input
          className="input-base input-with-icons"
          type={showPwd ? 'text' : 'password'}
          placeholder="Cree una contraseña"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          autoComplete="new-password"
          id="register-password"
        />
        <button
          type="button"
          className="eye-btn input-right"
          onClick={() => setShowPwd(s => !s)}
          aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={showPwd}
        >
          <Eye size={20} />
        </button>
      </div>

      <label className="auth-label" htmlFor="register-password-confirm">Confirmar contraseña</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Lock size={18} /></span>
        <input
          className="input-base input-with-icons"
          type={showPwd ? 'text' : 'password'}
          placeholder="Repita su contraseña"
          value={confirmPwd}
          onChange={e => setConfirmPwd(e.target.value)}
          autoComplete="new-password"
          id="register-password-confirm"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={loading}>
        Siguiente
      </button>

      <div className="auth-bottom">
        <span className="ask">¿Ya tienes una cuenta? </span>
        <Link className="cta" to="/login">Inicia sesión</Link>
      </div>
    </form>
  )

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit}>
      <label className="auth-label" htmlFor="register-phone">Número de teléfono (opcional)</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Phone size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="tel"
          placeholder="Ingrese su teléfono"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          autoComplete="tel"
          id="register-phone"
        />
      </div>

      <label className="auth-label" htmlFor="register-birthdate">Fecha de nacimiento (opcional)</label>
      <div className="input-wrap" style={{ marginBottom: 18 }}>
        <span className="input-left"><Calendar size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="date"
          placeholder="YYYY-MM-DD"
          value={birthdate}
          onChange={e => setBirthdate(e.target.value)}
          autoComplete="bday"
          id="register-birthdate"
        />
      </div>

      <label className="auth-label" htmlFor="register-id">Número de identificación (opcional)</label>
      <div className="input-wrap" style={{ marginBottom: 32 }}>
        <span className="input-left"><CreditCard size={18} /></span>
        <input
          className="input-base input-with-icons"
          type="text"
          placeholder="Ej: 01234567-8"
          value={numIdentification}
          onChange={e => setNumIdentification(e.target.value)}
          autoComplete="off"
          id="register-id"
        />
      </div>

      {error && <div className="auth-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Registrando…' : 'Registrarse'}
      </button>

      <div className="auth-bottom">
        <span className="ask">¿Ya tienes una cuenta? </span>
        <Link className="cta" to="/login">Inicia sesión</Link>
      </div>
      <button type="button" className="back-arrow" onClick={goBackToStep1} aria-label="Volver al paso anterior">
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
