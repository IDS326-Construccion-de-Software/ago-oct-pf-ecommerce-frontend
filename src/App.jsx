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

// --- Componente de Presentación (Home Layout) ---
const AppLayout = ({ promos, products, onAdd, loading }) => (
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
const AppContainer = () => {
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
    {
      title: "Ofertas de Temporada",
      description: "Descuentos increíbles",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
      link: "/promociones/temporada"
    },
    {
      title: "Productos Frescos",
      description: "Calidad garantizada",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop",
      link: "/categoria/frescos"
    }
  ];

  return (
    <AppLayout 
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

// --- Componente Wrapper con Carrito Global ---
const GlobalCartWrapper = ({ children }) => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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

  return (
    <>
      {children}
      <ShoppingCart onCheckout={handleCheckout} />
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        cartItems={cartItems || []} 
        total={cartTotal} 
      />
    </>
  );
};

// --- Componente Principal (Raíz) ---
export default function App() {
  return (
    <CartProvider>
      <OrdersProvider>
        <GlobalCartWrapper>
          <Routes>
            <Route path="/" element={<AppContainer />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/producto/:id" element={<ProductDetailPage />} />
          </Routes>
        </GlobalCartWrapper>
      </OrdersProvider>
    </CartProvider>
  );
}