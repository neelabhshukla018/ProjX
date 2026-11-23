import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, User } from 'lucide-react';
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
    if (!pwd) return { label: '', width: '0%', color: 'bg-[#D8D8D8]' };
    if (pwd.length < 6) return { label: 'Basic', width: '30%', color: 'bg-[#5A5A5A]' };
    if (pwd.length < 10) return { label: 'Medium', width: '65%', color: 'bg-[#2C2C2C]' };
    return { label: 'Strong', width: '100%', color: 'bg-[#0F0F0F]' };
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
      toast.success(`Account created! Welcome to Proj𝕏, ${formData.name}.`);
      navigate('/app');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#0F0F0F] selection:text-[#FFFFFF]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-lg bg-[#0F0F0F] border border-[#2C2C2C] flex items-center justify-center text-white shadow-sm relative">
            <Layers className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FFFFFF]" />
          </div>
          <span className="font-bold text-2xl text-[#0F0F0F] tracking-tight">
            Proj<span className="text-[#0F0F0F]">𝕏</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-[#0F0F0F] tracking-tight">
          Create your Proj𝕏 account
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5A5A] mt-1">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#0F0F0F] hover:text-[#5A5A5A] transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-[#FFFFFF] py-8 px-6 sm:px-8 border border-[#E5E5E5] rounded-xl shadow-card">
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
              <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
                Primary Team Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full text-xs sm:text-sm rounded-lg py-2.5 px-3 bg-[#FFFFFF] border border-[#D8D8D8] text-[#0F0F0F] outline-none focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]"
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
                  <div className="flex justify-between items-center text-[10px] text-[#5A5A5A] mb-1">
                    <span>Password Security</span>
                    <span className="font-semibold text-[#0F0F0F]">{strength.label}</span>
                  </div>
                  <div className="w-full bg-[#EFEFEF] h-1.5 rounded-full overflow-hidden">
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
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#5A5A5A] mt-2">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-[#B0B0B0] text-[#0F0F0F] focus:ring-[#0F0F0F]"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-[#0F0F0F] underline">Terms of Service</span> and{' '}
                  <span className="text-[#0F0F0F] underline">Privacy Policy</span>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-[#0F0F0F] mt-1 font-medium">{errors.agreeTerms}</p>
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
