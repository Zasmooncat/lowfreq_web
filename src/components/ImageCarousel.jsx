import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Avanza la imagen cada X segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-screen h-screen  overflow-hidden">
      {images.map((img, index) => (
        <img
          loading="lazy"
          key={index}
          src={img}
          alt={`carousel-${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000  ${
            index === currentIndex ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
