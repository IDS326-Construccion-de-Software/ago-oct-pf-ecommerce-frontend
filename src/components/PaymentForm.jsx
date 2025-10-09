import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, Tag } from 'lucide-react';
import '../styles/PaymentForm.css';

const detectCardType = (number) => {
  const cleaned = number.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'VISA';
  if (/^5[1-5]/.test(cleaned)) return 'MASTERCARD';
  if (/^3[47]/.test(cleaned)) return 'AMEX';
  return null;
};

const PaymentForm = ({ onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    try {
      // Aquí iría la lógica real de procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 1500));
      onPaymentSuccess();
      navigate('/payment/success');
    } catch (error) {
      console.error('Error procesando el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <form onSubmit={handleSubmit} className="payment-form-container">
      <div className="pf-section">
        <h3 className="pf-section-title">Método de Pago</h3>
        <div className="pf-method-options">
          <button type="button" className={`pf-method-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
            <CreditCard size={20} /> Tarjeta
          </button>
          <button type="button" className={`pf-method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('wallet')}>
            <Tag size={20} /> Wallet
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="pf-section pf-card-details">
          <div className="pf-input-group">
            <label htmlFor="cardNumber">Número de Tarjeta</label>
            <input 
              type="text" 
              id="cardNumber" 
              placeholder="1234 5678 9012 3456" 
              value={cardNumber} 
              onChange={(e) => {
                setCardNumber(e.target.value);
                setCardType(detectCardType(e.target.value));
              }}
              required 
            />
            {cardType && <div className="pf-card-type">{cardType}</div>}
          </div>
          <div className="pf-input-group">
            <label htmlFor="cardName">Nombre del Titular</label>
            <input type="text" id="cardName" placeholder="Juan Pérez" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
          </div>
          <div className="pf-row">
            <div className="pf-input-group">
              <label htmlFor="expiryMonth">Mes</label>
              <input type="text" id="expiryMonth" placeholder="MM" value={expiry} onChange={(e) => setExpiry(e.target.value.split('/')[0] || '')} required />
            </div>
            <div className="pf-input-group">
              <label htmlFor="expiryYear">Año</label>
              <input type="text" id="expiryYear" placeholder="AA" value={expiry.split('/')[1] || ''} onChange={(e) => setExpiry(expiry.split('/')[0] + '/' + e.target.value)} required />
            </div>
            <div className="pf-input-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'wallet' && (
        <div className="pf-section pf-wallet-details">
          <p>Próximamente: Paga con tu wallet digital.</p>
        </div>
      )}

      <div className="pf-security-badges">
        <span className="pf-badge"><ShieldCheck size={14} /> SSL Seguro</span>
        <span className="pf-badge">Verificado</span>
        <span className="pf-badge">Encriptado</span>
      </div>
    </form>
  );
};

export default PaymentForm;
