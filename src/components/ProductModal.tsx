import React, { useState } from 'react';
import {
  X,
  Check,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  Clock,
  HelpCircle,
  ExternalLink,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Product, Plan, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';
import { ProductLogo } from './ProductLogo';

interface ProductModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, selectedPlan: Plan) => void;
  onOpenDedicatedPage?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
  onOpenDedicatedPage,
}) => {
  const t = translations[language];
  const [selectedPlanId, setSelectedPlanId] = useState<string>(product?.plans[0]?.id || 'default');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const selectedPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];
  const currentPrice = selectedPlan.price ?? selectedPlan.marketPrice;

  const handleAddToCart = () => {
    onAddToCart(product, selectedPlan);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
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

  const handleViewFullPage = () => {
    onClose();
    if (onOpenDedicatedPage) {
      onOpenDedicatedPage(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#070F1E] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Row with Authentic Logo */}
        <div className="flex items-start gap-4 mb-6">
          <ProductLogo
            name={product.name}
            brand={product.brand}
            logoUrl={product.logoUrl}
            accentColor={product.accentColor}
            size="lg"
            className="ring-1 ring-slate-800"
          />

          <div className="pr-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {product.brand}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs font-medium text-emerald-400">
                {language === 'bn' ? product.subcategoryBn : product.subcategory}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {language === 'bn' ? product.descriptionBn : product.description}
        </p>

        {/* Key Attributes Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-6 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">{t.modalActivationTime}</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{product.activationSpeed || product.activationTime || '15 - 60 Minutes'}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">{t.modalWhoFor}</span>
            <span className="font-semibold text-white">
              {language === 'bn'
                ? product.whoForBn || product.whoIsItForBn
                : product.whoFor || product.whoIsItFor || 'Professionals & Teams'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">{t.modalSupport}</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? product.supportPeriodBn : product.supportPeriod}</span>
            </span>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              {t.modalSelectPlan}
            </h3>
            <span className="text-xs text-blue-400 font-medium">
              Access: {selectedPlan.accessType}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.plans.map((p) => {
              const isSelected = p.id === selectedPlan.id;
              const planPrice = p.price ?? p.marketPrice;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold block">
                        {language === 'bn' ? p.nameBn : p.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {p.accessType} Access · {p.period}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      {formatBDT(planPrice, language)}
                    </span>
                    {p.officialPrice && (
                      <span className="text-[10px] text-slate-500 line-through font-mono">
                        Official: {formatBDT(p.officialPrice, language)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">Selected Plan Rate:</div>
            <div className="text-2xl font-black text-white font-mono">
              {formatBDT(currentPrice, language)}
            </div>
          </div>
          <div className="text-xs text-slate-400 text-right">
            <div>Local Payment: <span className="text-emerald-400 font-semibold">bKash / Nagad</span></div>
            <div>Delivery: <span className="text-blue-400 font-semibold">{product.activationTime}</span></div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={handleAddToCart}
            className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
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
            className="py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 shadow-lg shadow-[#25D366]/20 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Order via WhatsApp</span>
          </button>
        </div>

        {/* Dedicated Page Link */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs">
          <button
            onClick={handleViewFullPage}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Open Dedicated Product Detail Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] text-slate-500">
            Trademarks belong to respective owners.
          </span>
        </div>
      </div>
    </div>
  );
};
