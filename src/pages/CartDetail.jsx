import "../styles/CartDetail.css";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Plus, Minus, X } from "lucide-react";
import CartItemsList from "../components/CartItemsList";

export default function CartDetail() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const taxes = subtotal * 0.18; // 18% de ITBIS, por ejemplo
  const total = subtotal + taxes;

  return (
    <div>
      <Header />
      <div className="cart-detail-container">
        {/* --- COLUMNA IZQUIERDA --- */}
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

        {/* --- COLUMNA DERECHA --- */}
        <div className="right-section">
          <h2>Aplicar cupón</h2>
          <div className="coupon-box">
            <input type="text" placeholder="Introduce tu cupón" />
            <button>Aplicar</button>
          </div>

          <div className="summary-box">
            <h3>Resumen de la compra</h3>
            <p>Subtotal: ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <p>Impuestos (18 %): ${taxes.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            <hr />
            <p className="total">
              Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <button className="checkout-btn">Proceder al pago</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
