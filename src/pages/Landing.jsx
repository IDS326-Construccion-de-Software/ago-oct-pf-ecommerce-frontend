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
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
