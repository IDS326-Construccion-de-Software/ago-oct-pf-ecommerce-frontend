import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/PaymentSuccess.css'; // Reutilizamos los estilos existentes

const PaymentSuccessModal = ({ paymentData, onClose }) => {
  const navigate = useNavigate();

  if (!paymentData) return null;

  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(paymentData.date));

  const handleCloseAndNavigate = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="payment-modal-overlay" onClick={handleCloseAndNavigate}>
      <div className="payment-success-card" onClick={(e) => e.stopPropagation()}>
        <div className="payment-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h1>¡Pago Exitoso!</h1>
        <p>Tu transacción ha sido procesada correctamente</p>
        <hr />
        <div className="payment-details">
          <div className="detail-row">
            <span>Referencia:</span>
            <span>{paymentData.reference}</span>
          </div>
          <div className="detail-row">
            <span>Fecha:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="detail-row">
            <span>Método de pago:</span>
            <span>{paymentData.method}</span>
          </div>
          <div className="detail-row">
            <span>Titular:</span>
            <span>{paymentData.cardholder}</span>
          </div>
          <div className="total-row">
            <strong>Total pagado:</strong>
            <strong>${paymentData.amount.toFixed(2)}</strong>
          </div>
        </div>
        <p className="confirmation-email">Recibirás un correo de confirmación con los detalles de tu compra</p>
        <button className="another-payment-button" onClick={handleCloseAndNavigate}>Realizar otro pago</button>
        <div className="footer-text">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Transacción protegida por <strong>The Revenge</strong></span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
