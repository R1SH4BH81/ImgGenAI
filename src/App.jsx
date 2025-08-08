import { useState } from "react";
import AIImageGenerator from "./ImgGen";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <AIImageGenerator />;
}

export default App;
