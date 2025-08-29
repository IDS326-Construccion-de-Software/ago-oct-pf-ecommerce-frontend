import { Link } from "react-router-dom";
import "../styles/ShoppingCart.css";

function ShoppingCart() {
  const cartItems = []; 

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>¡Tu carrito está vacío!</h2>
        <p>Continua explorando nuestros productos y encuentra tus productos favoritos.</p>
        <Link to="/">
          <button className="add-items-btn">Agregar artículos</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-items">
      {/* Renderizado de productos en carrito */}
    </div>
  );
}

export default ShoppingCart;
