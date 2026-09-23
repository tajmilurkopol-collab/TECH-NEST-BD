import React, { useState, useMemo } from 'react';
import { Zap, Check, ArrowRight, ShoppingBag, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';
import { Language, Product } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface StackBuilderProps {
  products: Product[];
  language: Language;
  onAddStackToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const StackBuilder: React.FC<StackBuilderProps> = ({
  products,
  language,
  onAddStackToCart,
  onSelectProduct,
}) => {
  const t = translations[language];

  // Step 1: Role
  const [selectedRole, setSelectedRole] = useState<string>('designer');
  // Step 2: Needs
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['ai', 'design']);
  // Step 3: Budget
  const [selectedBudget, setSelectedBudget] = useState<string>('3to10k');

  const roles = [
    { id: 'student', label: t.roleStudent },
    { id: 'freelancer', label: t.roleFreelancer },
    { id: 'designer', label: t.roleDesigner },
    { id: 'video', label: t.roleVideo },
    { id: 'marketer', label: t.roleMarketer },
    { id: 'developer', label: t.roleDeveloper },
    { id: 'agency', label: t.roleAgency },
    { id: 'construction', label: t.roleConstruction },
    { id: 'garments', label: t.roleGarments },
    { id: 'corporate', label: t.roleCorporate },
  ];

  const needsList = [
    { id: 'ai', label: t.needAi },
    { id: 'design', label: t.needDesign },
    { id: 'video', label: t.needVideo },
    { id: 'marketing', label: t.needSeo },
    { id: 'business', label: t.needOffice },
    { id: 'developer', label: t.needCode },
    { id: 'industry', label: t.needErp },
  ];

  const budgetOptions = [
    { id: 'under1k', label: t.budgetUnder1k, max: 1000 },
    { id: '1to3k', label: t.budget1to3k, max: 3000 },
    { id: '3to10k', label: t.budget3to10k, max: 10000 },
    { id: 'over10k', label: t.budgetOver10k, max: 999999 },
  ];

  const toggleNeed = (needId: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(needId) ? prev.filter((id) => id !== needId) : [...prev, needId]
    );
  };

  // Compute recommended stack dynamically based on selections
  const recommendedProducts = useMemo(() => {
    let matched: Product[] = [];

    // Role-specific baseline priorities
    if (selectedRole === 'construction') {
      const p1 = products.find((p) => p.id === 'kyrops-construction-erp');
      const p2 = products.find((p) => p.id === 'autodesk-autocad');
      const p3 = products.find((p) => p.id === 'microsoft-365');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
    } else if (selectedRole === 'garments') {
      const p1 = products.find((p) => p.id === 'garments-textile-erp');
      const p2 = products.find((p) => p.id === 'google-workspace');
      const p3 = products.find((p) => p.id === 'adobe-creative-cloud');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
    } else if (selectedRole === 'developer') {
      const p1 = products.find((p) => p.id === 'cursor-pro');
      const p2 = products.find((p) => p.id === 'github-copilot');
      const p3 = products.find((p) => p.id === 'claude-pro');
      const p4 = products.find((p) => p.id === 'vercel-pro');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
      if (p4) matched.push(p4);
    } else if (selectedRole === 'video') {
      const p1 = products.find((p) => p.id === 'adobe-creative-cloud');
      const p2 = products.find((p) => p.id === 'capcut-pro');
      const p3 = products.find((p) => p.id === 'elevenlabs-creator');
      const p4 = products.find((p) => p.id === 'chatgpt-plus');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
      if (p4) matched.push(p4);
    } else if (selectedRole === 'marketer' || selectedRole === 'agency') {
      const p1 = products.find((p) => p.id === 'semrush-guru');
      const p2 = products.find((p) => p.id === 'canva-pro');
      const p3 = products.find((p) => p.id === 'chatgpt-plus');
      const p4 = products.find((p) => p.id === 'google-workspace');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
      if (p4) matched.push(p4);
    } else {
      // Default designer / freelancer
      const p1 = products.find((p) => p.id === 'adobe-creative-cloud');
      const p2 = products.find((p) => p.id === 'canva-pro');
      const p3 = products.find((p) => p.id === 'chatgpt-plus');
      const p4 = products.find((p) => p.id === 'notion-plus');
      if (p1) matched.push(p1);
      if (p2) matched.push(p2);
      if (p3) matched.push(p3);
      if (p4) matched.push(p4);
    }

    // Include extra tools if explicit needs were toggled
    if (selectedNeeds.includes('ai') && !matched.some((p) => p.category === 'ai')) {
      const aiTool = products.find((p) => p.id === 'chatgpt-plus');
      if (aiTool) matched.push(aiTool);
    }
    if (selectedNeeds.includes('marketing') && !matched.some((p) => p.category === 'marketing')) {
      const mktTool = products.find((p) => p.id === 'semrush-guru');
      if (mktTool) matched.push(mktTool);
    }

    // Deduplicate
    return Array.from(new Set(matched));
  }, [selectedRole, selectedNeeds, products]);

  // Price calculations
  const individualTotal = useMemo(() => {
    return recommendedProducts.reduce((sum, p) => sum + p.marketPrice, 0);
  }, [recommendedProducts]);

  // Bundle optimization: 20% discount on stack bundle
  const bundleCost = useMemo(() => {
    return Math.round(individualTotal * 0.8);
  }, [individualTotal]);

  const savings = individualTotal - bundleCost;

  const handleOrderStackWhatsApp = () => {
    const toolNames = recommendedProducts.map((p) => p.name).join(', ');
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: `Hello Kyrops Digital, I built my custom stack on your website for role: "${selectedRole}". Tools included: ${toolNames}. Stack bundle price: ${formatBDT(bundleCost, language)}. Please assist with activation!`,
    });
    window.open(link, '_blank');
  };

  return (
    <section id="stack-builder" className="py-24 bg-[#050B16] border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-semibold text-blue-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Signature Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
            {t.stackTitle}
          </h2>
          <p className="text-base text-slate-300">
            {t.stackSubtitle}
          </p>
        </div>

        {/* 3 Steps Wizard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8">
            {/* Step 1: Role */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">1</span>
                <span>{t.step1Title}</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {roles.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer truncate ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Capabilities / Needs */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-mono">2</span>
                <span>{t.step2Title}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {needsList.map((n) => {
                  const isChecked = selectedNeeds.includes(n.id);
                  return (
                    <button
                      key={n.id}
                      onClick={() => toggleNeed(n.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isChecked ? 'bg-white border-white' : 'border-slate-600'}`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />}
                      </div>
                      <span>{n.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Budget Range */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">3</span>
                <span>{t.step3Title}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {budgetOptions.map((b) => {
                  const isSelected = selectedBudget === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBudget(b.id)}
                      className={`p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Output Column (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#09162E] to-[#040C1A] border-2 border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 block mb-1">
                  Optimized Recommendation
                </span>
                <h3 className="text-xl font-bold text-white">
                  {t.stackResultTitle}
                </h3>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>

            {/* Recommended Tools List */}
            <div className="space-y-2.5 mb-8">
              {recommendedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: p.accentColor }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{p.name}</h4>
                      <span className="text-[10px] text-slate-400">
                        {language === 'bn' ? p.subcategoryBn : p.subcategory}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    {formatBDT(p.marketPrice, language)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Math */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/90 space-y-2.5 mb-6 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>{t.stackIndividualCost}:</span>
                <span className="font-mono line-through">
                  {formatBDT(individualTotal, language)}
                </span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                <span>{t.stackSavings} (20% Stack Deal):</span>
                <span className="font-mono">
                  - {formatBDT(savings, language)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between text-white">
                <span className="text-sm font-bold">{t.stackBundleCost}:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-blue-400">
                    {formatBDT(bundleCost, language)}
                  </span>
                  <span className="text-[11px] text-slate-400 block">/ month</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => onAddStackToCart(recommendedProducts)}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.stackAddAll} ({recommendedProducts.length} Tools)</span>
              </button>
              <button
                onClick={handleOrderStackWhatsApp}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.stackOrderWhatsApp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
