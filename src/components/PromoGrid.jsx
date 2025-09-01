// src/components/PromoGrid.jsx
import "../styles/PromoGrid.css";

export default function PromoGrid({ items = [] }) {
  return (
    <section className="promo-grid container" aria-label="Promociones">
      {items.map((it, i) => {
        const isBg = Boolean(it.useBg);
        const CardMedia = (
          <div
            className="promo-media"
            style={
              isBg
                ? {
                    
                    backgroundImage: `url("${it.imgUrl}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",

                    ...(it.imgAspect ? { aspectRatio: it.imgAspect } : null),
                  }
                : 
                  it.imgAspect
                ? { aspectRatio: it.imgAspect }
                : undefined
            }
          >
            {!isBg && (
              <img
                src={it.imgUrl}
                alt={it.imgAlt || it.title || "Promoción"}
                loading="lazy"
                decoding="async"
                
                srcSet={it.imgSrcSet}
                sizes={it.imgSizes}
                draggable={false}
              />
            )}
          </div>
        );

        const MediaWrapped = it.ctaHref ? (
          <a
            href={it.ctaHref}
            target={it.target || "_self"}
            rel={it.target === "_blank" ? "noopener noreferrer" : undefined}
            aria-label={it.imgAlt || it.title || "Ir a promoción"}
            className="promo-media-link"
          >
            {CardMedia}
          </a>
        ) : (
          CardMedia
        );

        return (
          <article
            key={i}
            className={`promo-card ${it.span === "wide" ? "is-wide" : ""}`}
          >
            {/* Columna de contenido */}
            <div className="promo-content">
              {it.badge && <span className="promo-badge">{it.badge}</span>}

              {it.title && <h3 className="promo-title">{it.title}</h3>}
              {it.subtitle && <p className="promo-subtitle">{it.subtitle}</p>}

              {it.ctaHref && (
                <a
                  href={it.ctaHref}
                  className="btn-orange"
                  target={it.target || "_self"}
                  rel={
                    it.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                >
                  {it.ctaLabel || "Comprar ahora"}
                </a>
              )}
            </div>

            {/* Columna imagen */}
            {MediaWrapped}
          </article>
        );
      })}
    </section>
  );
}
