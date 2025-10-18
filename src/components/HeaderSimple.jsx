import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoTheRevenge.svg";
import { User, ShoppingCart as CartIcon, HelpCircle, Search } from "lucide-react";
import "../styles/Header.css";
import { useCart } from "../context/CartContext";

export default function HeaderSimple() {
  const { cartItems, setIsCartOpen } = useCart(); 
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(true);
  };


  const slug = (s) =>
    s.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

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
