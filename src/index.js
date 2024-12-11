import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter,HashRouter  } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <BrowserRouter basename="/acne_website">
  //   <App />
  // </BrowserRouter>
  <HashRouter>
    <App />
  </HashRouter>
  
);

reportWebVitals();
