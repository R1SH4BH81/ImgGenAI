import styles from "./AIImageGenerator.module.css";
import Header from "./components/Header";
import GeneratorForm from "./components/GeneratorForm.jsx";
import ImageGrid from "./components/ImageGrid.jsx";

import React, { useState } from "react";
import Toast from "./components/Toast.jsx";

import {
  samplePrompts,
  generateImageURLs,
  downloadImage,
} from "./utils/helpers";

const AIImageGenerator = () => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type) => {
    setToastMessage({ message, type, id: Date.now() });
  };

  const clearToast = () => {
    setToastMessage(null);
  };
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [resolution, setResolution] = useState("512x512");
  const [quality, setQuality] = useState("standard");
  const [count, setCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [images, setImages] = useState([]);

  const generateImages = () => {
    if (!prompt.trim()) {
      showToast("Please enter a description for your image.", "error");
      return;
    }

    setIsGenerating(true);
    setImages([]);
    showToast("Generating your images... ", "info");

    setTimeout(() => {
      const newImages = generateImageURLs(
        prompt,
        style,
        resolution,
        quality,
        count
      );
      setImages(newImages);
      setIsGenerating(false);
      showToast(
        `Successfully generated ${count} image${count > 1 ? "s" : ""}!`,
        "success"
      );
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Header />

      <GeneratorForm
        prompt={prompt}
        setPrompt={setPrompt}
        style={style}
        setStyle={setStyle}
        resolution={resolution}
        setResolution={setResolution}
        quality={quality}
        setQuality={setQuality}
        count={count}
        setCount={setCount}
        generateImages={generateImages}
        isGenerating={isGenerating}
      />

      <div className={styles.resultsSection}>
        <ImageGrid images={images} downloadImage={downloadImage} />
        {toastMessage && (
          <Toast
            key={toastMessage.id}
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={clearToast}
          />
        )}
      </div>
    </div>
  );
};

export default AIImageGenerator;
