import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoTheRevenge.svg";
import { User, ShoppingCart as CartIcon, HelpCircle, Search } from "lucide-react";
import "../styles/Header.css";
import { useCart } from "../context/CartContext";

export default function HeaderSimple() {
  const { cartItems, setIsCartOpen } = useCart(); 
  const [/* search */, /* setSearch */] = useState("");

  const toggleCart = () => {
    setIsCartOpen(true);
  };


  // simplified header - no search form here to keep minimal

  return (
    <>
      <header className="rev-header">
        <div className="topbar">
          <div className="container topbar-inner">
            <div />
            <div className="top-links">
              <NavLink to="/login" className="link">
                <User size={16} /> Iniciar sesión
              </NavLink>

              <span className="sep">|</span>
              <button className="link" onClick={toggleCart}>
                <CartIcon size={16} /> Mi Carrito ({cartItems.length}) 
              </button>
            </div>
          </div>
        </div>

        <div className="container mainbar">
          <NavLink to="/" className="brand">
            <img className="brand-logo" src={Logo} alt="The Revenge" />
          </NavLink>

        </div>


      </header>
    </>
  );
}
