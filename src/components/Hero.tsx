import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap, Terminal, Building2, ExternalLink } from 'lucide-react';
import { Language, Product } from '../types';
import { translations } from '../data/i18n';
import { formatBDT } from '../utils/helpers';
import heroImage from '../assets/hero-blue-orb.jpg';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onBuildStackClick: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreClick,
  onBuildStackClick,
  onSelectProduct,
  featuredProducts,
}) => {
  const t = translations[language];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateDhakaTime = () => {
      const now = new Date();
      // Formatted in Dhaka time (GMT+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const timeStr = now.toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', options);
      setCurrentTime(timeStr);
    };

    updateDhakaTime();
    const interval = setInterval(updateDhakaTime, 30000);
    return () => clearInterval(interval);
  }, [language]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Curated floating showcase cards with representative details
  const floatingCards = [
    {
      id: 'chatgpt-plus',
      name: 'ChatGPT Plus',
      category: 'AI Assistant',
      price: 450,
      badge: 'GPT-4o & o1',
      color: '#10A37F',
      position: 'top-10 left-4 lg:left-12',
      depth: 20,
    },
    {
      id: 'adobe-creative-cloud',
      name: 'Adobe Creative Cloud',
      category: 'All 20+ Desktop Apps',
      price: 1150,
      badge: 'Creative Suite',
      color: '#DC2626',
      position: 'top-12 right-4 lg:right-12',
      depth: 15,
    },
    {
      id: 'kyrops-construction-erp',
      name: 'Construction ERP',
      category: 'BOQ & Site DPR',
      price: 18500,
      badge: 'Civil Suite',
      color: '#16A34A',
      position: 'bottom-16 left-6 lg:left-14',
      depth: 25,
    },
    {
      id: 'claude-pro',
      name: 'Claude 3.5 Sonnet',
      category: 'AI Coding & Logic',
      price: 650,
      badge: '200k Context',
      color: '#D97706',
      position: 'bottom-20 right-6 lg:right-16',
      depth: 22,
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative z-10 overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-[#020b18] border-b border-white/10"
    >
      {/* Background Image: Just in Hero section as requested "as it is" */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroImage}
          alt="Digital Marketing, Website Development, Software Development"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft edge blend at the top and bottom so it fits cleanly with navbar and next section, leaving the central orb and hand intact as it is */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b18]/60 via-transparent to-[#020b18]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Appart-style Live Desk Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs text-slate-400 border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-300">
              Dhaka, Bangladesh · {currentTime || 'Live'} · Instant WhatsApp Desk
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>Official & Verified Market Tiers</span>
            <span aria-hidden="true">·</span>
            <span>bKash & Nagad BDT</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise SLA</span>
          </div>
        </div>

        {/* Central Hero Block */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-blue-400 mb-6 font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.heroEyebrow}</span>
          </div>

          {/* Dominant Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6 font-sans">
            <span className="block text-slate-100">{t.heroLine1}</span>
            <span className="block text-slate-100">{t.heroLine2}</span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              {t.heroHighlight}
            </span>
          </h1>

          {/* Subtitle with balanced wrap */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            {t.heroSub}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t.heroExploreCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onBuildStackClick}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{t.heroStackCta}</span>
            </button>
          </div>

          {/* Curated interactive floating preview cards (visible on desktop) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-2">
            {floatingCards.map((card) => {
              const matchedProduct = featuredProducts.find((p) => p.id === card.id);
              const offsetX = mousePos.x * card.depth;
              const offsetY = mousePos.y * card.depth;

              return (
                <div
                  key={card.id}
                  onClick={() => matchedProduct && onSelectProduct(matchedProduct)}
                  style={{
                    transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="group relative p-4 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer shadow-lg backdrop-blur-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                    <span className="text-[11px] font-mono text-slate-400">
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {card.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3 truncate">
                    {card.category}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">{t.startFrom}</span>
                    <span className="font-bold font-mono text-white">
                      {formatBDT(card.price, language)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
