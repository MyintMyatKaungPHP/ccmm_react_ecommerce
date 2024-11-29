import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import DbLayout from "./DbLayout.jsx";
import DbHome from "../pages/dashboard/DbHome.jsx";
import DbProductCreate from "../pages/dashboard/DbProductCreate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "products/:id", // Avoid case sensitivity for paths
        element: <ProductDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin", // Add `path` for the DbLayout
    element: <DbLayout />,
    children: [
      {
        path: "dashboard",
        element: <DbHome />,
      },
      {
        path: "productCreate",
        element: <DbProductCreate />,
      },
    ],
  },
]);

export default router;
