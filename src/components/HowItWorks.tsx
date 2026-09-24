import React from 'react';
import { Search, SlidersHorizontal, CreditCard, Zap, CheckCircle2, ShieldCheck, Headphones, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/i18n';

interface HowItWorksProps {
  language: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const t = translations[language];

  const steps = [
    {
      num: '01',
      title: t.how1Title,
      desc: t.how1Desc,
      icon: Search,
      color: 'text-blue-400',
    },
    {
      num: '02',
      title: t.how2Title,
      desc: t.how2Desc,
      icon: SlidersHorizontal,
      color: 'text-indigo-400',
    },
    {
      num: '03',
      title: t.how3Title,
      desc: t.how3Desc,
      icon: CreditCard,
      color: 'text-emerald-400',
    },
    {
      num: '04',
      title: t.how4Title,
      desc: t.how4Desc,
      icon: Zap,
      color: 'text-amber-400',
    },
  ];

  const whyPoints = [
    {
      title: t.why1Title,
      desc: t.why1Desc,
      icon: CreditCard,
      badge: 'BDT Currency',
    },
    {
      title: t.why2Title,
      desc: t.why2Desc,
      icon: Zap,
      badge: '15-60 Mins',
    },
    {
      title: t.why3Title,
      desc: t.why3Desc,
      icon: Headphones,
      badge: 'Dhaka Team',
    },
    {
      title: t.why4Title,
      desc: t.why4Desc,
      icon: ShieldCheck,
      badge: 'Field Training',
    },
  ];

  return (
    <section className="py-24 bg-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: How it Works */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 block">
              Transparent Operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
              {t.howTitle}
            </h2>
            <p className="text-base text-slate-400">
              {t.howSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-extrabold font-mono text-slate-600">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
                        <Icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Why Businesses Choose Kyrops Digital */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
              Bangladesh Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
              {t.whyTitle}
            </h2>
            <p className="text-base text-slate-400">
              {t.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
