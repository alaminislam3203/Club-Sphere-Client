import './i18n';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router/dom';
import { router } from './routes/router';

import AuthProvider from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

/* 🔥 Theme initializer (important for dark mode) */
const ThemeInitializer = ({ children }) => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return children;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeInitializer>
          <RouterProvider router={router} />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                borderRadius: '12px',
                padding: '12px',
              },
            }}
          />
        </ThemeInitializer>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
