import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, Shield, User } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useWorkspace();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const loggedUser = await login(email, password);
      navigate('/app');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (roleEmail, rolePassword) => {
    setEmail(roleEmail);
    setPassword(rolePassword);
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
            Proj<span className="text-[#0F0F0F] font-bold" style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span>
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
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. manager@projx.com"
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

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          {/* Role Guidance Helper */}
          <div className="mt-6 pt-5 border-t border-[#EFEFEF] text-center text-xs text-[#5A5A5A]">
            <p className="font-medium text-[#0F0F0F] mb-1">Supported User Roles</p>
            <div className="flex justify-center gap-3 mt-2 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F5F5F5] border border-[#E5E5E5] text-[#0F0F0F] font-semibold">
                <Shield className="w-3 h-3" /> Project Manager
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F5F5F5] border border-[#E5E5E5] text-[#0F0F0F] font-semibold">
                <User className="w-3 h-3" /> Team Member
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
