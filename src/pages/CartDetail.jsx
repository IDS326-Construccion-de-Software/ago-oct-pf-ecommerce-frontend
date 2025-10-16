import "../styles/CartDetail.css";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItemsList from "../components/CartItemsList";

export default function CartDetail() {
  const { cartItems, setIsPaymentModalOpen } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const taxes = subtotal * 0.18; 
  const total = subtotal + taxes;

  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="cart-detail-container">
        <div className="left-section">
          <div className="criteria-box">
            <h2>Criterios de sustitución</h2>
            <div className="criteria-options">
              <label>
                <input type="radio" name="criterio" value="contactar" />
                Contactar
              </label>
              <label>
                <input type="radio" name="criterio" value="desestimar" />
                Desestimar
              </label>
            </div>
          </div>

          <div className="items-box">
            <h3>Productos en el carrito</h3>
            <CartItemsList />
          </div>
        </div>

        <div className="right-section">
          <h2>Aplicar cupón</h2>
          <div className="coupon-box">
            <input type="text" placeholder="Introduce tu cupón" />
            <button>Aplicar</button>
          </div>
            <div className="summary-box">
              <h3>Resumen de la compra</h3>
              <hr />

              <div className="summary-line">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-line">
                <span>Impuestos (18 %):</span>
                <span>${taxes.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>

              <br />

              <div className="summary-line total">
                <span>Total:</span>
                <span>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>

              <button className="checkout-btn" onClick={handleProceedToPayment}>Proceder al pago</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
