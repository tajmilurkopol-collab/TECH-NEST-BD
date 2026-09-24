import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  MessageSquare,
  Check,
  ArrowRight,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Tag,
  Eye,
} from 'lucide-react';
import { Product, CategoryId, Language, AccessType } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';
import { ProductLogo } from './ProductLogo';
import { storageService } from '../utils/storageService';

interface MarketplaceProps {
  products: Product[];
  language: Language;
  selectedCategory: CategoryId | 'all';
  onCategoryChange: (catId: CategoryId | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenDedicatedPage?: (product: Product) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  language,
  selectedCategory,
  onCategoryChange,
  onSelectProduct,
  onAddToCart,
  onOpenDedicatedPage,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccessType, setSelectedAccessType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'low-high' | 'high-low' | 'newest'>('popular');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Dynamic categories from storage
  const activeCategories = storageService.getCategories();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Must only show published or status-less products on public storefront
      if (product.status && product.status !== 'published') {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Access type filter
      if (selectedAccessType !== 'all') {
        const matchesAccess =
          product.plans.some((p) => p.accessType === selectedAccessType) ||
          product.accessType === selectedAccessType;
        if (!matchesAccess) return false;
      }

      // Search query across name, brand, description, and keywords
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchDesc =
          product.description.toLowerCase().includes(query) ||
          (product.descriptionBn && product.descriptionBn.includes(query));
        const matchSub =
          product.subcategory.toLowerCase().includes(query) ||
          (product.subcategoryBn && product.subcategoryBn.includes(query));
        const matchIndustry = product.industry
          ? product.industry.toLowerCase().includes(query)
          : false;
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

  const handleCardClick = (product: Product) => {
    if (onOpenDedicatedPage) {
      onOpenDedicatedPage(product);
    } else {
      onSelectProduct(product);
    }
  };

  return (
    <section id="marketplace" className="py-20 bg-transparent border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2 block font-semibold">
              Marketplace Catalogue
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-sans">
              {t.marketTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {t.marketSubtitle}
            </p>
          </div>

          {/* Pricing Model Notice */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 max-w-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">
              Official Vendor rates verified. Instant delivery with Bangladeshi bKash/Nagad support.
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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

          {/* Dynamic Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {language === 'bn' ? 'সব টুলস' : 'All Tools'}
            </button>

            {activeCategories.map((cat) => {
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
                  {language === 'bn' ? cat.nameBn : cat.name}
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
              We couldn't find any tool matching "{searchQuery}". Try searching for ChatGPT, Claude, Canva, or Photoshop.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
                setSelectedAccessType('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-400 bg-blue-950/50 border border-blue-800/60 rounded-lg hover:bg-blue-900/50 cursor-pointer"
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
                  onClick={() => handleCardClick(product)}
                  className={`group relative rounded-3xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isFeatured
                      ? 'bg-gradient-to-b from-slate-900/90 to-[#071328] border-2 border-blue-500/50 shadow-xl shadow-blue-950/20 hover:border-blue-400'
                      : 'bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top Row: Product Official Logo + Brand Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <ProductLogo
                          name={product.name}
                          brand={product.brand}
                          logoUrl={product.logoUrl}
                          accentColor={product.accentColor}
                          size="md"
                        />
                        <div>
                          <span className="text-[11px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                            {product.brand}
                          </span>
                          <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {hasBadge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider font-mono uppercase bg-blue-950/90 text-blue-300 border border-blue-800/60 shrink-0">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Subcategory Tag */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 border border-slate-800 text-slate-300">
                        {language === 'bn' ? product.subcategoryBn : product.subcategory}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Instant Delivery</span>
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {language === 'bn' ? product.shortDescriptionBn : product.shortDescription}
                    </p>

                    {/* Key Feature Bullets (2 max) */}
                    <div className="space-y-1.5 mb-5">
                      {(language === 'bn' ? product.featuresBn : product.features)
                        .slice(0, 2)
                        .map((f, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                            <Check className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                            <span className="truncate">{f}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Bottom: Pricing & Actions */}
                  <div>
                    {/* Clear Price Comparison */}
                    <div className="pt-3 border-t border-slate-800/80 mb-4 flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">TECH NEST BD Rate:</div>
                        <div className="text-lg font-black text-emerald-400 font-mono">
                          {formatBDT(product.marketPrice, language)}
                          <span className="text-[11px] font-sans text-slate-400 font-normal ml-1">
                            /{product.billingPeriod || 'mo'}
                          </span>
                        </div>
                      </div>

                      {product.officialPrice && (
                        <div className="text-right">
                          <div className="text-[9px] text-slate-500 uppercase font-mono">Official Direct</div>
                          <div className="text-xs text-slate-400 line-through font-mono">
                            {formatBDT(product.officialPrice, language)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button Row */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => handleAddCartClick(e, product)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/20'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleWhatsAppClick(e, product)}
                        title="Instant WhatsApp Order"
                        className="py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
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
