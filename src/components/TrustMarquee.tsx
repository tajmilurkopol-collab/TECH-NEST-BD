import React from 'react';
import { Sparkles, Terminal, Palette, TrendingUp, Briefcase, Building2, Headphones, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/i18n';

interface TrustMarqueeProps {
  language: Language;
}

export const TrustMarquee: React.FC<TrustMarqueeProps> = ({ language }) => {
  const t = translations[language];

  const marqueeItems = [
    { label: t.trustAi, icon: Sparkles, color: 'text-violet-400' },
    { label: t.trustSoftware, icon: Terminal, color: 'text-blue-400' },
    { label: t.trustCreative, icon: Palette, color: 'text-pink-400' },
    { label: t.trustMarketing, icon: TrendingUp, color: 'text-emerald-400' },
    { label: t.trustBusiness, icon: Briefcase, color: 'text-sky-400' },
    { label: t.trustIndustry, icon: Building2, color: 'text-amber-400' },
    { label: t.trustSupport, icon: Headphones, color: 'text-rose-400' },
    { label: 'BKASH · NAGAD · BDT', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  return (
    <div className="bg-transparent border-y border-white/10 overflow-hidden py-4 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-3 px-8 text-xs font-bold tracking-wider text-slate-300 uppercase"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.label}</span>
              <span className="text-slate-700 mx-2">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
