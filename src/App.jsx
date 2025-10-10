import { Routes, Route, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartProvider, CartContext } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerSlider from "./components/BannerSlider";
import ProductCarousel from "./components/ProductCarousel";
import PromoGrid from "./components/PromoGrid";
import CategoryCarousel from "./components/CategoryCarousel";
import ShoppingCart from "./components/ShoppingCart";
import PaymentModal from './components/PaymentModal';
import OrdersManager from './components/OrdersManager';
import { ProductDetail } from './components/ProductDetail';
import { getAllProducts } from "./services/productService";
import { categoriesMock } from "./mocks/categories";
import PaymentSuccessModal from './components/PaymentSuccessModal';

// --- Componente de Presentación (Home Layout) ---
const HomeLayout = ({ promos, products, onAdd, loading }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main>
      <div className="container" style={{ paddingBlock: "16px" }}>
        <BannerSlider autoPlay delay={5000} fit="cover" rounded />
      </div>
      <div className="container" style={{ paddingBottom: "32px" }}>
        {loading ? (
          <div className="text-center py-8">Cargando productos...</div>
        ) : (
          <ProductCarousel
            title="Disfruta de nuestra selección"
            products={products}
            onAdd={onAdd}
          />
        )}
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
  </div>
);

// --- Componente Contenedor Home ---
const HomePageContainer = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts(1, 20);
        setProducts(response.items);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const promos = [
    { imgUrl: "https://blog.supermercadosmas.com/wp-content/uploads/2018/03/700x700-20.png", imgAlt: "Cortes de carne", badge: "HASTA 15% DE DESCUENTO", title: "En surtido de Carnes seleccionadas", subtitle: "Solo esta semana", ctaLabel: "Comprar ahora", ctaHref: "/categorias/carnes" },
    { imgUrl: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1600", imgAlt: "Pescados y mariscos", badge: "DISFRUTA", title: "Nuestro surtido de Pescados y Mariscos", subtitle: "Fresco todos los días", ctaLabel: "Comprar ahora", ctaHref: "/categorias/pescados" },
    { imgUrl: "https://images.pexels.com/photos/750952/pexels-photo-750952.jpeg?auto=compress&cs=tinysrgb&w=1600", imgAlt: "Vegetales frescos", badge: "VARIEDAD Y FRESCURA", title: "En frutas y vegetales", subtitle: "Aprovecha las ofertas", ctaLabel: "Comprar ahora", ctaHref: "/categorias/vegetales", span: "wide" },
  ];

  return (
    <HomeLayout 
      promos={promos}
      products={products}
      onAdd={addToCart}
      loading={loading}
    />
  );
};

// --- Página de Orders ---
const OrdersPage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <OrdersManager />
      </div>
    </main>
    <Footer />
  </div>
);

// --- Página de Detalle de Producto ---
const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); 
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail productId={id} onAddToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
};

// --- Componente Wrapper Global --- 
// Gestiona elementos comunes como el carrito y los modales de pago
const GlobalWrapper = ({ children }) => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const cartTotal = (cartItems || []).reduce(
    (total, item) => total + (item.price * (item.quantity || 1)), 
    0
  );

  const handleCheckout = () => {
    if (cartItems && cartItems.length > 0) {
      setIsCartOpen(false);
      setIsPaymentModalOpen(true);
    }
  };

  const handlePaymentComplete = (paymentData) => {
    setTransactionData(paymentData);
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setTransactionData(null);
  };

  return (
    <>
      {children}
      <ShoppingCart onCheckout={handleCheckout} />
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        cartItems={cartItems || []} 
        total={cartTotal} 
        onPaymentComplete={handlePaymentComplete}
      />
      <PaymentSuccessModal 
        paymentData={transactionData}
        onClose={closeSuccessModal}
      />
    </>
  );
};

// --- Componente Principal (Raíz) ---
export default function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <GlobalWrapper>
          <Routes>
            <Route path="/" element={<HomePageContainer />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/producto/:id" element={<ProductDetailPage />} />
          </Routes>
        </GlobalWrapper>
      </OrdersProvider>
    </CartProvider>
  );
}