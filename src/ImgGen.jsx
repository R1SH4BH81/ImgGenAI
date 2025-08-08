import styles from "./AIImageGenerator.module.css";
import Header from "./components/Header";
import GeneratorForm from "./components/GeneratorForm.jsx";
import ImageGrid from "./components/ImageGrid.jsx";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  samplePrompts,
  generateImageURLs,
  downloadImage,
} from "./utils/helpers";

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [resolution, setResolution] = useState("512x512");
  const [quality, setQuality] = useState("standard");
  const [count, setCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [images, setImages] = useState([]);

  const generateImages = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your image.");
      return;
    }

    setIsGenerating(true);
    setImages([]);
    toast.info("Generating your images... This may take a few moments.");

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
      toast.success(
        `Successfully generated ${count} image${count > 1 ? "s" : ""}!`
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
        <div className={styles.resultsHeader}>
          <h2>Generated Images</h2>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="toast-container"
        />

        <ImageGrid images={images} downloadImage={downloadImage} />
      </div>
    </div>
  );
};

export default AIImageGenerator;
