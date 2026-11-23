import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WorkspaceProvider } from './context/WorkspaceContext';
import AppRoutes from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <WorkspaceProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '12px',
              fontWeight: 500,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #1e293b',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <AppRoutes />
      </WorkspaceProvider>
    </BrowserRouter>
  );
}

export default App;
