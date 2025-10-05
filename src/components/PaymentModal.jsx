import { X, Tag, ShieldCheck } from 'lucide-react';
import logo from '../assets/LogoTheRevenge.svg';
import PaymentForm from './PaymentForm';
import '../styles/PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, total, cartItems }) => {
  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="payment-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <header className="payment-modal-header">
          <img src={logo} alt="The Revenge Logo" className="payment-modal-logo" />
          <h1>The Revenge - Pago Seguro</h1>
          <p>Tu socio de confianza en pagos seguros</p>
        </header>

        <div className="payment-modal-content">
          <div className="payment-modal-left">
            <PaymentForm onPaymentSuccess={() => console.log('Pago exitoso!')} />
          </div>
          <div className="payment-modal-right">
            <div className="payment-card">
              <h3><Tag size={20} /> Código de Descuento</h3>
              <div className="discount-input-wrapper">
                <input type="text" placeholder="Ingresa tu código" />
                <button>Aplicar</button>
              </div>
            </div>
            <div className="payment-card">
              <h3>Resumen del Pedido</h3>
              <ul className="order-summary-list">
                {cartItems.map(item => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="order-summary-total">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
            <button className="pay-button" disabled={!total}>
              Pagar ${total.toFixed(2)}
            </button>
            <div className="payment-footer-note">
              <ShieldCheck size={14} />
              <span>Transacción segura y encriptada. Protegido por SSL de 256 bits.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentModal;
