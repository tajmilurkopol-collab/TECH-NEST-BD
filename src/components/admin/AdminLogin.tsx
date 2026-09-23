import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound, CheckCircle, ShieldCheck } from 'lucide-react';
import { TechNestLogo } from '../TechNestLogo';
import { storageService } from '../../utils/storageService';
import { User, UserRole } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (user: User) => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [email, setEmail] = useState('admin@technestbd.com');
  const [password, setPassword] = useState('TechNest@2026');
  const [role, setRole] = useState<UserRole>('Super Admin');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      const res = storageService.login(email, role);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Authentication failed. Please verify administrative email.');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickFill = (demoEmail: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword('TechNest@2026');
    setRole(demoRole);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Back to store navigation */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <TechNestLogo size="lg" showTagline={true} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-4">
            Enterprise CMS & Admin Console
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Authorized Dhaka operations, catalogue management & order processing
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-300 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@technestbd.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Master Security Key / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Operational Role Session
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Super Admin">Super Admin (Full Platform Control)</option>
                <option value="Product Manager">Product Manager (Catalogue & Pricing)</option>
                <option value="Order Manager">Order Manager (Orders & Customers)</option>
                <option value="Content Editor">Content Editor (Homepage & Translations)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to CMS Portal'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
              Instant Staff Credentials Switcher
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@technestbd.com', 'Super Admin')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-left transition-colors"
              >
                <div className="font-semibold text-blue-400">Super Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@technestbd.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('manager@technestbd.com', 'Product Manager')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-left transition-colors"
              >
                <div className="font-semibold text-emerald-400">Product Manager</div>
                <div className="text-[10px] text-slate-500 truncate">manager@technestbd.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('orders@technestbd.com', 'Order Manager')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-left transition-colors"
              >
                <div className="font-semibold text-amber-400">Order Manager</div>
                <div className="text-[10px] text-slate-500 truncate">orders@technestbd.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('editor@technestbd.com', 'Content Editor')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-left transition-colors"
              >
                <div className="font-semibold text-purple-400">Content Editor</div>
                <div className="text-[10px] text-slate-500 truncate">editor@technestbd.com</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security watermark */}
        <div className="text-center mt-6 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>TECH NEST BD Internal Administration • Dhaka Secure Zone</span>
        </div>
      </div>
    </div>
  );
};
