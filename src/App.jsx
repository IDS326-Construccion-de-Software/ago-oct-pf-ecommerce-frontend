import { Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartProvider, CartContext } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerSlider from "./components/BannerSlider";
import ProductCarousel from "./components/ProductCarousel";
import PromoGrid from "./components/PromoGrid";
import CategoryCarousel from "./components/CategoryCarousel";
import ShoppingCart from "./components/ShoppingCart";
import PaymentModal from './components/PaymentModal';
import { productsMock } from "./mocks/products";
import { categoriesMock } from "./mocks/categories";

// --- Componentes Separados para una Arquitectura Limpia ---

// 1. Componente de Presentación (Layout)
// No tiene lógica de estado ni de contexto. Solo recibe props y renderiza UI.
const AppLayout = ({ promos, onAdd, onCheckout, cartItems, cartTotal, isPaymentModalOpen, setIsPaymentModalOpen }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main>
      <div className="container" style={{ paddingBlock: "16px" }}>
        <BannerSlider autoPlay delay={5000} fit="cover" rounded />
      </div>
      <div className="container" style={{ paddingBottom: "32px" }}>
        <ProductCarousel
          title="Disfruta de nuestra selección"
          products={productsMock}
          onAdd={onAdd}
        />
      </div>
      <PromoGrid items={promos} />
      <div className="container" style={{ padding: "32px 0" }}>
        <CategoryCarousel
          title="Nuestras categorías"
          categories={categoriesMock}
        />
      </div>
    </main>
    <Footer />
    <ShoppingCart onCheckout={onCheckout} />
    <PaymentModal 
      isOpen={isPaymentModalOpen} 
      onClose={() => setIsPaymentModalOpen(false)} 
      cartItems={cartItems || []} 
      total={cartTotal} 
    />
  </div>
);

// 2. Componente Contenedor (Lógica)
// Se encarga de la lógica, el estado y el acceso al contexto.
const AppContainer = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Cálculo seguro del total del carrito
  const cartTotal = (cartItems || []).reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    if (cartItems && cartItems.length > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  const promos = [
    { imgUrl: "https://blog.supermercadosmas.com/wp-content/uploads/2018/03/700x700-20.png", imgAlt: "Cortes de carne", badge: "HASTA 15% DE DESCUENTO", title: "En surtido de Carnes seleccionadas", subtitle: "Solo esta semana", ctaLabel: "Comprar ahora", ctaHref: "/categorias/carnes" },
    { imgUrl: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1600", imgAlt: "Pescados y mariscos", badge: "DISFRUTA", title: "Nuestro surtido de Pescados y Mariscos", subtitle: "Fresco todos los días", ctaLabel: "Comprar ahora", ctaHref: "/categorias/pescados" },
    { imgUrl: "https://images.pexels.com/photos/750952/pexels-photo-750952.jpeg?auto=compress&cs=tinysrgb&w=1600", imgAlt: "Vegetales frescos", badge: "VARIEDAD Y FRESCURA", title: "En frutas y vegetales", subtitle: "Aprovecha las ofertas", ctaLabel: "Comprar ahora", ctaHref: "/categorias/vegetales", span: "wide" },
  ];

  // Pasa toda la lógica y datos al componente de presentación
  return (
    <AppLayout 
      promos={promos}
      onAdd={addToCart}
      onCheckout={handleCheckout}
      cartItems={cartItems}
      cartTotal={cartTotal}
      isPaymentModalOpen={isPaymentModalOpen}
      setIsPaymentModalOpen={setIsPaymentModalOpen}
    />
  );
}

// 3. Componente Principal (Raíz)
// Configura los proveedores globales (Contexto, Router)
export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<AppContainer />} />
      </Routes>
    </CartProvider>
  );
}
