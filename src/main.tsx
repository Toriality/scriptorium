import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app";
import "./lib/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");
