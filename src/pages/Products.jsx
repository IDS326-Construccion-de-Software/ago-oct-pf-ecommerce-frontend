import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { productClient } from "../api/ProductClient";
import { categoryClient } from "../api/categoryClient";
import { productImageClient } from "../api/productImageClient";
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
  const [categoryMap, setCategoryMap] = useState({}); // id -> name
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { category } = useParams();
  const location = useLocation();

  const slugify = (s) =>
    (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

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
          // Enrich with category name and primary image
          const base = response.data.map(p => ({
            ...p,
            // backend returns CategoryId and Brand/Name/Price casing may vary, normalize later
            images: [],
          }));

          // Fetch all product images once and map primary by productId
          let imagesMap = {};
          try {
            const imgListResp = await productImageClient.getProductImages();
            if (imgListResp.success && Array.isArray(imgListResp.data)) {
              // Prefer primary image; fallback to first by order
              const grouped = imgListResp.data.reduce((acc, img) => {
                const pid = img.productId || img.ProductId;
                if (!pid) return acc;
                if (!acc[pid]) acc[pid] = [];
                acc[pid].push(img);
                return acc;
              }, {});
              imagesMap = Object.keys(grouped).reduce((acc, pid) => {
                const list = grouped[pid];
                const primary = list.find(i => i.isPrimary || i.IsPrimary) || list.sort((a,b) => (a.order ?? a.Order ?? 0) - (b.order ?? b.Order ?? 0))[0];
                if (primary?.url || primary?.Url) acc[pid] = [primary.url || primary.Url];
                return acc;
              }, {});
            }
          } catch { /* ignore image list errors */ }

          const withImages = base.map(p => {
            const pid = p.id || p.Id;
            const imgs = imagesMap[pid] || ["/placeholder.svg"];
            return { ...p, images: imgs };
          });

          // Map category name if we already have the map
          const enriched = withImages.map(p => ({
            ...p,
            category: p.category || p.Category || categoryMap[p.categoryId || p.CategoryId] || 'Sin categoría',
            brand: p.brand || p.Brand,
            name: p.name || p.Name,
            price: p.price ?? p.Price,
            id: p.id || p.Id,
          }));

          setProducts(enriched);
          setFilteredProducts(enriched);
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
  }, [categoryMap]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryClient.getCategories();
        if (response.success && Array.isArray(response.data)) {
          const map = {};
          const names = response.data.map(cat => {
            const id = cat.id || cat.Id;
            const name = cat.name || cat.Name;
            if (id && name) map[id] = name;
            return name;
          });
          setCategoryMap(map);
          setCategories(['all', ...names]);
        } else {
          setCategoryMap({});
          setCategories(['all']);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryMap({});
        setCategories(['all']);
      }
    };
    fetchCategories();
  }, []);

  // Sync selected category from route param when categories are loaded
  useEffect(() => {
    if (!categories.length) return;
    if (!category) {
      setSelectedCategory('all');
      return;
    }
    if (category && categories.length) {
      if (category === 'all') {
        setSelectedCategory('all');
        return;
      }
      // Find category by slug
      const match = categories.find(c => c !== 'all' && slugify(c) === category);
      setSelectedCategory(match || 'all');
    }
  }, [category, categories]);

  // Read search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchTerm(q);
  }, [location.search]);

  // When navigating by category, reset other filters so the page appears filtered by that category
  useEffect(() => {
    if (category) {
      setSelectedBrand('all');
      setSelectedPrice('all');
      setSearchTerm('');
    }
  }, [category]);

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

    // Text search
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(p => {
        const name = (p.name || p.Name || '').toString().toLowerCase();
        const brand = (p.brand || p.Brand || '').toString().toLowerCase();
        const categoryName = (p.category || p.Category || '').toString().toLowerCase();
        return name.includes(q) || brand.includes(q) || categoryName.includes(q);
      });
    }

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
        const minVal = Number.parseFloat(min);
        const maxVal = max === '' ? Number.POSITIVE_INFINITY : Number.parseFloat(max);
        return price >= minVal && price <= maxVal;
      });
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, selectedPrice, searchTerm]);

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
              <label htmlFor="filter-category">Categoría</label>
              <select 
                id="filter-category"
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
              <label htmlFor="filter-brand">Marca</label>
              <select 
                id="filter-brand"
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
              <label htmlFor="filter-price">Precio</label>
              <select 
                id="filter-price"
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
                  setSearchTerm('');
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
