import { useState, useEffect, useContext } from "react";
import { X, Plus, Minus } from "lucide-react";
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
    increaseQuantity,
    decreaseQuantity,
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

  // Total general
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
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

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">
            Tu carrito está vacío!<br />
            Intenta añadir un producto de tu preferencia!
          </p>
        ) : (
          <>
            <ul className="cart-items">
  {cartItems.map((item, index) => (
    <li key={index} className="cart-item-card">
      
      {/* Imagen del producto */}
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-image"
        />
      )}

            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                ${Number(item.price).toFixed(2)} x {item.quantity} = $
                {(Number(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>

            <div className="item-actions">
              <div className="quantity-controls">
                <button onClick={() => increaseQuantity(item.id)}>
                  <Plus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => decreaseQuantity(item.id)}>
                  <Minus size={16} />
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

            <div className="cart-total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="cart-actions">
              <button className="checkout-btn" onClick={() => null}>
                Ir a Pagar
              </button>

              <button
                className="checkout-btn2"
                onClick={() => setShowInstantPay(true)}
              >
                Pago al instante
              </button>

              <Modal
                message="¿Seguro que quieres pagar al instante?"
                isOpen={showInstantPay}
                onClose={() => setShowInstantPay(false)}
                onConfirm={handleConfirmPay}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
