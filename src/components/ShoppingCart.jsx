import { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import "../styles/ShoppingCart.css";
import Modal from "./Modal";
import { CartContext } from "../context/CartContext";

export default function ShoppingCart() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    clearCart,
    removeFromCart,
  } = useContext(CartContext);

  const [showInstantPay, setShowInstantPay] = useState(false);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".shopping-cart") && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCartOpen, setIsCartOpen]);

  const handleConfirmPay = () => {
    setShowInstantPay(false);
    clearCart(); 
    setIsCartOpen(false);
  };

  return (
    <div className={`cart-overlay ${isCartOpen ? "open" : ""}`}>
      <div className="shopping-cart">
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>
          <X size={24} />
        </button>
        <h2>Mi Carrito</h2>
        {cartItems.length === 1 ? (
          <p className="empty-cart-message">
            Tu carrito está vacío!<br />
            Intenta añadir un producto de tu preferencia!
          </p>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="checkout-btn"
              onClick={() => null}
            >
              Ir a Pagar
            </button>

            <button
              className="checkout-btn2"
              onClick={() => setShowInstantPay(true)}
            >
              Pago al instante
            </button>

            <Modal
              message="Seguro que quieres pagar al instante?"
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
