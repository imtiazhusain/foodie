import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "./store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster
          richColors
          position="top-right"
          toastOptions={{ className: "h-12 p-2" }}
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
