import { X, Tag, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/LogoTheRevenge.svg';
import PaymentForm from './PaymentForm';
import '../styles/PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, total, cartItems }) => {
  const navigate = useNavigate();

  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;

  // 🧭 Función que redirige al checkout con los datos del pedido
  const handleProceedToCheckout = () => {
    // Cierra el modal
    onClose();

    // Navega al checkout con los datos del carrito
    navigate('/checkout', {
      state: {
        cartItems,
        cartTotal: total,
        source: 'buy-now',
      },
    });
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cierre */}
        <button className="payment-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Encabezado */}
        <header className="payment-modal-header">
          <img src={logo} alt="The Revenge Logo" className="payment-modal-logo" />
          <h1>The Revenge - Pago Seguro</h1>
          <p>Tu socio de confianza en pagos seguros</p>
        </header>

        {/* Contenido */}
        <div className="payment-modal-content">
          {/* Izquierda: formulario */}
          <div className="payment-modal-left">
            <PaymentForm onPaymentSuccess={() => console.log('Formulario de pago cargado.')} />
          </div>

          {/* Derecha: resumen del pedido */}
          <div className="payment-modal-right">
            {/* Código de descuento */}
            <div className="payment-card">
              <h3><Tag size={20} /> Código de Descuento</h3>
              <div className="discount-input-wrapper">
                <input type="text" placeholder="Ingresa tu código" />
                <button>Aplicar</button>
              </div>
            </div>

            {/* Resumen de la orden */}
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
              <div className="order-summary-total">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            {/* Botón para proceder al checkout */}
            <button
              className="pay-button"
              disabled={!total}
              onClick={handleProceedToCheckout}
            >
              Pagar ${total.toFixed(2)}
            </button>

            {/* Nota de seguridad */}
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
