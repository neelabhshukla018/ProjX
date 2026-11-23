import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 mb-4">
        <Layers className="w-6 h-6" />
      </div>
      <h1 className="text-5xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-lg font-semibold text-slate-700 mb-1">Page not found</h2>
      <p className="text-xs text-slate-500 max-w-sm mb-6">
        The workspace path or resource you requested does not exist or has been moved.
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
