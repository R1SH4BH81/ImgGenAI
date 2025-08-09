import styles from "./AIImageGenerator.module.css";
import GeneratorForm from "./components/GeneratorForm.jsx";
import ImageGrid from "./components/ImageGrid.jsx";
import Navbar from "./components/Navbar.jsx";
import React, { useState, useEffect } from "react";
import Toast from "./components/Toast.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./Login.jsx";
import { generateImageURLs, downloadImage } from "./utils/helpers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const AIImageGenerator = () => {
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState(null); // <-- added
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type) => {
    setToastMessage({ message, type, id: Date.now() });
  };
  const clearToast = () => setToastMessage(null);
  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setAvatar(docSnap.data().avatar);
        }
      }
    };
    fetchAvatar();
  }, [user]);

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

  // If user is not logged in, show login page
  if (!user) {
    return <Login setUser={setUser} showToast={showToast} />;
  }

  return (
    <>
      <Navbar user={user} avatar={avatar} setUser={setUser} />

      <div className={styles.container}>
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
      <Footer />
    </>
  );
};

export default AIImageGenerator;
