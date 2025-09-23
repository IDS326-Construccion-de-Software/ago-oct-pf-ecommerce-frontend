// src/components/ProductCarousel.jsx
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "../styles/ProductCarousel.css";

function formatMoney(value) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 2,
  }).format(value);
}

function ProductCard({ p, onAdd }) {
  const hasDiscount = p.originalPrice && p.originalPrice > p.price;
  const discountPct = hasDiscount
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : 0;

  return (
    <article className="pc-card" aria-label={p.name}>
      <div className="pc-media">
        {hasDiscount && <span className="pc-badge">-{discountPct}%</span>}
        <img src={p.image} alt={p.name} loading="lazy" draggable={false} />

        <button
          className="pc-fab"
          onClick={() => onAdd?.(p)}
          aria-label={`Añadir ${p.name} al carrito`}
          data-tip="Añadir al carrito"
          type="button"
        >
          <Plus className="pc-plus-icon" />
        </button>
      </div>

      <div className="pc-body">
        {p.brand && <div className="pc-brand">{p.brand}</div>}
        <h3 className="pc-name" title={p.name}>{p.name}</h3>

        <div className="pc-price-row">
          <div className="pc-prices">
            <div className="pc-price">{formatMoney(p.price)}</div>
            {hasDiscount && (
              <div className="pc-price-old">{formatMoney(p.originalPrice)}</div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProductCarousel({
  title = "Disfruta de nuestra selección",
  products = [],
  onAdd,
  autoPlay = true,
  interval = 3500,    
  stepCards = 1       
}) {
  const scroller = useRef(null);
  const viewportRef = useRef(null);
  const autoplayId = useRef(null);

  
  const CLONES = 2;
  const loopedProducts = [
    ...products.slice(-CLONES),
    ...products,
    ...products.slice(0, CLONES),
  ];

  
  const getMetrics = () => {
  const scrollerElement = scroller.current;
  if (!scrollerElement) return null;
  const card = scrollerElement.querySelector(".pc-card");
  if (!card) return null;
  const gap = parseInt(getComputedStyle(scrollerElement).gap || "16", 10);
  const cardW = card.offsetWidth + gap;
  const realCount = products.length;
  return { scrollerElement, cardW, realCount, min: cardW * CLONES, max: cardW * (CLONES + realCount - 1) };
  };


  useEffect(() => {
    const m = getMetrics();
    if (!m) return;
    requestAnimationFrame(() => {
      m.el.style.scrollBehavior = "auto";
      m.el.scrollLeft = m.min;
      m.el.style.scrollBehavior = "";
    });
  }, [products.length]);


  const handleScroll = () => {
    const m = getMetrics();
    if (!m) return;
    const { el, min, max, cardW } = m;
    const left = el.scrollLeft;

  
    if (left < min - cardW * 0.5) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = max;
      el.style.scrollBehavior = "";
    } else if (left > max + cardW * 0.5) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = min;
      el.style.scrollBehavior = "";
    }
  };

  // Avance por flechas
  const scrollByCards = (dir) => {
    const m = getMetrics();
    if (!m) return;
    const { el, cardW, min, max } = m;

  
    if (dir > 0 && el.scrollLeft >= max - cardW * 0.25) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = min;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        el.scrollBy({ left: cardW * stepCards, behavior: "smooth" });
      });
      return;
    }

   
    if (dir < 0 && el.scrollLeft <= min + cardW * 0.25) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = max;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        el.scrollBy({ left: -cardW * stepCards, behavior: "smooth" });
      });
      return;
    }

    el.scrollBy({ left: dir * (cardW * stepCards), behavior: "smooth" });
  };


  const tick = () => {
    const m = getMetrics();
    if (!m) { schedule(); return; }
    const { el, cardW, min, max } = m;

    
    if (el.scrollLeft >= max - cardW * 0.25) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = min;
      el.style.scrollBehavior = "";
      requestAnimationFrame(() => {
        el.scrollBy({ left: cardW * stepCards, behavior: "smooth" });
      });
    } else {
      el.scrollBy({ left: cardW * stepCards, behavior: "smooth" });
    }
    schedule();
  };

  const schedule = () => {
    clearTimeout(autoplayId.current);
    autoplayId.current = setTimeout(tick, interval);
  };

  const startAuto = () => {
    if (!autoPlay) return;
    clearTimeout(autoplayId.current);
    autoplayId.current = setTimeout(tick, interval);
  };
  const stopAuto = () => {
    clearTimeout(autoplayId.current);
  };

  useEffect(() => {
    if (autoPlay) startAuto();
    const vp = viewportRef.current;

    const pause = () => stopAuto();
    const resume = () => autoPlay && startAuto();

    vp?.addEventListener("mouseenter", pause);
    vp?.addEventListener("mouseleave", resume);
    vp?.addEventListener("touchstart", pause, { passive: true });
    vp?.addEventListener("touchend", resume, { passive: true });

    const vis = () => (document.hidden ? stopAuto() : resume());
    document.addEventListener("visibilitychange", vis);

    return () => {
      stopAuto();
      vp?.removeEventListener("mouseenter", pause);
      vp?.removeEventListener("mouseleave", resume);
      vp?.removeEventListener("touchstart", pause);
      vp?.removeEventListener("touchend", resume);
      document.removeEventListener("visibilitychange", vis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, stepCards, products.length]);

 
  useEffect(() => {
    const metrics = getMetrics();
    const scrollerElement = metrics?.scrollerElement;
    if (!scrollerElement) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scrollerElement.scrollBy({ left: e.deltaY, behavior: "smooth" });
        e.preventDefault();
      }
    };
    scrollerElement.addEventListener("wheel", onWheel, { passive: false });
    return () => scrollerElement.removeEventListener("wheel", onWheel);
  }, [products.length]);

  return (
    <section className="home-products pc-wrap" aria-label={title}>
      <header className="pc-header">
        <h2 className="pc-title">{title}</h2>
      </header>

      {/* viewport relativo: flechas + hover/pause */}
      <div className="pc-viewport" ref={viewportRef}>
        <button
          className="pc-arrow pc-arrow--left"
          onClick={() => scrollByCards(-1)}
          aria-label="Anterior"
          type="button"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          className="pc-scroller"
          ref={scroller}
          onScroll={handleScroll}
          role="list"
          aria-label="Lista de productos"
        >
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
  );
}
