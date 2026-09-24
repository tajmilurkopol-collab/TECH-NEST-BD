import React, { useState } from 'react';
import { X, ShieldCheck, Mail, LogIn, LogOut, CheckCircle2, User as UserIcon, Sparkles } from 'lucide-react';
import { Language, User } from '../types';
import { firebaseDbService } from '../services/firebaseDbService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentUser: User | null;
  isAdmin: boolean;
  onLoginSuccess: (user: User) => void;
  onLogoutSuccess: () => void;
  onOpenAdmin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  currentUser,
  isAdmin,
  onLoginSuccess,
  onLogoutSuccess,
  onOpenAdmin,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isBn = language === 'bn';

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { user, isAdmin: isUserAdmin } = await firebaseDbService.signInWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await firebaseDbService.logout();
      onLogoutSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Logout error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#0c0926] border border-purple-500/30 rounded-3xl shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/60 hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* User Profile View */
          <div className="text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-600/30">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8" />}
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-xs font-semibold text-emerald-400 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAdmin ? (isBn ? 'সুপার অ্যাডমিন' : 'Verified Admin') : (isBn ? 'লগইন সক্রিয়' : 'Logged In')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{currentUser.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">{isBn ? 'অ্যাকাউন্ট রোল' : 'Account Role'}:</span>
                <span className="font-semibold text-purple-300">{currentUser.role || 'Customer'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isBn ? 'ডাটাবেজ স্ট্যাটাস' : 'Database Status'}:</span>
                <span className="font-semibold text-emerald-400">Firebase Firestore Active</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isBn ? 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন' : 'Open Admin Portal'}</span>
                </button>
              )}

              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-red-950/40 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-800/60 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isBn ? 'লগআউট করুন' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In View */
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-xs text-purple-300 font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Firebase Authentication</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                {isBn ? 'অ্যাকাউন্টে প্রবেশ করুন' : 'Sign In to Your Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {isBn
                  ? 'অর্ডার ট্র্যাকিং, সফটওয়্যার সাবস্ক্রিপশন এবং অ্যাডমিন ব্যবস্থাপনার জন্য গুগল দিয়ে সাইন ইন করুন।'
                  : 'Track your software activations, manage orders, and access administrative features.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800/60 text-red-300 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* Google Login Button */}
            <div className="space-y-3 pt-1">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-white/10 hover:scale-101 active:scale-99"
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
                <span>{loading ? (isBn ? 'প্রবেশ করা হচ্ছে...' : 'Signing in...') : (isBn ? 'Google দিয়ে সাইন ইন করুন' : 'Continue with Google')}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
              <span className="text-emerald-400 font-semibold">Admin Notice: </span>
              {isBn
                ? 'অনুমোদিত অ্যাডমিন (tajmilur.kopol@gmail.com) স্বয়ংক্রিয়ভাবে সুপার অ্যাডমিন অধিকার প্রাপ্ত হবেন।'
                : 'Authorized administrators (including tajmilur.kopol@gmail.com) are granted immediate Super Admin access upon signing in.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
