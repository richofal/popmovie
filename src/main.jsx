import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import StarRating from "./components/StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <App />
  // <StarRating max={10} color="#fcc419" size={40} />
);
