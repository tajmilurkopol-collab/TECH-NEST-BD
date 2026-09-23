import React, { useState } from 'react';
import { Building2, Scissors, Wheat, Home, CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { IndustryId, Language, IndustrySolution } from '../types';
import { translations } from '../data/i18n';
import { generateWhatsAppLink } from '../utils/helpers';

interface IndustryShowcaseProps {
  industries: IndustrySolution[];
  language: Language;
  onOpenConsultationModal: (industry: IndustrySolution) => void;
}

export const IndustryShowcase: React.FC<IndustryShowcaseProps> = ({
  industries,
  language,
  onOpenConsultationModal,
}) => {
  const t = translations[language];
  const [selectedIndustryId, setSelectedIndustryId] = useState<IndustryId>('construction');

  const currentIndustry = industries.find((i) => i.id === selectedIndustryId) || industries[0];

  const industryTabs: { id: IndustryId; label: string; labelBn: string; icon: React.ElementType }[] = [
    { id: 'construction', label: 'Construction & Civil', labelBn: 'নির্মাণ ও সিভিল', icon: Building2 },
    { id: 'garments', label: 'Garments & RMG', labelBn: 'গার্মেন্টস ও টেক্সটাইল', icon: Scissors },
    { id: 'agro_poultry', label: 'Poultry & Layer Farm', labelBn: 'পোল্ট্রি ও লেয়ার খামার', icon: Wheat },
    { id: 'real_estate', label: 'Real Estate Developer', labelBn: 'রিয়েল এস্টেট', icon: Home },
  ];

  const handleCallConsultant = () => {
    window.location.href = `tel:${currentIndustry.phone.replace(/[^0-9]/g, '')}`;
  };

  const handleWhatsAppInquiry = () => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: `Hello Kyrops Digital, I am interested in your ${currentIndustry.name} software solutions (${currentIndustry.headline}). Please arrange a live demonstration for our company.`,
    });
    window.open(link, '_blank');
  };

  return (
    <section id="industries" className="py-24 bg-[#030712] border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
            Specialized Enterprise Verticals
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
            {t.indTitle}
          </h2>
          <p className="text-base text-slate-400">
            {t.indSubtitle}
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
          {industryTabs.map((tab) => {
            const isSelected = tab.id === selectedIndustryId;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustryId(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{language === 'bn' ? tab.labelBn : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Industry Presentation Banner (Inspired by User-supplied creatives) */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#071328] to-[#040B18] border border-slate-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge (e.g. 20 Years Experience / BGMEA Compliance) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold shadow-sm">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? currentIndustry.heroBadgeBn : currentIndustry.heroBadge}</span>
              </div>

              {/* Bold Industry Headline */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {language === 'bn' ? currentIndustry.taglineBn : currentIndustry.tagline}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase">
                  {language === 'bn' ? currentIndustry.headlineBn : currentIndustry.headline}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {language === 'bn' ? currentIndustry.descriptionBn : currentIndustry.description}
              </p>

              {/* Key Operational Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentIndustry.keyBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{language === 'bn' ? benefit.titleBn : benefit.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal pl-6">
                      {language === 'bn' ? benefit.descBn : benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Booking & Hotline Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'bn' ? currentIndustry.demoTextBn : currentIndustry.demoText}</span>
                </button>

                <button
                  onClick={handleCallConsultant}
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{currentIndustry.phone}</span>
                </button>
              </div>
            </div>

            {/* Right Stack Card Matrix */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {t.indIncludedStack}
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">
                  Verified Local Stacks
                </span>
              </div>

              <div className="space-y-3">
                {currentIndustry.tools.map((tool, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{tool.name}</span>
                        {tool.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">
                        {language === 'bn' ? tool.roleBn : tool.role}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-emerald-400 block">
                        {tool.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-center">
                <p className="text-xs text-slate-400 mb-2">
                  Need custom reports or on-site engineer installation?
                </p>
                <button
                  onClick={() => onOpenConsultationModal(currentIndustry)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Custom Specification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
