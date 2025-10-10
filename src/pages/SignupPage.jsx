import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Logo from '../assets/LogoTheRevenge.svg';
import '../styles/Signup.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    idCard: '',
    address: '',
    birthDate: { day: '', month: '', year: '' }
  });

  // Paso 1 (Nombre, Email, Password)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Paso 2 (Teléfono, Cumpleaños, Cédula, Dirección)
  const [phone, setPhone] = useState('');
  const [idCard, setIdCard] = useState('');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [errors, setErrors] = useState({});

  const handleStep1Submit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    // Validacion de contraseña
    const passwordRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;
    if (!passwordRule.test(password) || password.length < 8) {
      newErrors.password = 'Password must be ≥8 characters, include uppercase, lowercase, number and special character';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSignupData(prev => ({ ...prev, name, email, password }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validacion de teléfono
    const digits = phone.replace(/[^\d]/g, '');
    if (digits.length > 11 || digits.length < 7) {
      newErrors.phone = 'Phone must have between 7 and 11 digits';
    }

    // Validacion de cumpleaños
    if (!day || !month || !year) {
      newErrors.birthday = 'Please select day, month and year';
    } else {
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);
      const date = new Date(y, m - 1, d);
      if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        newErrors.birthday = 'Invalid date';
      }
    }

    // Validacion de cedula
    const idDigits = idCard.replace(/[^\d]/g, '');
    if (idDigits.length !== 11) {
      newErrors.idCard = 'ID card must contain 11 numbers';
    }

    if (!address.trim() || address.trim().length > 50) {
      newErrors.address = 'Address required (max 50 characters)';
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const birthdayStr = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
    
    const completeData = {
      ...signupData,
      phone,
      birthday: birthdayStr,
      idCard,
      address,
      birthDate: { day, month, year }
    };

    // Muestra el registro exitoso con SweetAlert2
    Swal.fire({
      title: 'Registration Complete!',
      text: 'Your account has been created successfully.',
      icon: 'success',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#ff6b35'
    }).then(() => {
      navigate('/');
    });
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const renderStep1 = () => (
    <form className="form" onSubmit={handleStep1Submit}>
      <div>
        <div className="field-label">Full Name</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21c1.5-4 6-6 9-6s7.5 2 9 6" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            inputMode="text" 
            value={name} 
            onChange={e => setName(e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))} 
            placeholder="Example: John Rodriguez" 
          />
        </div>
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div>
        <div className="field-label">Email</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.5v11c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-11" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 6.5L12 13 3 6.5" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Example: john.rodriguez@email.com" 
          />
        </div>
        {errors.email && <div className="error-text">{errors.email}</div>}
      </div>

      <div>
        <div className="field-label">Password</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="10" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/>
            <path d="M7 11V8a5 5 0 0110 0v3" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="************************" 
          />
          <button 
            type="button" 
            className="eye" 
            onClick={() => setShowPassword(s => !s)} 
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a17.3 17.3 0 014.12-5.13M1 1l22 22" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#6b4a3a" strokeWidth="1.2"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <div className="error-text">{errors.password}</div>}
      </div>

      <div className="actions">
        <button className="btn" type="submit">Continue</button>
      </div>

      <div className="social-row">
        <div className="login-link">
          Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Sign in here</a>
        </div>
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form className="form" onSubmit={handleStep2Submit}>
      <div>
        <div className="field-label">Phone</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h4l2 7-3 1a16 16 0 009 9l1-3 7 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="tel" 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            placeholder="+1-829-123-4567" 
          />
        </div>
        {errors.phone && <div className="error-text">{errors.phone}</div>}
      </div>

      <div>
        <div className="field-label">Date of Birth</div>
        <div className="date-selectors">
          <select 
            className="date-selector day-selector" 
            value={day} 
            onChange={e => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {Array.from({length: 31}, (_, i) => (
              <option key={i+1} value={i+1}>{i+1}</option>
            ))}
          </select>
          <select 
            className="date-selector month-selector" 
            value={month} 
            onChange={e => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ].map((monthName, i) => (
              <option key={i+1} value={i+1}>{monthName}</option>
            ))}
          </select>
          <select 
            className="date-selector year-selector" 
            value={year} 
            onChange={e => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {Array.from({length: 100}, (_, i) => {
              const yr = new Date().getFullYear() - i;
              return <option key={yr} value={yr}>{yr}</option>
            })}
          </select>
        </div>
        {errors.birthday && <div className="error-text">{errors.birthday}</div>}
      </div>

      <div>
        <div className="field-label">ID Card</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="#6b4a3a" strokeWidth="1.2"/>
            <path d="M7 8h.01M7 12h.01M7 16h.01M11 8h6M11 12h6M11 16h6" stroke="#6b4a3a" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input 
            type="text" 
            value={idCard} 
            onChange={e => setIdCard(e.target.value.replace(/[^\d-]/g, ''))} 
            placeholder="000-0000000-0" 
          />
        </div>
        {errors.idCard && <div className="error-text">{errors.idCard}</div>}
      </div>

      <div>
        <div className="field-label">Address</div>
        <div className="input">
          <svg className="icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#6b4a3a" strokeWidth="1.2"/>
            <circle cx="12" cy="10" r="3" stroke="#6b4a3a" strokeWidth="1.2"/>
          </svg>
          <input 
            type="text" 
            value={address} 
            onChange={e => setAddress(e.target.value)} 
            placeholder="Main Street #123, City" 
          />
        </div>
        {errors.address && <div className="error-text">{errors.address}</div>}
      </div>

      <div className="actions">
        <button className="btn" type="submit">Complete Registration</button>
      </div>
    </form>
  );

  return (
    <>
      <Header />
      <div className="registro-container">
        <div className="card">
          {currentStep === 2 && (
            <button type="button" className="back-arrow" onClick={goBackToStep1}>
              ← Back
            </button>
          )}
          
          <div className="logo-section">
            <img src={Logo} alt="The Revenge" className="registro-logo" />
          </div>

          <p className="subtitle">User Registration</p>

          <div className="progress">
            <span className={`dot ${currentStep === 1 ? 'active' : ''}`} />
            <div className="line" />
            <span className={`dot ${currentStep === 2 ? 'active' : ''}`} />
          </div>

          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </>
  );
}