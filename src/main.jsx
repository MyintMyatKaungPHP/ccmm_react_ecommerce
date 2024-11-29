import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/PageRouter.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://ccmm_react_ecommerce_backend.test";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
