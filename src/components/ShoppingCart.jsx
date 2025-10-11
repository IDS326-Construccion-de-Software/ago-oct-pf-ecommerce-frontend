import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/ShoppingCart.css";
import Modal from "./Modal";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartItemList from "../components/CartItemsList"; 

export default function ShoppingCart({ onCheckout }) {
  const navigate = useNavigate();

  const goToCartDetail = () => {
    navigate("/cartDetail");
    setIsCartOpen(false);
  };

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  const [showInstantPay, setShowInstantPay] = useState(false);

  // Efecto para cerrar el carrito al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isCartOpen && !e.target.closest(".shopping-cart")) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCartOpen, setIsCartOpen]);

  // Lógica para confirmar el pago instantáneo
  const handleConfirmPay = () => {
    setShowInstantPay(false);
    if (onCheckout) {
      onCheckout(); 
    }
    clearCart();
    setIsCartOpen(false);
  };

  const total = (cartItems || []).reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 0),
    0
  );

  return (
    <div className={`cart-overlay ${isCartOpen ? "open" : ""}`}>
      <div className="shopping-cart">
        <div className="cart-header">
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
          <button className="clear-btn" onClick={clearCart}>
            Vaciar Carrito
          </button>
        </div>

        <h2>Mi Carrito</h2>

        {(cartItems || []).length === 0 ? (
          <p className="empty-cart-message">
            Tu carrito está vacío.<br />
            ¡Añade productos para empezar a comprar!
          </p>
        ) : (
          <>
            <CartItemList />
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <strong>
                  ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </strong>
              </div>
              <div className="cart-actions">
                <button className="checkout-btn" onClick={goToCartDetail}>
                  Ir a Pagar
                </button>
                <button
                  className="checkout-btn2"
                  onClick={() => setShowInstantPay(true)}
                >
                  Pago al instante
                </button>
              </div>
            </div>

            <Modal
              message="¿Seguro que quieres pagar al instante?"
              isOpen={showInstantPay}
              onClose={() => setShowInstantPay(false)}
              onConfirm={handleConfirmPay}
            />
          </>
        )}
      </div>
    </div>
  );
}
