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
              background: '#0F0F0F',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #2C2C2C',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35)',
            },
            success: {
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#0F0F0F',
              },
            },
            error: {
              iconTheme: {
                primary: '#FFFFFF',
                secondary: '#0F0F0F',
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
