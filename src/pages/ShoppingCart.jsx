import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/ShoppingCart.css";
import Modal from "../components/Modal";
import { createPortal } from "react-dom";

export default function ShoppingCart({ isOpen, onClose, items }) {
  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".shopping-cart") && isOpen) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);
      
const [showInstantPay, setShowInstantPay] = useState(false);

const handleConfirmPay = () => {
  alert("Pago confirmado!");
  setShowInstantPay(false); // Se cierra solo al confirmar
};

  return (
    <div className={`cart-overlay ${isOpen ? "open" : ""}`}>
      <div className="shopping-cart">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Mi Carrito</h2>
        {items.length === 1 ? (
          <p className="empty-cart-message">Tu carrito está vacío!<br></br>
            Intenta añadir un producto de tu preferencia!
          </p>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <button
              className="checkout-btn"
              onClick={() => {
                // Por ahora solo alert, luego redirigirá a otra página
                alert("Aquí iría la redirección al checkout");
              }}
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