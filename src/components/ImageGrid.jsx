import React from "react";
import styles from "../AIImageGenerator.module.css";

const ImageGrid = ({ images, downloadImage }) => {
  return (
    <div className={styles.imageGrid}>
      {images.map((img, index) => (
        <div className={styles.imageCard} key={index}>
          <img
            src={img.url}
            alt={img.prompt}
            className={styles.generatedImage}
            loading="lazy"
          />
          <div className={styles.imageInfo}>
            <div className={styles.imagePrompt}>"{img.prompt}"</div>
            <div className={styles.imageDetails}>
              <span>{img.resolution}</span>
              <span>{img.style} style</span>
              <span>{img.quality} quality</span>
            </div>
            <div className={styles.imageActions}>
              <button onClick={() => downloadImage(img.url, img.prompt)}>
                Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
