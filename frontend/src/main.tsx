import React from "react";
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use App as the global layout for all pages
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(

      <RouterProvider router={router} />

)
