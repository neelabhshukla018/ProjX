import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Welcome back to ProjX!');
      navigate('/app');
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('alex.morgan@projx.io');
    setPassword('secret-password');
    toast.success('Signed in as Alex Morgan (Demo)');
    navigate('/app');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.success('Password reset instructions sent to your email.');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-brand-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-2xl text-slate-900 tracking-tight">
            Proj<span className="text-brand-600">X</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Sign in to your workspace
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Create one for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/90 rounded-2xl shadow-card">
          {/* Quick Demo Access Pill */}
          <div className="mb-6 p-3 bg-brand-50/70 border border-brand-200/60 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-brand-900">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Explore as Lead Architect</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="font-semibold text-brand-600 hover:text-brand-800 bg-white px-2.5 py-1 rounded-md border border-brand-200 shadow-2xs transition-colors"
            >
              1-Click Demo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              placeholder="alex.morgan@projx.io"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
              leftIcon={Mail}
              required
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                error={errors.password}
                leftIcon={Lock}
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember me for 30 days</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-brand-600 hover:text-brand-800 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Sign In to Workspace
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link
              to="/app"
              className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Skip directly to Dashboard preview →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
