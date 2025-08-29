import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import "./styles/App.css";   
import homeIcon from "./assets/Icono the Revenge V2.svg";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/">
            <img src={homeIcon} alt="Inicio" className="nav-icon" />
          </Link>

          <Link to="/carrito" className="cart-link">
            Carrito
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<ShoppingCart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
