import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Palette, Briefcase, Building2, Headphones } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/i18n';

interface BrandAppartEditorialProps {
  language: Language;
  onExploreSection: (catId: string) => void;
}

export const BrandAppartEditorial: React.FC<BrandAppartEditorialProps> = ({
  language,
  onExploreSection,
}) => {
  const t = translations[language];
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const chapters = [
    {
      num: t.chap1Num,
      title: t.chap1Title,
      desc: t.chap1Desc,
      icon: Sparkles,
      color: 'from-violet-600 to-indigo-600',
      tag: 'Next-Gen Intelligence',
      tools: ['ChatGPT Plus (o1 & GPT-4o)', 'Claude 3.5 Sonnet', 'Perplexity Pro', 'Midjourney v6.1'],
      catId: 'ai',
    },
    {
      num: t.chap2Num,
      title: t.chap2Title,
      desc: t.chap2Desc,
      icon: Palette,
      color: 'from-blue-600 to-cyan-600',
      tag: 'Visual & Motion',
      tools: ['Adobe Creative Cloud (20+ Apps)', 'Canva Pro Brand Kit', 'CapCut Pro Desktop', 'Figma Pro'],
      catId: 'creative',
    },
    {
      num: t.chap3Num,
      title: t.chap3Title,
      desc: t.chap3Desc,
      icon: Briefcase,
      color: 'from-sky-600 to-blue-700',
      tag: 'Corporate Infrastructure',
      tools: ['Microsoft 365 Business (1TB)', 'Google Workspace Gmail', 'Notion Plus & AI', 'HubSpot CRM'],
      catId: 'business',
    },
    {
      num: t.chap4Num,
      title: t.chap4Title,
      desc: t.chap4Desc,
      icon: Building2,
      color: 'from-emerald-600 to-teal-700',
      tag: 'Vertical ERP Systems',
      tools: ['Kyrops Construction ERP', 'Garments RMG Suite', 'Poultry Farm Layer ERP', 'Autodesk AutoCAD'],
      catId: 'industry',
    },
  ];

  return (
    <section className="py-24 bg-[#050B16] border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Headline */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3 block">
            Architecture & Vision
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] uppercase font-sans mb-6">
            <span>{t.editorialTitle}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {t.editorialSubtitle}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.editorialDesc}
          </p>
        </div>

        {/* Brand Appart-style Interactive Stacked Chapter Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Selector Tabs (Left Col) */}
          <div className="lg:col-span-5 space-y-3">
            {chapters.map((chap, idx) => {
              const isActive = activeChapter === idx;
              const Icon = chap.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900/90 border-blue-500/70 shadow-xl shadow-blue-950/40'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">
                      Chapter {chap.num}
                    </span>
                    <span className="text-xs font-medium text-blue-400">
                      {chap.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{chap.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {chap.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Chapter Visual Presentation (Right Col) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#071328] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Featured Sector / {chapters[activeChapter].num}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {chapters[activeChapter].title}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                  {React.createElement(chapters[activeChapter].icon, {
                    className: 'w-6 h-6 text-blue-400',
                  })}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                {chapters[activeChapter].desc}
              </p>

              {/* Verified Software Suite List */}
              <div className="mb-10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                  Standard Tools in This Stack
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {chapters[activeChapter].tools.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-medium truncate">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Ready for instant deployment in Bangladesh
                </span>
                <button
                  onClick={() => onExploreSection(chapters[activeChapter].catId)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <span>Explore Stack</span>
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
