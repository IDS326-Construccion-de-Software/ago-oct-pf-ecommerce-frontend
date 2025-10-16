// src/components/CartItemsList.jsx
import { Plus, Minus, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import "../styles/ShoppingCart.css";

export default function CartItemsList() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeItem } = useCart();

  if (cartItems.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <ul className="cart-items">
    {cartItems.map((item, index) => (
        <li key={item.id || index} className="cart-item-card">
        {item.image && (
            <img src={item.image} alt={item.name} className="cart-item-image" />
        )}
        <div className="item-info">
            <span className="item-name">{item.name}</span>
            <span className="item-price">
            ${Number(item.price).toLocaleString("en-US", { minimumFractionDigits: 2 })} <br />
            ${(Number(item.price) * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
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
            <button className="remove-btn" onClick={() => removeItem(item.id)}>
            <X size={16} />
            </button>
        </div>
        </li>
    ))}
    </ul>
  );
}
