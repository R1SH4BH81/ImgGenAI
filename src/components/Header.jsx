import React from "react";
import styles from "../AIImageGenerator.module.css";

const Header = () => (
  <div className={styles.header}>
    <h1 style={{ textShadow: "1px 1px 4px #683fea" }}>AI Image Generator</h1>
    <p>
      Create stunning images from text descriptions using advanced AI technology
    </p>
  </div>
);

export default Header;
