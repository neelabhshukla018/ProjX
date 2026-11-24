import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'project_manager',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useWorkspace();
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', width: '0%', color: 'bg-[#D8D8D8]' };
    if (pwd.length < 6) return { label: 'Too short', width: '25%', color: 'bg-[#5A5A5A]' };
    if (pwd.length < 9) return { label: 'Medium', width: '65%', color: 'bg-[#2C2C2C]' };
    return { label: 'Strong', width: '100%', color: 'bg-[#0F0F0F]' };
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms of Service';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      navigate('/app');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Proj<span className="text-[#0F0F0F] font-bold" style={{ fontFamily: '"Inter", "Segoe UI Symbol", "Apple Symbols", sans-serif' }}>𝕏</span>
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
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              error={errors.name}
              leftIcon={User}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. alex@projx.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
              leftIcon={Mail}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-[#0F0F0F] mb-1.5 tracking-tight">
                Select Your Role <span className="text-[#0F0F0F] font-bold">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'project_manager' })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.role === 'project_manager'
                      ? 'border-[#0F0F0F] bg-[#0F0F0F] text-white shadow-sm'
                      : 'border-[#D8D8D8] bg-white text-[#2C2C2C] hover:border-[#888888]'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Project Manager</div>
                  <div className={`text-[10px] mt-0.5 ${formData.role === 'project_manager' ? 'text-[#D0D0D0]' : 'text-[#777777]'}`}>
                    Creates & leads projects
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'team_member' })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.role === 'team_member'
                      ? 'border-[#0F0F0F] bg-[#0F0F0F] text-white shadow-sm'
                      : 'border-[#D8D8D8] bg-white text-[#2C2C2C] hover:border-[#888888]'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">Team Member</div>
                  <div className={`text-[10px] mt-0.5 ${formData.role === 'team_member' ? 'text-[#D0D0D0]' : 'text-[#777777]'}`}>
                    Applies & executes tasks
                  </div>
                </button>
              </div>
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                error={errors.password}
                leftIcon={Lock}
                required
              />

              {formData.password && (
                <div className="mt-1.5">
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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              error={errors.confirmPassword}
              leftIcon={Lock}
              required
            />

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
              Register & Launch Workspace
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
