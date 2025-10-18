import React, { useState, useEffect } from 'react';
import { productClient } from "../api/ProductClient";
import { categoryClient } from "../api/categoryClient";
import ProductCard from '../components/ProductCard';
import Header from '../components/Header'; 
import '../styles/ProductsPage.css';
import LecheBanner from "../assets/BannerFootOfertadeLeche-01.svg";
import Footer from '../components/Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const priceRanges = [
    { label: 'Todos', value: 'all' },
    { label: 'Menor a $50', value: '0-50' },
    { label: '$50 - $1000', value: '50-1000' },
    { label: '$1000 - $2000', value: '1000-2000' },
    { label: 'Mayor a $2000', value: '2000-' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productClient.getAllProducts();
        if (response.success && Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          console.error('Invalid response format:', response);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryClient.getCategories();
        if (response.success && Array.isArray(response.data)) {
          const categoryNames = response.data.map(cat => cat.name || cat.Name);
          setCategories(['all', ...categoryNames]);
        } else {
          setCategories(['all']);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['all']);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const uniqueBrands = [...new Set(products.map(p => p.brand || p.Brand).filter(Boolean))];
        setBrands(['all', ...uniqueBrands]);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands(['all']);
      }
    };
    if (products.length > 0) {
      fetchBrands();
    }
  }, [products]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => (p.category || p.Category) === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter(p => (p.brand || p.Brand) === selectedBrand);
    }

    if (selectedPrice !== 'all') {
      result = result.filter(p => {
        const price = p.price || p.Price;
        const [min, max] = selectedPrice.split('-');
        if (max === '') return price >= parseFloat(min);
        return price >= parseFloat(min) && price <= parseFloat(max);
      });
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, selectedPrice]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container" style={{ margin: "auto" }}>
        <img
          src={LecheBanner}
          alt="Banner foot chocolate"
          style={{ width: "100%" }}
        />
      </div>
      <div className="products-page">

        <div className="products-container">

          <aside className="filters-sidebar">
            <h2>Filtros</h2>

            <div className="filter-group">
              <label>Categoría</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas las categorías' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Marca</label>
              <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand === 'all' ? 'Todas las marcas' : brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Precio</label>
              <select 
                value={selectedPrice} 
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón restablecer filtros siempre visible debajo de los filtros */}
            <div className="reset-filters-wrapper" style={{ marginTop: '1.5rem' }}>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSelectedPrice('all');
                }}
                className="reset-filters-btn"
              >
                Restablecer filtros
              </button>
            </div>
          </aside>

          {/* Productos a la derecha */}
          <section className="products-grid-container">
            <div className="products-content">
              {filteredProducts.length === 0 ? (
                <div className="no-results">
                  <h3>No hay productos disponibles</h3>
                  <p>Intenta cambiando categoría, marca o precio.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>

  );
};

export default Products;
