import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/variables.css";
import "./styles/global.css";

import App from "./App.jsx";

/*
  main.jsx é o ponto de entrada da aplicação React.

  Ele conecta o React ao elemento <div id="root"></div>,
  que fica no arquivo index.html gerado pelo Vite.
*/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);