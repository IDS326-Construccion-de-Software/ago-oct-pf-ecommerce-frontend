"use client"

// src/components/ProductCarousel.jsx
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import "../styles/ProductCarousel.css"

function formatMoney(value) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 2,
  }).format(value)
}

function ProductCard({ p, onAdd }) {
  const navigate = useNavigate()

  const hasDiscount = p.originalPrice && p.originalPrice > p.price
  const discountPct = hasDiscount ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0

  const handleCardClick = (e) => {
    // Evitar navegación si se hace click en el botón de agregar
    if (e.target.closest(".pc-fab")) return
    navigate(`/producto/${p.id}`)
  }

  return (
    <article className="pc-card" aria-label={p.name} onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="pc-media">
        {hasDiscount && <span className="pc-badge">-{discountPct}%</span>}
        {/* CAMBIO: Usar p.images[0] en lugar de p.image para que coincida con tus datos */}
        <img
          src={p.images && p.images.length > 0 ? p.images[0] : "/placeholder.svg"}
          alt={p.name}
          loading="lazy"
          draggable={false}
        />

        <button
          className="pc-fab"
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.(p)
          }}
          aria-label={`Añadir ${p.name} al carrito`}
          data-tip="Añadir al carrito"
          type="button"
        >
          <Plus className="pc-plus-icon" />
        </button>
      </div>

      <div className="pc-body">
        {p.brand && <div className="pc-brand">{p.brand}</div>}
        <h3 className="pc-name" title={p.name}>
          {p.name}
        </h3>

        <div className="pc-price-row">
          <div className="pc-prices">
            <div className="pc-price">{formatMoney(p.price)}</div>
            {hasDiscount && <div className="pc-price-old">{formatMoney(p.originalPrice)}</div>}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProductCarousel({
  title = "Disfruta de nuestra selección",
  products = [],
  onAdd,
  autoPlay = true,
  interval = 3500,
  stepCards = 1,
}) {
  const scroller = useRef(null)
  const viewportRef = useRef(null)
  const autoplayId = useRef(null)

  const CLONES = products.length > 2 ? 2 : products.length // Evitar error con pocos productos
  const loopedProducts =
    products.length > 0 ? [...products.slice(-CLONES), ...products, ...products.slice(0, CLONES)] : []

  const getMetrics = () => {
    const el = scroller.current // Usamos 'el' directamente
    if (!el) return null
    const card = el.querySelector(".pc-card")
    if (!card) return null
    const gap = Number.parseInt(getComputedStyle(el).gap || "16", 10)
    const cardW = card.offsetWidth + gap
    const realCount = products.length
    // ================== CAMBIO PRINCIPAL AQUÍ ==================
    // Devolvemos 'el' en lugar de 'scrollerElement' para que coincida con el resto del código.
    return { el, cardW, realCount, min: cardW * CLONES, max: cardW * (CLONES + realCount - 1) }
  }

  useEffect(() => {
    const m = getMetrics()
    if (!m) return
    requestAnimationFrame(() => {
      m.el.style.scrollBehavior = "auto"
      m.el.scrollLeft = m.min
      m.el.style.scrollBehavior = ""
    })
  }, [products.length])

  const handleScroll = () => {
    const m = getMetrics()
    if (!m) return
    const { el, min, max, cardW } = m
    const left = el.scrollLeft

    if (left < min - cardW * 0.5) {
      el.style.scrollBehavior = "auto"
      el.scrollLeft = max
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ""
      })
    } else if (left > max + cardW * 0.5) {
      el.style.scrollBehavior = "auto"
      el.scrollLeft = min
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ""
      })
    }
  }

  const scrollByCards = (dir) => {
    const m = getMetrics()
    if (!m) return
    const { el, cardW, min, max } = m

    if (dir > 0 && el.scrollLeft >= max - cardW * 0.25) {
      el.style.scrollBehavior = "auto"
      el.scrollLeft = min
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ""
        el.scrollBy({ left: cardW * stepCards, behavior: "smooth" })
      })
      return
    }

    if (dir < 0 && el.scrollLeft <= min + cardW * 0.25) {
      el.style.scrollBehavior = "auto"
      el.scrollLeft = max
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ""
        el.scrollBy({ left: -cardW * stepCards, behavior: "smooth" })
      })
      return
    }
    el.scrollBy({ left: dir * (cardW * stepCards), behavior: "smooth" })
  }

  const tick = () => {
    const m = getMetrics()
    if (!m) {
      schedule()
      return
    }
    const { el, cardW, min, max } = m

    if (el.scrollLeft >= max - cardW * 0.25) {
      el.style.scrollBehavior = "auto"
      el.scrollLeft = min
      requestAnimationFrame(() => {
        el.style.scrollBehavior = ""
        el.scrollBy({ left: cardW * stepCards, behavior: "smooth" })
      })
    } else {
      el.scrollBy({ left: cardW * stepCards, behavior: "smooth" })
    }
    schedule()
  }

  const schedule = () => {
    clearTimeout(autoplayId.current)
    autoplayId.current = setTimeout(tick, interval)
  }

  const startAuto = () => {
    if (!autoPlay || products.length === 0) return
    schedule()
  }
  const stopAuto = () => {
    clearTimeout(autoplayId.current)
  }

  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    const resume = () => autoPlay && startAuto()
    vp.addEventListener("mouseenter", stopAuto)
    vp.addEventListener("mouseleave", resume)
    vp.addEventListener("touchstart", stopAuto, { passive: true })
    vp.addEventListener("touchend", resume, { passive: true })

    const vis = () => (document.hidden ? stopAuto() : resume())
    document.addEventListener("visibilitychange", vis)

    startAuto()

    return () => {
      stopAuto()
      vp.removeEventListener("mouseenter", stopAuto)
      vp.removeEventListener("mouseleave", resume)
      vp.removeEventListener("touchstart", stopAuto)
      vp.removeEventListener("touchend", resume)
      document.removeEventListener("visibilitychange", vis)
    }
  }, [autoPlay, interval, stepCards, products])

  // No necesitamos este useEffect, la lógica ya está cubierta.
  // useEffect(() => { ... });

  if (products.length === 0) {
    return (
      <section className="home-products pc-wrap" aria-label={title}>
        <header className="pc-header">
          <h2 className="pc-title">{title}</h2>
        </header>
        <p>No hay productos para mostrar.</p>
      </section>
    )
  }

  return (
    <section className="home-products pc-wrap" aria-label={title}>
      <header className="pc-header">
        <h2 className="pc-title">{title}</h2>
      </header>

      <div className="pc-viewport" ref={viewportRef}>
        <button
          className="pc-arrow pc-arrow--left"
          onClick={() => scrollByCards(-1)}
          aria-label="Anterior"
          type="button"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="pc-scroller" ref={scroller} onScroll={handleScroll} role="list" aria-label="Lista de productos">
          {loopedProducts.map((p, i) => (
            <ProductCard key={`${p.id}-${i}`} p={p} onAdd={onAdd} />
          ))}
        </div>
        <button
          className="pc-arrow pc-arrow--right"
          onClick={() => scrollByCards(1)}
          aria-label="Siguiente"
          type="button"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  )
}
