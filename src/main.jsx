import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/PageRouter.jsx";
import "./index.css";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";

axios.defaults.baseURL = "http://ccmm_react_ecommerce_backend.test";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
