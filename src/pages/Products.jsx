import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [selectedBrand, setSelectedBrand] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data.items);
        setFilteredProducts(data.items);
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

  // Get unique brands for filter
  const brands = ['all', ...new Set(products.map(product => product.brand))];

  // Apply filters and search
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term)
      );
    }

    // Apply brand filter
    if (selectedBrand !== 'all') {
      result = result.filter(product => product.brand === selectedBrand);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'discount':
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy, selectedBrand]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <div className="products-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>
          
          <div className="filters-container">
            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="filter-select"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? 'Todas las marcas' : brand}
                </option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Ordenar por</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
              <option value="discount">Mayor descuento</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <h3>No se encontraron productos</h3>
          <p>Intenta con otros términos de búsqueda o filtros.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedBrand('all');
              setSortBy('default');
            }}
            className="reset-filters-btn"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;