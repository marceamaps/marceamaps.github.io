import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Agentation } from "agentation";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
    {process.env.NODE_ENV === "development" && <Agentation />}
  </HashRouter>
);