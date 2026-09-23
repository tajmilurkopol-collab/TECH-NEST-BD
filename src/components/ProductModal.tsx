import React, { useState } from 'react';
import { X, Check, ShoppingBag, MessageSquare, ShieldCheck, Clock, HelpCircle, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { Product, Plan, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface ProductModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, selectedPlan: Plan) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
}) => {
  const t = translations[language];
  const [selectedPlanId, setSelectedPlanId] = useState<string>(product?.plans[0]?.id || 'default');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const selectedPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];

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
    const planPrice = selectedPlan.price ?? selectedPlan.marketPrice;
    const link = generateWhatsAppLink({
      productName: product.name,
      planName: planDuration,
      price: planPrice,
      lang: language,
    });
    window.open(link, '_blank');
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

        {/* Header Row */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
            style={{ backgroundColor: `${product.accentColor}25` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-base"
              style={{ backgroundColor: product.accentColor }}
            >
              {product.name.charAt(0)}
            </div>
          </div>

          <div className="pr-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
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

        {/* Short Description & Recommendation */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {language === 'bn' ? product.descriptionBn : product.description}
        </p>

        {/* Key Attributes Bar (Activation Speed, Target, Warranty) */}
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
              {language === 'bn' ? (product.whoForBn || product.whoIsItForBn) : (product.whoFor || product.whoIsItFor || 'Professionals & Teams')}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">{t.modalSupport}</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Term Replacement</span>
            </span>
          </div>
        </div>

        {/* Plan Selection Radios / Segmented Buttons */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            {t.modalSelectPlan}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const displayDuration = plan.duration || plan.name;
              const displayPrice = plan.price ?? plan.marketPrice;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {displayDuration}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300">
                        {plan.accessType}
                      </span>
                    </div>
                    {plan.notes && (
                      <span className="text-[11px] text-slate-400 block">
                        {plan.notes}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono text-emerald-400 block">
                      {formatBDT(displayPrice, language)}
                    </span>
                    <span className="text-[10px] text-slate-400">Market Rate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature List */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            {t.modalIncluded}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(language === 'bn' ? product.featuresBn : product.features).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bangladesh Activation Protocol Note */}
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40 mb-8 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{t.modalActivationTitle}</span>
          </div>
          <ol className="list-decimal pl-4 space-y-1 text-slate-300">
            <li>{t.modalActivationStep1}</li>
            <li>{t.modalActivationStep2}</li>
            <li>{t.modalActivationStep3}</li>
          </ol>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block font-mono">Total Selected Plan:</span>
            <span className="text-2xl font-extrabold font-mono text-white">
              {formatBDT(selectedPlan.price ?? selectedPlan.marketPrice, language)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedSuccess ? t.addedToCart : t.addToCart}</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.orderWhatsApp}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
