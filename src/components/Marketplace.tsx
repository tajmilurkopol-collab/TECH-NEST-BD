import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag, MessageSquare, Check, ArrowRight, Sparkles, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Product, CategoryId, Language, AccessType } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface MarketplaceProps {
  products: Product[];
  language: Language;
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (catId: CategoryId | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  language,
  selectedCategory,
  onCategoryChange,
  onSelectProduct,
  onAddToCart,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccessType, setSelectedAccessType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low' | 'newest'>('popular');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Access type filter
      if (selectedAccessType !== 'all') {
        const matchesAccess = product.plans.some((p) => p.accessType === selectedAccessType) || product.accessType === selectedAccessType;
        if (!matchesAccess) return false;
      }

      // Search query across name, brand, description, and keywords
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query) || product.descriptionBn.includes(query);
        const matchSub = product.subcategory.toLowerCase().includes(query) || product.subcategoryBn.includes(query);
        const matchIndustry = product.industry ? product.industry.toLowerCase().includes(query) : false;
        if (!matchName && !matchBrand && !matchDesc && !matchSub && !matchIndustry) {
          return false;
        }
      }

      return true;
    });

    // Sort order
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.marketPrice - b.marketPrice);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.marketPrice - a.marketPrice);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedAccessType, searchQuery, sortBy]);

  const handleAddCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  const handleWhatsAppClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const link = generateWhatsAppLink({
      productName: product.name,
      price: product.marketPrice,
      lang: language,
    });
    window.open(link, '_blank');
  };

  const categoriesList: { id: CategoryId | 'all'; label: string; labelBn: string }[] = [
    { id: 'all', label: 'All Tools', labelBn: 'সব টুলস' },
    { id: 'ai', label: 'AI Tools', labelBn: 'এআই' },
    { id: 'creative', label: 'Creative', labelBn: 'ক্রিয়েটিভ' },
    { id: 'marketing', label: 'Marketing', labelBn: 'মার্কেটিং' },
    { id: 'business', label: 'Business', labelBn: 'বিজনেস' },
    { id: 'industry', label: 'Industry ERP', labelBn: 'ইন্ডাস্ট্রি' },
    { id: 'developer', label: 'Developer', labelBn: 'ডেভেলপার' },
    { id: 'apis', label: 'APIs & Cloud', labelBn: 'এপিআই' },
    { id: 'services', label: 'IT Services', labelBn: 'সার্ভিস' },
  ];

  return (
    <section id="marketplace" className="py-20 bg-[#050B16] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 block">
              Marketplace Catalogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans">
              {t.marketTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {t.marketSubtitle}
            </p>
          </div>

          {/* Pricing Model Notice */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">{t.priceDisclaimer}</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 hidden sm:inline">{t.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="low-high">{t.sortPriceLow}</option>
                <option value="high-low">{t.sortPriceHigh}</option>
                <option value="newest">{t.sortNewest}</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {language === 'bn' ? cat.labelBn : cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-slate-900/30 border border-slate-800/80">
            <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No digital tools found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              We couldn't find any tool matching "{searchQuery}". Try searching for ChatGPT, Adobe, AutoCAD, or Garments.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
                setSelectedAccessType('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-400 bg-blue-950/50 border border-blue-800/60 rounded-lg hover:bg-blue-900/50"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isFeatured = product.isFeatured;
              const hasBadge = !!product.badge;
              const isAdded = addedAnimationId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className={`group relative rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isFeatured
                      ? 'bg-gradient-to-b from-slate-900/90 to-[#071328] border-2 border-blue-500/50 shadow-xl shadow-blue-950/20 hover:border-blue-400'
                      : 'bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Brand & Verification */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>BD Stock</span>
                        </span>
                      </div>

                      {hasBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono uppercase bg-blue-950/80 text-blue-300 border border-blue-800/60">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5 flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: product.accentColor }}
                      />
                      <span className="truncate">{product.name}</span>
                    </h3>

                    {/* Subcategory */}
                    <p className="text-xs font-medium text-slate-400 mb-3">
                      {language === 'bn' ? product.subcategoryBn : product.subcategory}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-5">
                      {language === 'bn' ? product.shortDescriptionBn : product.shortDescription}
                    </p>

                    {/* Feature Bullets (for featured card) */}
                    {isFeatured && (
                      <div className="mb-5 space-y-1.5 pt-3 border-t border-slate-800/80">
                        {(language === 'bn' ? product.featuresBn : product.features).slice(0, 2).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Pricing & Actions */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block uppercase font-mono">
                          {t.marketPriceLabel}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-bold font-mono text-white">
                            {formatBDT(product.marketPrice, language)}
                          </span>
                          <span className="text-xs text-slate-400">
                            / {product.billingPeriod === 'One-Time' ? 'Once' : 'mo'}
                          </span>
                        </div>
                      </div>

                      {product.officialPrice && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-mono">Official</span>
                          <span className="text-xs font-mono text-slate-400 line-through">
                            {formatBDT(product.officialPrice, language)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => handleAddCartClick(e, product)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.addedToCart}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t.addToCart}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleWhatsAppClick(e, product)}
                        className="py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-950"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                    {/* View Details link */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full mt-2 py-1 text-center text-[11px] text-slate-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{t.viewPlan}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
