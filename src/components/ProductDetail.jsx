"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css" // Importa los estilos

import { ArrowLeft, Share2, ShoppingCart, Zap, Plus, Minus, Shield, Award } from "lucide-react"
import { getProductById, getRelatedProducts } from "../services/productService"
import { formatCurrency } from "../services/orderService"
import "../styles/ProductDetail.css"

// Definimos los prop-types, añadiendo onAddToCart
ProductDetail.propTypes = {
  productId: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func, // Función para añadir al carrito
}

export function ProductDetail({ productId, onAddToCart }) {
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true)
      setError(null)
      setProduct(null)

      try {
        const productData = await getProductById(productId)
        setProduct(productData)

        const related = await getRelatedProducts(productId)
        setRelatedProducts(related)

        // Reiniciar estado para el nuevo producto
        setQuantity(1)
        setSelectedImage(0)
      } catch (err) {
        console.error("Error cargando el producto:", err)
        setError("No pudimos encontrar el producto que buscas.")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProductData()
      window.scrollTo(0, 0)
    } else {
      console.error("ProductDetail - No se encontró un productId en los parámetros.")
      setError("ID de producto no válido")
      setLoading(false)
    }
  }, [productId])

  // Función para añadir al carrito, ahora usa la prop onAddToCart
  const handleAddToCart = () => {
    if (product && onAddToCart) {
      // Llama a la función pasada por props con el producto y la cantidad
      onAddToCart(product, quantity)

      // Muestra una notificación de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "¡Agregado!",
        text: `${product.name} (x${quantity}) se ha agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      })
    } else if (!onAddToCart) {
        console.warn("ProductDetail: La función 'onAddToCart' no fue proporcionada como prop.")
         // Notificación de error si la función no existe
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La funcionalidad del carrito no está disponible en este momento.',
        })
    }
  }

  // Función de comprar ahora con SweetAlert (ejemplo)
  const handleBuyNow = () => {
    if (product) {
      Swal.fire({
        title: 'Proceder al pago',
        text: `Estás a punto de comprar ${quantity} x ${product.name}.`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar ahora',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            // Aquí iría la lógica para redirigir al checkout
            Swal.fire('¡Gracias!', 'Redirigiendo a la página de pago...', 'success')
        }
      })
    }
  }

  const handleRelatedProductClick = (relatedProductId) => {
    navigate(`/producto/${relatedProductId}`)
  }

  // Función de compartir con fallback y SweetAlert
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Echa un vistazo a este producto: ${product.name}`,
      url: window.location.href,
    }
    try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          throw new Error('Share API not supported');
        }
    } catch (err) {
        // Fallback para navegadores que no soportan la Share API
        navigator.clipboard.writeText(window.location.href);
        Swal.fire({
            icon: 'success',
            title: '¡Enlace copiado!',
            text: 'El enlace del producto se ha copiado a tu portapapeles.',
            timer: 2000,
            showConfirmButton: false,
        });
    }
  }

  const decreaseQuantity = () => {
    setQuantity((q) => Math.max(1, q - 1))
  }

  const increaseQuantity = () => {
    setQuantity((q) => q + 1)
  }

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
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
                <button onClick={increaseQuantity} className="quantity-btn" aria-label="Aumentar cantidad">
                  <Plus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={decreaseQuantity} className="quantity-btn" aria-label="Disminuir cantidad">
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
              <button onClick={handleShare} className="share-btn" aria-label="Compartir producto">
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