import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Lead Architect',
    password: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', width: '0%', color: 'bg-slate-200' };
    if (pwd.length < 6) return { label: 'Weak', width: '25%', color: 'bg-rose-500' };
    if (pwd.length < 10) return { label: 'Medium', width: '60%', color: 'bg-amber-500' };
    return { label: 'Strong', width: '100%', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid work email';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Service';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Account created! Welcome to ProjX, ${formData.name}.`);
      navigate('/app');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-brand-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-violetAccent-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-2xl text-slate-900 tracking-tight">
            Proj<span className="text-brand-600">X</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Create your ProjX account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-8 border border-slate-200/90 rounded-2xl shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              leftIcon={User}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              leftIcon={Mail}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-tight">
                Primary Team Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full text-sm rounded-lg py-2.5 px-3 bg-white border border-slate-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="Lead Architect">Lead Architect / Engineering Manager</option>
                <option value="Senior Developer">Frontend / Full-Stack Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Product Designer">Product / UX Designer</option>
                <option value="DevOps Specialist">DevOps / SRE Lead</option>
              </select>
            </div>

            <div>
              <Input
                label="Create Password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                leftIcon={Lock}
                required
              />

              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                    <span>Password Strength</span>
                    <span className="font-semibold text-slate-700">{strength.label}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 mt-2">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-brand-600 underline">Terms of Service</span> and{' '}
                  <span className="text-brand-600 underline">Privacy Policy</span>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose-600 mt-1">{errors.agreeTerms}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
