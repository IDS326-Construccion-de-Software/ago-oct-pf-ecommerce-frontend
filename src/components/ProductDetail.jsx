"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Share2, ShoppingCart, Zap, Plus, Minus, Shield, Award } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getProductById, getRelatedProducts } from "../services/productService"
import { formatCurrency } from "../services/orderService"
import "../styles/ProductDetail.css"
import PropTypes from "prop-types"

ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
}

export function ProductDetail({ productId }) {
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProductData = async () => {
      console.log("[v0] ProductDetail - productId:", productId)

      setLoading(true)
      setError(null)
      setProduct(null)

      try {
        console.log("[v0] ProductDetail - Llamando getProductById...")
        const productData = await getProductById(productId)
        console.log("[v0] ProductDetail - Producto cargado:", productData)
        setProduct(productData)

        console.log("[v0] ProductDetail - Cargando productos relacionados...")
        const related = await getRelatedProducts(productId)
        console.log("[v0] ProductDetail - Productos relacionados:", related)
        setRelatedProducts(related)

        setQuantity(1)
        setSelectedImage(0)
      } catch (err) {
        console.error("[v0] Error loading product:", err)
        setError("No pudimos encontrar el producto que buscas.")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProductData()
      window.scrollTo(0, 0)
    } else {
      console.error("[v0] ProductDetail - No productId found in params")
      setError("ID de producto no válido")
      setLoading(false)
    }

    console.log("[Debug] Available mock product IDs:", [
      "550e8400-e29b-41d4-a716-446655440001",
      "550e8400-e29b-41d4-a716-446655440002",
      "550e8400-e29b-41d4-a716-446655440003",
      "550e8400-e29b-41d4-a716-446655440004",
      "550e8400-e29b-41d4-a716-446655440005",
      "550e8400-e29b-41d4-a716-446655440006",
    ])
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      alert(`${product.name} (x${quantity}) agregado al carrito.`)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      alert(`Comprando ${product.name} (x${quantity})`)
    }
  }

  const handleRelatedProductClick = (relatedProductId) => {
    navigate(`/producto/${relatedProductId}`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner">Cargando producto...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <div className="not-found-content">
          <h2>Producto no encontrado</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-button-error">
            <ArrowLeft />
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft />
          Volver
        </button>
        <div className="breadcrumb">
          <span>Inicio</span> / <span>{product.category}</span> / <span>{product.name}</span>
        </div>
      </div>

      <div className="product-main">
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage] || "/placeholder.svg"} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="thumbnail-list">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-title-section">
            <div className="badges">
              <span className="badge-category">{product.category}</span>
              {product.brand && <span className="badge-brand">{product.brand}</span>}
            </div>
            <h1 className="product-title">{product.name}</h1>
          </div>

          <div className="price-section">
            <span className="current-price">{formatCurrency(product.price)}</span>
            <p className="price-unit">Precio por unidad</p>
          </div>

          <div className="description">
            <p>{product.description}</p>
          </div>

          <div className="quantity-section">
            <div className="quantity-controls-wrapper">
              <span className="quantity-label">Cantidad:</span>
              <div className="quantity-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q + 1))} className="quantity-btn">
                  <Plus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={() => setQuantity((q) => q - 1)} className="quantity-btn">
                  <Minus />
                </button>
              </div>
            </div>
          </div>

          <div className="total-section">
            <div className="total-row">
              <span className="total-label">Total a pagar:</span>
              <span className="total-amount">{formatCurrency(product.price * quantity)}</span>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleBuyNow} className="buy-now-btn">
              <Zap /> Comprar Ahora
            </button>
            <div className="secondary-actions">
              <button onClick={handleAddToCart} className="add-cart-btn">
                <ShoppingCart /> Al Carrito
              </button>
              <button onClick={handleShare} className="share-btn">
                <Share2 />
              </button>
            </div>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <Shield className="feature-icon" />
              Garantía de calidad
            </div>
            <div className="feature-item">
              <Award className="feature-icon" />
              Producto premium
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="related-title">Productos Relacionados</h2>
          <div className="related-grid">
            {relatedProducts.map((p) => (
              <div key={p.id} className="related-card" onClick={() => handleRelatedProductClick(p.id)}>
                <div className="related-image">
                  <img src={p.images[0] || "/placeholder.svg"} alt={p.name} />
                </div>
                <div className="related-card-content">
                  <h3 className="related-name">{p.name}</h3>
                  <div className="related-footer">
                    <span className="related-price">{formatCurrency(p.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
