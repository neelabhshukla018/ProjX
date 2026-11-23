import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6 text-center text-[#0F0F0F] selection:bg-[#0F0F0F] selection:text-[#FFFFFF]">
      <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white mb-4 relative shadow-sm">
        <Layers className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FFFFFF]" />
      </div>
      <h1 className="text-5xl font-extrabold text-[#0F0F0F] mb-2 tracking-tight">404</h1>
      <h2 className="text-lg font-semibold text-[#2C2C2C] mb-1">Page not found</h2>
      <p className="text-xs text-[#5A5A5A] max-w-sm mb-6">
        The workspace route or resource you requested does not exist or has been relocated.
      </p>
      <Link to="/app">
        <Button variant="primary" leftIcon={ArrowLeft}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
