import React, { useState } from 'react';
import { Package, Check, ArrowRight, ShoppingBag, MessageSquare, Zap } from 'lucide-react';
import { Bundle, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface BundleMarketplaceProps {
  bundles: Bundle[];
  language: Language;
  onSelectBundle: (bundle: Bundle) => void;
}

export const BundleMarketplace: React.FC<BundleMarketplaceProps> = ({
  bundles,
  language,
  onSelectBundle,
}) => {
  const t = translations[language];
  const [activeBundleId, setActiveBundleId] = useState<string>(bundles[0].id);

  const selectedBundle = bundles.find((b) => b.id === activeBundleId) || bundles[0];

  const handleWhatsAppBundle = (bundle: Bundle) => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: `Hello Kyrops Digital, I want to order the "${bundle.name}" (${formatBDT(bundle.bundlePrice, language)} / ${bundle.period}). Please send payment details and activation steps.`,
    });
    window.open(link, '_blank');
  };

  return (
    <section id="bundles" className="py-24 bg-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 block">
              Curated Stacks & Volume Deals
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
              {t.bundleTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              {t.bundleSubtitle}
            </p>
          </div>
        </div>

        {/* Bundle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bundles.map((bundle) => {
            const isSelected = activeBundleId === bundle.id;

            return (
              <div
                key={bundle.id}
                className="group rounded-3xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold font-mono uppercase bg-blue-950/80 text-blue-300 border border-blue-800/60">
                      {bundle.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      Save {formatBDT(bundle.savings, language)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {language === 'bn' ? bundle.nameBn : bundle.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-5">
                    {language === 'bn' ? bundle.targetAudienceBn : bundle.targetAudience}
                  </p>

                  {/* Included Tools Checklist */}
                  <div className="mb-6 space-y-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                      Tools Included:
                    </span>
                    {bundle.toolsIncluded.map((tool, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Order */}
                <div className="pt-5 border-t border-slate-800">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block line-through font-mono">
                        {t.individualTotal}: {formatBDT(bundle.individualTotal, language)}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-bold font-mono text-white">
                          {formatBDT(bundle.bundlePrice, language)}
                        </span>
                        <span className="text-xs text-slate-400">/ {bundle.period}</span>
                      </div>
                    </div>

                    <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold font-mono">
                      -{Math.round((bundle.savings / bundle.individualTotal) * 100)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectBundle(bundle)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.getBundle}</span>
                    </button>
                    <button
                      onClick={() => handleWhatsAppBundle(bundle)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mathematical Comparison Box (Single vs Bundle) */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 p-8 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {t.singleVsBundleTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.singleVsBundleSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Tool Column */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Purchased As Individual Tools
              </span>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex justify-between">
                  <span>Adobe Creative Cloud (1 Mo)</span>
                  <span className="font-mono text-slate-400">৳১,১৫০</span>
                </li>
                <li className="flex justify-between">
                  <span>Canva Pro (1 Mo)</span>
                  <span className="font-mono text-slate-400">৳১৫০</span>
                </li>
                <li className="flex justify-between">
                  <span>CapCut Pro Desktop (1 Mo)</span>
                  <span className="font-mono text-slate-400">৳৪৫০</span>
                </li>
                <li className="flex justify-between">
                  <span>ChatGPT Plus (1 Mo)</span>
                  <span className="font-mono text-slate-400">৳৪৫০</span>
                </li>
                <li className="flex justify-between">
                  <span>ElevenLabs Voice AI (1 Mo)</span>
                  <span className="font-mono text-slate-400">৳৭৫০</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-800 flex justify-between font-mono text-sm text-slate-400">
                <span>Total Separate:</span>
                <span className="line-through">৳২,৯৫০ / মাস</span>
              </div>
            </div>

            {/* Curated Stack Column */}
            <div className="p-6 rounded-2xl bg-blue-950/20 border-2 border-blue-500/50 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                  Creator Stack Ultimate Bundle
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Best Value
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                All 5 premium creative tools unified under one managed renewal date with dedicated priority replacement warranty.
              </p>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>Guaranteed Monthly Savings:</span>
                <span className="font-mono">৳৭৫০ সাশ্রয়</span>
              </div>

              <div className="pt-2 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Bundle Price:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-emerald-400">৳২,২০০</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
