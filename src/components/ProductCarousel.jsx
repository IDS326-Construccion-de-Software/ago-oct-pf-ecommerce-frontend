"use client"

import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import "../styles/ProductCarousel.css"

// Función de formato de moneda (puedes moverla a un archivo de utilidades si la usas en otros lugares)
function formatMoney(value) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
  }).format(value)
}

// Subcomponente para la tarjeta de producto
function ProductCard({ product, onAdd }) {
  const navigate = useNavigate()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPct = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  const handleCardClick = (e) => {
    // Evita la navegación si se hace clic en el botón de agregar
    if (e.target.closest(".pc-fab")) return
    navigate(`/producto/${product.id}`)
  }

  return (
    <article className="pc-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="pc-media">
        {hasDiscount && <span className="pc-badge">-{discountPct}%</span>}
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          draggable={false}
        />
        <button
          className="pc-fab"
          onClick={(e) => {
            e.stopPropagation() // Detiene la propagación para no activar handleCardClick
            onAdd?.(product)   // Llama a onAdd solo con el producto. La cantidad será 1 por defecto.
          }}
          aria-label={`Añadir ${product.name} al carrito`}
          type="button"
        >
          <Plus className="pc-plus-icon" />
        </button>
      </div>

      <div className="pc-body">
        {product.brand && <div className="pc-brand">{product.brand}</div>}
        <h3 className="pc-name" title={product.name}>
          {product.name}
        </h3>
        <div className="pc-price-row">
          <div className="pc-prices">
            <div className="pc-price">{formatMoney(product.price)}</div>
            {hasDiscount && <div className="pc-price-old">{formatMoney(product.originalPrice)}</div>}
          </div>
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
}

// Componente principal del carrusel
export default function ProductCarousel({
  title = "Disfruta de nuestra selección",
  products = [],
  onAdd, // Esta es la función que se llamará al hacer clic en el botón +
}) {
  const scroller = useRef(null)
  
  if (!products || products.length === 0) {
    return (
      <section className="home-products pc-wrap">
        <header className="pc-header"><h2 className="pc-title">{title}</h2></header>
        <p>No hay productos para mostrar en este momento.</p>
      </section>
    )
  }

  const scrollByCards = (direction) => {
    if (!scroller.current) return;
    const cardWidth = scroller.current.querySelector('.pc-card')?.offsetWidth || 300;
    const scrollAmount = cardWidth * direction;
    scroller.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="home-products pc-wrap" aria-label={title}>
      <header className="pc-header">
        <h2 className="pc-title">{title}</h2>
      </header>
      <div className="pc-viewport">
        <button className="pc-arrow pc-arrow--left" onClick={() => scrollByCards(-1)} aria-label="Anterior">
          <ChevronLeft size={28} />
        </button>
        <div className="pc-scroller" ref={scroller}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
        <button className="pc-arrow pc-arrow--right" onClick={() => scrollByCards(1)} aria-label="Siguiente">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  )
}

ProductCarousel.propTypes = {
  title: PropTypes.string,
  products: PropTypes.array,
  onAdd: PropTypes.func,
};