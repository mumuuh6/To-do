import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Authentication/router.jsx'; // Fixed import path
import { RouterProvider } from "react-router-dom";
import Authprovider from './pages/Authprovider.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
      <RouterProvider router={router} />
      </Authprovider>
      </QueryClientProvider>
    
  </StrictMode>,
);
