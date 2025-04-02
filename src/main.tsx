import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Customers from './components/Customers.tsx';
import Trainings from './components/Trainings.tsx';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/customers', element: <Customers />},
  {path: '/trainings', element: <Trainings />}

]);

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
  
 
  )
