import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Shield, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/i18n';
import { TechNestLogo } from './TechNestLogo';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040814]/85 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Official Falcon Logo from Image 2 */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group transition-transform hover:scale-102"
          >
            <TechNestLogo size="md" showTagline={true} />
          </a>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('marketplace')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navAi}
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navCreative}
          </button>
          <button
            onClick={() => handleNavClick('industries')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            {t.navIndustry}
          </button>
          <button
            onClick={() => handleNavClick('stack-builder')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap text-blue-400 hover:text-blue-300 font-semibold"
          >
            {t.navStackBuilder}
          </button>
          <button
            onClick={() => handleNavClick('bundles')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navBundles}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.navServices}
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search digital tools"
            className="p-2 sm:px-3 sm:py-1.5 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg flex items-center gap-2 text-xs transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline text-slate-400">Search tools...</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400">⌘K</kbd>
          </button>

          {/* Language Toggle: EN | বাংলা */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('bn')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer font-bn ${
                language === 'bn'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              বাংলা
            </button>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Cart"
            className="relative p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin catalogue inspector button */}
          <button
            onClick={onOpenAdmin}
            title="Inspect Catalogue Verification & Stock Status"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('stack-builder')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md shadow-emerald-950/40 transition-all cursor-pointer whitespace-nowrap"
          >
            {t.getStarted}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070e1c]/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNavClick('marketplace')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-slate-200 hover:bg-slate-800 transition"
            >
              {t.navAi}
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-slate-200 hover:bg-slate-800 transition"
            >
              {t.navCreative}
            </button>
            <button
              onClick={() => handleNavClick('industries')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-emerald-400 font-medium hover:bg-slate-800 transition"
            >
              {t.navIndustry}
            </button>
            <button
              onClick={() => handleNavClick('stack-builder')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-blue-400 font-medium hover:bg-slate-800 transition"
            >
              {t.navStackBuilder}
            </button>
            <button
              onClick={() => handleNavClick('bundles')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-slate-200 hover:bg-slate-800 transition"
            >
              {t.navBundles}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="p-2.5 bg-slate-900/80 rounded-lg text-left text-slate-200 hover:bg-slate-800 transition"
            >
              {t.navServices}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 bg-slate-800/80 rounded-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{t.adminMode}</span>
            </button>
            <button
              onClick={() => handleNavClick('stack-builder')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
