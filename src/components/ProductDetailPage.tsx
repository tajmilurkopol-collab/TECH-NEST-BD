import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  Clock,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Copy,
  CheckCircle2,
  Tag,
  Building2,
  Layers,
} from 'lucide-react';
import { Product, Plan, Language, Bundle } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';
import { ProductLogo } from './ProductLogo';
import { storageService } from '../utils/storageService';

interface ProductDetailPageProps {
  product: Product;
  language: Language;
  onBack: () => void;
  onAddToCart: (product: Product, plan: Plan) => void;
  onSelectProduct: (product: Product) => void;
  onSelectBundle: (bundle: Bundle) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  language,
  onBack,
  onAddToCart,
  onSelectProduct,
  onSelectBundle,
}) => {
  const t = translations[language];
  const [selectedPlanId, setSelectedPlanId] = useState<string>(product.plans[0]?.id || 'default');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const selectedPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];
  const currentPrice = selectedPlan.price ?? selectedPlan.marketPrice;

  // Related products from same category
  const allProducts = storageService.getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Related bundles
  const allBundles = storageService.getBundles();
  const relatedBundles = allBundles
    .filter((b) => b.toolsIncluded.some((t) => product.name.includes(t) || t.includes(product.name)))
    .slice(0, 2);

  const handleAddToCart = () => {
    onAddToCart(product, selectedPlan);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const planDuration = selectedPlan.duration || selectedPlan.name;
    const link = generateWhatsAppLink({
      productName: product.name,
      planName: planDuration,
      price: currentPrice,
      lang: language,
    });
    window.open(link, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050B16] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link' : 'Share Tool'}</span>
          </button>
        </div>

        {/* Hero Product Banner & Overview */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl relative overflow-hidden">
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 blur-3xl opacity-15 pointer-events-none rounded-full"
            style={{ backgroundColor: product.accentColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Left 2 Cols: Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-5 mb-6">
                <ProductLogo
                  name={product.name}
                  brand={product.brand}
                  logoUrl={product.logoUrl}
                  accentColor={product.accentColor}
                  size="xl"
                  className="shadow-2xl ring-2 ring-slate-800"
                />

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      {product.brand}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
                      {language === 'bn' ? product.subcategoryBn : product.subcategory}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-mono">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {product.name}
                  </h1>

                  {product.officialWebsite && (
                    <a
                      href={product.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 mt-2 transition-colors"
                    >
                      <span>Official Vendor Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                {language === 'bn' ? product.descriptionBn : product.description}
              </p>

              {/* Verified Information Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[11px]">Activation Speed</span>
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{product.activationSpeed || product.activationTime || '15 - 45 Minutes'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[11px]">Support / Warranty</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? product.supportPeriodBn : product.supportPeriod}</span>
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 text-[11px]">Rate Verified On</span>
                  <span className="font-semibold text-slate-300 font-mono">
                    {product.lastVerified || '2026-09-20'}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Key Included Capabilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === 'bn' ? product.featuresBn : product.features).map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sticky top-28 shadow-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-2">
                  Select Subscription Plan
                </span>

                {/* Plan Selector */}
                <div className="space-y-2.5 mb-6">
                  {product.plans.map((p) => {
                    const isSelected = p.id === selectedPlan.id;
                    const planPrice = p.price ?? p.marketPrice;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlanId(p.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">
                            {language === 'bn' ? p.nameBn : p.name}
                          </span>
                          <span className="text-sm font-black text-emerald-400 font-mono">
                            {formatBDT(planPrice, language)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{p.accessType} Access</span>
                          {p.officialPrice && (
                            <span className="line-through text-slate-500">
                              Official: {formatBDT(p.officialPrice, language)}
                            </span>
                          )}
                        </div>
                        {p.notes && (
                          <p className="text-[10px] text-slate-400 mt-1 italic">
                            {p.notes}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Summary */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-slate-400">TECH NEST BD Rate:</span>
                    <span className="text-2xl font-black text-white font-mono">
                      {formatBDT(currentPrice, language)}
                    </span>
                  </div>
                  {product.officialPrice && (
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Official Direct Price:</span>
                      <span className="line-through text-slate-500 font-mono">
                        {formatBDT(product.officialPrice, language)}
                      </span>
                    </div>
                  )}
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400">
                    <span>Payment Method:</span>
                    <span className="font-semibold">bKash / Nagad / Bank</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart & Checkout</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Bundles & Packages */}
        {relatedBundles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span>Featured Bundles Including {product.name}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedBundles.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onSelectBundle(b)}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-mono text-blue-400">
                        {b.targetAudience}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/60">
                        Save {formatBDT(b.savings, language)}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {language === 'bn' ? b.nameBn : b.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">
                      {language === 'bn' ? b.taglineBn : b.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-xs text-slate-400">
                      {b.toolsIncluded.join(' + ')}
                    </span>
                    <span className="text-base font-extrabold text-white font-mono">
                      {formatBDT(b.bundlePrice, language)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Category Tools */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">
              More {product.brand} & Alternative Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3.5 group"
                >
                  <ProductLogo
                    name={p.name}
                    brand={p.brand}
                    logoUrl={p.logoUrl}
                    accentColor={p.accentColor}
                    size="md"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">
                      {p.brand}
                    </p>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {formatBDT(p.marketPrice, language)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 text-xs text-slate-500 leading-relaxed text-center">
          <p>
            {language === 'bn'
              ? 'সকল প্রোডাক্টের নাম, লোগো এবং ট্রেডমার্ক তাদের নিজ নিজ কোম্পানির স্বত্ব। টেক নেস্ট বিডি একটি স্বাধীন ডিজিটাল টুলস মার্কেটপ্লেস ও সেবা প্রদানকারী।'
              : 'Product names, logos and trademarks belong to their respective owners. TECH NEST BD is an independent marketplace and software service provider unless otherwise stated.'}
          </p>
        </div>
      </div>
    </div>
  );
};
