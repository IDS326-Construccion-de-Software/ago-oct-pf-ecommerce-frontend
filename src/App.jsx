// src/App.jsx
import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";
import ProductCarousel from "./components/ProductCarousel";
import PromoGrid from "./components/PromoGrid";  
import Footer from "./components/Footer";
import { productsMock } from "./mocks/products";
import CategoryCarousel from "./components/CategoryCarousel";  
import { categoriesMock } from "./mocks/categories";
import { CartProvider, CartContext } from "./context/CartContext";
import ShoppingCart from "./components/ShoppingCart";
import { useContext } from "react";

function StoreContent() {
  const { addToCart } = useContext(CartContext); 

  const promos = [
    {
      imgUrl:
        "https://blog.supermercadosmas.com/wp-content/uploads/2018/03/700x700-20.png",
      imgAlt: "Cortes de carne",
      badge: "HASTA 15% DE DESCUENTO",
      title: "En surtido de Carnes seleccionadas",
      subtitle: "Solo esta semana",
      ctaLabel: "Comprar ahora",
      ctaHref: "/categorias/carnes",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imgAlt: "Pescados y mariscos",
      badge: "DISFRUTA",
      title: "Nuestro surtido de Pescados y Mariscos",
      subtitle: "Fresco todos los días",
      ctaLabel: "Comprar ahora",
      ctaHref: "/categorias/pescados",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/750952/pexels-photo-750952.jpeg?auto=compress&cs=tinysrgb&w=1600",
      imgAlt: "Vegetales frescos",
      badge: "VARIEDAD Y FRESCURA",
      title: "En frutas y vegetales",
      subtitle: "Aprovecha las ofertas",
      ctaLabel: "Comprar ahora",
      ctaHref: "/categorias/vegetales",
      span: "wide", 
    },
  ];

  return (
    <>
      <Header />

      <main>
        <div className="container" style={{ paddingBlock: "16px" }}>
          <BannerSlider autoPlay delay={5000} fit="cover" rounded />
        </div>

        <div className="container" style={{ paddingBottom: "32px" }}>
          <ProductCarousel
            title="Disfruta de nuestra selección"
            products={productsMock}
            onAdd={addToCart}   
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
      <ShoppingCart /> 
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreContent />
    </CartProvider>
  );
}
