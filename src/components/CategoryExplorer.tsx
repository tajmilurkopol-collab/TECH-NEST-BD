import React from 'react';
import { ArrowRight, Sparkles, Palette, TrendingUp, Briefcase, Building2, Code2, Cpu, Headphones } from 'lucide-react';
import { Category, CategoryId, Language } from '../types';
import { translations } from '../data/i18n';

interface CategoryExplorerProps {
  categories: Category[];
  language: Language;
  onSelectCategory: (catId: CategoryId) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Palette,
  TrendingUp,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  Headphones,
};

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  categories,
  language,
  onSelectCategory,
}) => {
  const t = translations[language];

  return (
    <section id="categories" className="py-20 bg-[#050B16] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
              Curated Directory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
              {t.catTitle}
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            {t.catSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${cat.accentColor}18` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: cat.accentColor }} />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {cat.toolCount} {t.toolsAvailable}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">
                    {language === 'bn' ? cat.nameBn : cat.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {language === 'bn' ? cat.descriptionBn : cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-blue-400 transition-colors">
                  <span>{t.exploreCategory}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
