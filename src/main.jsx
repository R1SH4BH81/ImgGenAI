import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AIImageGenerator from "./ImgGen";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AIImageGenerator />
  </StrictMode>
);
