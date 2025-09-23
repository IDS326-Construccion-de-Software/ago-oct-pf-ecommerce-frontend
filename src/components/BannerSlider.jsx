import { useEffect, useRef, useState } from "react";
import "../styles/BannerSlider.css";

// importacion de banners
import bannerCarnes from "../assets/BannerCarnes.svg";
import bannerPromocional from "../assets/BannerPromocional.svg";
import bannerPan from "../assets/BannerPan.svg";
import bannerVinos from "../assets/BannerVinosRevenge.svg";

const SLIDES = [
  { src: bannerCarnes, alt: "Ofertas en carnes seleccionadas" },
  { src: bannerPromocional, alt: "Promociones de la semana" },
  { src: bannerPan,    alt: "Panadería fresca todos los días" },
  { src: bannerVinos,  alt: "Vinos para cada ocasión" },
];

export default function BannerSlider({
  autoPlay = true,
  delay = 5000,
  fit = "cover",
  rounded = true,
}) {
  const [index, setIndex] = useState(1); 
  const [transition, setTransition] = useState(true);
  const timer = useRef(null);
  const track = useRef(null);

  const slidesWithClones = [
    SLIDES[SLIDES.length - 1], 
    ...SLIDES,
    SLIDES[0], 
  ];

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    start();
    return stop;
  }, [index, autoPlay]);

  const start = () => {
    stop();
    timer.current = setTimeout(() => {
      next();
    }, delay);
  };
  const stop = () => timer.current && clearTimeout(timer.current);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  
  const handleTransitionEnd = () => {
    if (index === slidesWithClones.length - 1) {
      setTransition(false);
      setIndex(1); 
    } else if (index === 0) {
      setTransition(false);
      setIndex(SLIDES.length); 
    }
  };

 
  useEffect(() => {
    if (!transition) {
      const id = setTimeout(() => setTransition(true), 50);
      return () => clearTimeout(id);
    }
  }, [transition]);

  return (
    <section
      className={`banner ${rounded ? "rounded" : ""} fit-${fit}`}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <div
        className="track"
        ref={track}
        style={{
          transform: `translateX(${-index * 100}%)`,
          transition: transition ? "transform 0.6s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slidesWithClones.map((s, i) => (
          <div className="slide" key={i} aria-hidden={i !== index}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button className="nav prev" aria-label="Anterior" onClick={prev}>
        ‹
      </button>
      <button className="nav next" aria-label="Siguiente" onClick={next}>
        ›
      </button>

      {/* Puntos */}
      <div className="dots" role="tablist" aria-label="Banners">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i + 1 === index}
            className={`dot ${i + 1 === index ? "active" : ""}`}
            onClick={() => setIndex(i + 1)}
          />
        ))}
      </div>
    </section>
  );
}
