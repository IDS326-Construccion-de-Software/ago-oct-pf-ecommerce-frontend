import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const hasDiscount = product.originalPrice > product.price;
  
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.images && product.images[0]} 
            alt={product.name} 
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-product.jpg';
            }}
          />
          {hasDiscount && (
            <div className="discount-badge">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </div>
        <div className="product-info">
          <span className="product-brand">{product.brand}</span>
          <h3 className="product-name">{product.name}</h3>
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <span className="product-unit">Por {product.unit}</span>
        </div>
      </Link>
      <button className="add-to-cart-btn">
        Añadir al carrito
      </button>
    </div>
  );
};

export default ProductCard;
