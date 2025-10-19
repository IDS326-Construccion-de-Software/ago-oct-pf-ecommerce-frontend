import { useContext } from 'react';
import { X, Tag, ShieldCheck } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import logo from '../assets/LogoTheRevenge.svg';
import PaymentForm from './PaymentForm';
import '../styles/PaymentModal.css';
import { redirectToStripePaymentLink } from "../services/stripeRedirect";

const PaymentModal = ({ isOpen, onClose, total, cartItems }) => {
  const {
    setIsPaymentModalOpen,
    setIsConfirmationModalOpen,
    setLatestOrder,
    clearCart,
  } = useContext(CartContext);

  const subtotal = total;
  const taxes = subtotal * 0.18;
  const finalTotal = subtotal + taxes;

  if (!isOpen) return null;

  const handlePaymentSuccess = (paymentData) => {
    const order = {
      id: `REF-${Date.now()}`,
      date: new Date(),
      total: finalTotal, // Usar el total final con impuestos
      items: cartItems,
      paymentMethod: paymentData.method,
      cardLast4: paymentData.cardNumber.slice(-4),
      cardHolder: paymentData.cardName,
    };

    setLatestOrder(order);
    clearCart();
    setIsPaymentModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

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
            <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
          </div>

          <div className="payment-modal-right">
            <div className="payment-card">
                <button className="nl-btn" style={{ width: '100%', marginBottom: 12 }} onClick={() => redirectToStripePaymentLink()}>
                  Pagar con Stripe (Redirección)
                </button>
              <h3><Tag size={20} /> Código de Descuento</h3>
              <div className="discount-input-wrapper">
                <input type="text" placeholder="Ingresa tu código" />
                <button>Aplicar</button>
              </div>
            </div>

            <div className="payment-card">
              <h3>Resumen del Pedido</h3>
              <ul className="order-summary-list">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="order-summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Impuestos (18%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>
              <div className="order-summary-total">
                <strong>Total</strong>
                <strong>${finalTotal.toFixed(2)}</strong>
              </div>
            </div>

            {/* El botón de pago ahora está dentro de PaymentForm */}
            {/* y llamará a onPaymentSuccess con los datos del formulario */}

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
