import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Authentication/router.jsx'; // Fixed import path
import { RouterProvider } from "react-router-dom";
import Authprovider from './pages/Authprovider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <Authprovider>
      <RouterProvider router={router} />
      </Authprovider>
    
  </StrictMode>,
);
