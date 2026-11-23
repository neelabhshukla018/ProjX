import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
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
    }, 500);
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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#0F0F0F] selection:text-[#FFFFFF]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-sm relative">
            <Layers className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
          </div>
          <span className="font-bold text-2xl text-[#0F0F0F] tracking-tight">
            Proj<span className="text-[#0F0F0F]">X</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">
          Sign in to your workspace
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Don't have an account yet?{' '}
          <Link
            to="/register"
            className="font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] transition-colors"
          >
            Create one for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-8 border border-[#E5E5E5] rounded-xl shadow-card">
          {/* Quick Demo Access Pill */}
          <div className="mb-6 p-3 bg-[#0F0F0F] border border-[#2C2C2C] rounded-lg flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFFFFF] shrink-0" />
              <span className="font-medium text-xs">Explore as Lead Architect</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="font-bold text-xs text-[#0F0F0F] bg-[#FFFFFF] hover:bg-[#E5E5E5] px-2.5 py-1 rounded transition-colors"
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
              <label className="flex items-center gap-2 cursor-pointer text-[#5A5A5A]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#B0B0B0] text-[#0F0F0F] focus:ring-[#0F0F0F]"
                />
                <span>Remember me for 30 days</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-[#2C2C2C] hover:text-[#0F0F0F] transition-colors"
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

          <div className="mt-6 pt-5 border-t border-[#EFEFEF] text-center">
            <Link
              to="/app"
              className="text-xs text-[#5A5A5A] hover:text-[#0F0F0F] font-medium transition-colors"
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
