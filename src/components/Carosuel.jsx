import React, { useState, useEffect } from "react";
import "./styles/carousel.css";

export function CardCarousel({
  images,
  autoplayDelay = 0,
  showPagination = true,
  showNavigation = true,
}) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-play
  useEffect(() => {
    if (!autoplayDelay) return;
    const timer = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplayDelay]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {images.map((image, i) => (
          <div
            className={`carousel-card ${i === index ? "active" : ""}`}
            key={i}
          >
            <img src={image.src} alt={image.alt} />
            {/* <p className="card-title">{image.alt}</p> */}
          </div>
        ))}
      </div>

      {/* {showPagination && (
        <div className="pagination">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      )} */}
    </div>
  );
}
