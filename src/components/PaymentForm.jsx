import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import { CreditCard, ShieldCheck, Tag, Wallet } from 'lucide-react';
import '../styles/PaymentForm.css';

// Spinner component for loading feedback
const Spinner = () => <div className="spinner"></div>;

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
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      // Simular llamada a API de pago
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let paymentData = {};
      if (paymentMethod === 'card') {
        paymentData = { method: 'Tarjeta', cardNumber, cardName, expiry: `${expiryMonth}/${expiryYear}` };
      } else if (paymentMethod === 'wallet') {
        paymentData = { method: selectedWallet, cardName: 'N/A', cardNumber: '****' };
      }

      onPaymentSuccess({ cardNumber, cardName, expiry: `${expiryMonth}/${expiryYear}`, cvv });

    } catch (error) {
      console.error('Error procesando el pago:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error en el Pago!',
        text: 'No se pudo procesar tu pago. Por favor, intenta de nuevo.',
        confirmButtonColor: '#f08c5b'
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
            <PatternFormat
              id="cardNumber"
              format="#### #### #### ####"
              placeholder="1234 5678 9012 3456"
              mask="_"
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
                mask={['M', 'M']}
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
                placeholder="YY"
                mask={['Y', 'Y']}
                value={expiryYear}
                onValueChange={(values) => setExpiryYear(values.value)}
                required
              />
            </div>
            <div className="pf-input-group">
              <label htmlFor="cvv">CVV</label>
              <PatternFormat
                id="cvv"
                format="####"
                placeholder="123"
                mask="_"
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
          <div className="pf-wallet-prompt">
            <Wallet size={22} />
            <p>Selecciona tu wallet digital preferida</p>
          </div>
          <div className="pf-wallet-options">
            {['PayPal', 'Apple Pay', 'Google Pay', 'Samsung Pay'].map(wallet => (
              <button 
                key={wallet}
                type="button" 
                className={`pf-wallet-btn ${selectedWallet === wallet ? 'active' : ''}`}
                onClick={() => setSelectedWallet(wallet)}
              >
                {wallet}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pf-security-badges">
        <span className="pf-badge"><ShieldCheck size={14} /> SSL Seguro</span>
        <span className="pf-badge">Verificado</span>
        <span className="pf-badge">Encriptado</span>
      </div>

      <button 
        type="submit" 
        className="pay-button" 
        disabled={isProcessing || (paymentMethod === 'wallet' && !selectedWallet)}
      >
        {isProcessing ? (
          <><Spinner /> Procesando...</>
        ) : 'Pagar'}
      </button>
    </form>
  );
};

export default PaymentForm;
