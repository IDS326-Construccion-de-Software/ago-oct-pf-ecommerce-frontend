import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/CategoryCarousel.css";


export default function CategoryCarousel({ title = "Nuestras categorías", categories = [] }) {
  const scroller = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft >= max - 2);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = () => {
    const card = scroller.current?.querySelector(".cat-card");
    return card ? card.offsetWidth * 2.5 : 600; 
  };

  const move = (dir) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  return (
    <section className="cat-wrap container">
      <header className="cat-header">
        <h2 className="cat-title">{title}</h2>
      </header>

      <div className="cat-viewport">
        <button
          className="cat-arrow cat-arrow--left"
          onClick={() => move(-1)}
          aria-label="Anterior"
          type="button"
          disabled={atStart}
        >
          <ChevronLeft size={28} />
        </button>

        <div className="cat-scroller" ref={scroller} role="list">
          {categories.map((c) => (
            <a key={c.id} href={c.href || "#"} className="cat-card" role="listitem">
              <div className="cat-media">
                {c.image ? (
                  <img src={c.image} alt={c.name} loading="lazy" />
                ) : (
                  <span className="cat-fallback">
                    {c.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map(s => s[0]?.toUpperCase())
                      .join("")}
                  </span>
                )}
              </div>
              <div className="cat-name">{c.name}</div>
            </a>
          ))}
        </div>

        <button
          className="cat-arrow cat-arrow--right"
          onClick={() => move(1)}
          aria-label="Siguiente"
          type="button"
          disabled={atEnd}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
