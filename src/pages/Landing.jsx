import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSlider from "../components/BannerSlider";
import ProductCarousel from "../components/ProductCarousel";
import PromoGrid from "../components/PromoGrid";
import CategoryCarousel from "../components/CategoryCarousel";
import { getAllProducts } from "../services/productService";
import { categoriesMock } from "../mocks/categories";
import FootChocolateBanner from "../assets/Bannerfootchocolate-01.svg";
import FrizaoFridayBanner from "../assets/Bannerfootfrizaofriday.svg";
import { NavLink } from "react-router-dom";


const Landing = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllProducts(1, 20);
        setProducts(response.items);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(
          "No se pudieron cargar los productos. Intente de nuevo más tarde."
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

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
        "https://media.istockphoto.com/id/496564915/photo/bread-and-buns.jpg?s=612x612&w=0&k=20&c=qkmz5pViJ-4T5PLSLYRjmp_HAZ5-VAcar4zaZ-rzMA8=",
      imgAlt: "Vegetales frescos",
      badge: "VARIEDAD Y DULZURA",
      title: "Postres y panadería",
      subtitle: "Aprovecha las ofertas",
      ctaLabel: "Comprar ahora",
      ctaHref: "/categorias/postres",
      span: "wide",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div className="container" style={{ paddingBlock: "16px" }}>
          <BannerSlider autoPlay delay={5000} fit="cover" rounded />

        </div>

        <div className="container" style={{ paddingBottom: "32px" }}>
          {loading ? (
            <div className="text-center py-8">Cargando productos...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <ProductCarousel
              title="Disfruta de nuestra selección"
              products={products}
              onAdd={addToCart}
            />
            
          )}

        <img
            src={FootChocolateBanner}
            alt="Banner foot chocolate"
            style={{ width: "100%", margin: "24px 0" }}
        />
        </div>

        <PromoGrid items={promos} />

        <div className="container" style={{ padding: "32px 0" }}>
          <CategoryCarousel title="Nuestras categorías" categories={categoriesMock} />
        <img
            src={FrizaoFridayBanner}
            alt="Banner foot chocolate"
            style={{ width: "100%", margin: "24px 0" }}
        />
        </div>

        <div className="container" style={{ padding: "16px 0 32px" }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            background: 'rgba(253, 227, 207, 0.25)',
            border: '1px solid rgba(0,0,0,.06)',
            borderRadius: 12,
            padding: 16
          }}>
            <div>
              <h3>¿Necesitas ayuda?</h3>
              <p>Visita nuestro centro de ayuda o contáctanos.</p>
              <NavLink to="/ayuda" className="nl-btn">Ir a Ayuda</NavLink>
            </div>
            <div>
              <h3>Conoce The Revenge</h3>
              <p>Nuestra historia, misión y valores.</p>
              <NavLink to="/sobre-nosotros" className="nl-btn">Sobre nosotros</NavLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
