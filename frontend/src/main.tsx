import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store/store';

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
      // other routes can go here
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
