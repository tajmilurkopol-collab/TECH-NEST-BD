import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const getPlanPrice = (item: CartItem) => item.selectedPlan.price ?? item.selectedPlan.marketPrice;
  const getPlanDuration = (item: CartItem) => item.selectedPlan.duration || item.selectedPlan.name;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPlanPrice(item) * item.quantity,
    0
  );

  // Bundle volume discount if 3+ items
  const discount = cartItems.length >= 3 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleWhatsAppCheckout = () => {
    const itemsList = cartItems
      .map(
        (i) =>
          `• ${i.product.name} (${getPlanDuration(i)}) x${i.quantity} = ${formatBDT(
            getPlanPrice(i) * i.quantity,
            language
          )}`
      )
      .join('\n');

    const message = `Hello Kyrops Digital, I would like to place an order for my cart:\n\n${itemsList}\n\nTotal Due: ${formatBDT(
      total,
      language
    )}\n\nPlease provide payment instructions and activation turnaround.`;

    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: message,
    });
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1e3533] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">{t.cartTitle}</h2>
              <span className="text-xs font-mono text-slate-400">
                ({cartItems.length} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">{t.cartEmpty}</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {t.cartEmptySub}
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.product.accentColor }}
                      />
                      <h4 className="text-sm font-bold text-white">
                        {item.product.name}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 block mb-2">
                      Plan: {getPlanDuration(item)} ({item.selectedPlan.accessType})
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-white font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-emerald-400 block">
                      {formatBDT(getPlanPrice(item) * item.quantity, language)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      @{formatBDT(getPlanPrice(item), language)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>{t.subtotal}:</span>
                  <span className="font-mono text-white">
                    {formatBDT(subtotal, language)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>{t.discount} (10% Multi-item):</span>
                    <span className="font-mono">
                      -{formatBDT(discount, language)}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800/80 flex justify-between text-base font-bold text-white">
                  <span>{t.total}:</span>
                  <span className="font-mono text-blue-400">
                    {formatBDT(total, language)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onProceedCheckout}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <span>{t.proceedCheckout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.placeOrderWhatsApp}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant local bKash, Nagad & Bank payments supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
