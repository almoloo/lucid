import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./error-page";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Create from "./views/Create";
import { Dreams } from "./views/Dreams";
import Dream from "./views/Dream";
import Explore from "./views/Explore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/dreams",
        element: <Dreams />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/dream/:id",
        element: <Dream />,
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};

export default App;
