import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'; // <-- Import your AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <-- Wrap App in AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)