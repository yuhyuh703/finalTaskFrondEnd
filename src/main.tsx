import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.tsx"; // Import routes

const router = createHashRouter(routes, {
  basename: "/finalTaskFrondEnd" // Add this line for GitHub Pages
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);