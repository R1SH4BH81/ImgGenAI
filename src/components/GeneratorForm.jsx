import React from "react";
import styles from "../AIImageGenerator.module.css";
import "./styles/Button.css";
import { samplePrompts } from "../utils/helpers";

const GeneratorForm = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  resolution,
  setResolution,
  quality,
  setQuality,
  count,
  setCount,
  generateImages,
  isGenerating,
}) => {
  const handleSurpriseMe = () => {
    const randomPrompt =
      samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(randomPrompt);
  };
  return (
    <div className={styles.generatorSection}>
      <div className={styles.inputGroup}>
        <textarea
          id="prompt"
          className={styles.promptInput}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
        />
        <div
          type="button"
          onClick={handleSurpriseMe}
          className={styles.surpriseMeBtn}
        >
          {" "}
          <div className={styles.imageActions}>Surprise Me</div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="style">Art Style</label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className={styles.controlInput}
          >
            <option value="realistic">Realistic</option>
            <option value="artistic">Artistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="abstract">Abstract</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="resolution">Resolution</label>
          <select
            id="resolution"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className={styles.controlInput}
          >
            <option value="512x512">512 × 512</option>
            <option value="768x768">768 × 768</option>
            <option value="1024x1024">1024 × 1024</option>
            <option value="1536x1024">1536 × 1024</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="quality">Quality</label>
          <select
            id="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className={styles.controlInput}
          >
            <option value="standard">Standard</option>
            <option value="high">High</option>
            <option value="ultra">Ultra</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="count">Number of Images</label>
          <select
            id="count"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className={styles.controlInput}
          >
            <option value="1">1 Image</option>
            <option value="2">2 Images</option>
            <option value="4">4 Images</option>
          </select>
        </div>
      </div>

      <div className={styles.imageActions}>
        <button
          className="btn"
          onClick={generateImages}
          disabled={isGenerating}
        >
          <svg
            height="24"
            width="24"
            fill="#FFFFFF"
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            class="sparkle"
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>

          <span class="text">Generate</span>
        </button>
      </div>
    </div>
  );
};

export default GeneratorForm;
