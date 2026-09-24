import React, { useState } from 'react';
import { Lock, Mail, ShieldAlert, ArrowLeft, KeyRound, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { TechNestLogo } from '../TechNestLogo';
import { storageService } from '../../utils/storageService';
import { User, UserRole } from '../../types';
import cosmicPurpleBg from '../../assets/cosmic-purple-bg.jpg';
import { firebaseDbService } from '../../services/firebaseDbService';

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

  const handleGoogleAdminSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { user, isAdmin } = await firebaseDbService.signInWithGoogle();
      if (isAdmin) {
        onLoginSuccess(user);
      } else {
        setError(`Signed in as ${user.email}, but this account is not registered in /admins collection. Please sign in with tajmilur.kopol@gmail.com.`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Cosmic Purple */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={cosmicPurpleBg}
          alt="Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

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

          {/* Direct Firebase Admin Sign-In */}
          <div className="mb-6 pb-6 border-b border-slate-800">
            <button
              type="button"
              onClick={handleGoogleAdminSignIn}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:scale-101 active:scale-99"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google (tajmilur.kopol@gmail.com)</span>
            </button>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">or sign in with credentials</span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>
          </div>

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
