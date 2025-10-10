import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/LogoTheRevenge.svg";
import { User, ShoppingCart as CartIcon, HelpCircle, Search } from "lucide-react";
import "../styles/Header.css";
import { CartContext } from "../context/CartContext"; 

export default function Header() {
  const { cartItems, setIsCartOpen } = useContext(CartContext); 

  const toggleCart = () => {
    setIsCartOpen(true);
  };

  const CATEGORIES = [
    "Aperitivos", "Postres", "Congelados", "Bebidas", "Pescados", 
    "Carnes", "Mascotas", "Bebés"
  ];

  const slug = (s) =>
    s.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

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
          <form
            className="search"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="search" placeholder="Busca tu producto" />
            <button type="submit" aria-label="Buscar" className="search-btn">
              <Search className="search-icon" />
            </button>
          </form>
          <NavLink to="/ayuda" className="help">
            <HelpCircle size={18} /> Ayuda
          </NavLink>
        </div>

        <nav className="catbar">
          <div className="container">
            <ul className="cats">
              {CATEGORIES.map((c) => (
                <li key={c} className="cat-item">
                  <NavLink
                    to={`/categoria/${slug(c)}`}
                    className={({ isActive }) =>
                      `cat-link ${isActive ? "active" : ""}`
                    }
                  >
                    {c}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
