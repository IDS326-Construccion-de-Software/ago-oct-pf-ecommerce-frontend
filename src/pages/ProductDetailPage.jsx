import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";

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

export default ProductDetailPage;
