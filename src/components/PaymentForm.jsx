import { useState, forwardRef } from 'react';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, Wallet } from 'lucide-react';
import '../styles/PaymentForm.css';

const detectCardType = (number) => {
  const cleaned = number.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'VISA';
  if (/^5[1-5]/.test(cleaned)) return 'MASTERCARD';
  if (/^3[47]/.test(cleaned)) return 'AMEX';
  return null;
};

const PaymentForm = ({ onPaymentSuccess, total }, ref) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
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

      const paymentData = {
        reference: `REF-${Date.now()}`,
        date: new Date(),
        method: `Tarjeta **** ${cardNumber.slice(-4)}`,
        cardholder: cardName,
        amount: total,
      };

      onPaymentSuccess(paymentData);
            // La redirección ya se maneja en PaymentModal, por lo que esta línea es redundante.
      // navigate('/payment-success');
    } catch (error) {
      console.error('Error procesando el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
        <form ref={ref} onSubmit={handleSubmit} className="payment-form-container">
      <div className="pf-section">
        <h3 className="pf-section-title">Método de Pago</h3>
        <div className="pf-method-options">
          <button type="button" className={`pf-method-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
            <CreditCard size={20} /> Tarjeta
          </button>
          <button type="button" className={`pf-method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('wallet')}>
            <Wallet size={20} /> Wallet
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="pf-section pf-card-details">
          <div className="pf-input-group">
            <label htmlFor="cardNumber">Número de Tarjeta</label>
            <PatternFormat
              id="cardNumber"
              format="#### #### #### ####"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onValueChange={(values) => {
                setCardNumber(values.value);
                setCardType(detectCardType(values.value));
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
              <PatternFormat
                id="expiryMonth"
                format="##"
                placeholder="MM"
                value={expiryMonth}
                onValueChange={(values) => setExpiryMonth(values.value)}
                required
              />
            </div>
            <div className="pf-input-group">
              <label htmlFor="expiryYear">Año</label>
              <PatternFormat
                id="expiryYear"
                format="##"
                placeholder="AA"
                value={expiryYear}
                onValueChange={(values) => setExpiryYear(values.value)}
                required
              />
            </div>
            <div className="pf-input-group">
              <label htmlFor="cvv">CVV</label>
              <PatternFormat
                id="cvv"
                format="###"
                placeholder="123"
                value={cvv}
                onValueChange={(values) => setCvv(values.value)}
                required
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === 'wallet' && (
        <div className="pf-section pf-wallet-details">
          <div className="pf-wallet-header">
            <Wallet size={40} className="pf-wallet-icon" />
            <p>Selecciona tu wallet digital preferida</p>
          </div>
          <div className="pf-wallet-options">
            <button type="button" className="pf-wallet-btn">PayPal</button>
            <button type="button" className="pf-wallet-btn">Apple Pay</button>
            <button type="button" className="pf-wallet-btn">Google Pay</button>
            <button type="button" className="pf-wallet-btn">Samsung Pay</button>
          </div>
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

export default forwardRef(PaymentForm);
