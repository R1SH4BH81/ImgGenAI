import React, { useState } from "react";
import styles from "../AIImageGenerator.module.css";
import "./styles/save.css";

const ImageGrid = ({ images, downloadImage }) => {
  const [imageLoading, setImageLoading] = useState({});

  const handleImageLoad = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className={styles.imageGrid}>
      {images.map((img, index) => (
        <div className={styles.imageCard} key={index}>
          {imageLoading[index] !== false && (
            <div className={styles.imageLoading}>Loading...</div>
          )}
          <img
            src={img.url}
            alt={img.prompt}
            className={`${styles.generatedImage} ${imageLoading[index] !== false ? styles.hidden : ''}`}
            loading="lazy"
            onLoad={() => handleImageLoad(index)}
          />
          <div className={styles.imageInfo}>
            <div className={styles.imagePrompt}>"{img.prompt}"</div>
            <div className={styles.imageDetails}>
              <span>{img.resolution}</span>
              <span>{img.style} style</span>
              <span>{img.quality} quality</span>
            </div>
            <div className={styles.imageActions}>
              <div
                className="bookmarkBtn"
                onClick={() => downloadImage(img.url, img.prompt)}
              >
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="black"
                  >
                    <path d="m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
                <p className="text">Save</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
