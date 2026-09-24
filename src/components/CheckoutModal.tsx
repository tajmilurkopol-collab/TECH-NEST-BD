import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, MessageSquare, AlertCircle, Copy, Check } from 'lucide-react';
import { CartItem, Language, Order, User } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';
import { firebaseDbService } from '../services/firebaseDbService';
import { storageService } from '../utils/storageService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onOrderSuccess: () => void;
  currentUser?: User | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onOrderSuccess,
  currentUser,
}) => {
  const t = translations[language];

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'bank'>('bkash');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (!customerName && currentUser.name) setCustomerName(currentUser.name);
      if (!customerEmail && currentUser.email) setCustomerEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const getPlanPrice = (item: CartItem) => item.selectedPlan.price ?? item.selectedPlan.marketPrice;
  const getPlanDuration = (item: CartItem) => item.selectedPlan.duration || item.selectedPlan.name;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getPlanPrice(item) * item.quantity,
    0
  );
  const discount = cartItems.length >= 3 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerPhone) return;

    const ref = `KYR-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderRef(ref);

    const newOrder: Order = {
      id: ref,
      orderNumber: ref,
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      productNames: cartItems.map((i) => i.product.name),
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        planId: item.selectedPlan.id,
        planName: item.selectedPlan.name,
        price: getPlanPrice(item),
        quantity: item.quantity,
      })),
      totalAmount: subtotal,
      discount,
      netAmount: total,
      currency: 'BDT',
      paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',
      orderSource: 'direct_checkout',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save locally
    storageService.createOrder(newOrder);

    // Save to Firebase Firestore
    firebaseDbService.createOrder(newOrder).catch((err) => {
      console.warn('Firestore order sync:', err);
    });

    setOrderCompleted(true);
    onOrderSuccess();
  };

  const paymentNumbers = {
    bkash: '01969-101010 (bKash Personal / Send Money)',
    nagad: '01969-101010 (Nagad Personal / Send Money)',
    rocket: '01969-101010-4 (Rocket Personal)',
    bank: 'City Bank / BRAC Bank (Details sent via WhatsApp)',
  };

  const copyNumber = () => {
    navigator.clipboard.writeText('01969101010');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleLaunchWhatsAppOrder = () => {
    const itemsList = cartItems
      .map(
        (i) =>
          `• ${i.product.name} (${getPlanDuration(i)}) x${i.quantity}`
      )
      .join('\n');

    const message = `Hello Kyrops Digital, I placed order ${orderRef}:\n\nName: ${customerName}\nEmail for Activation: ${customerEmail}\nPhone: ${customerPhone}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nItems:\n${itemsList}\n\nTotal Paid/Due: ${formatBDT(
      total,
      language
    )}\n\nPlease verify and activate my subscription!`;

    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: message,
    });
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#1e3533] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderCompleted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                Bangladesh Checkout
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {t.checkoutTitle}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter your activation email address and select your preferred local payment method.
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t.customerName} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Tajmilur Rahman"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {t.customerEmail} *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@gmail.com or name@company.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Important: Official license invitations or credentials will be sent to this email.
                </span>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t.customerPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {t.customerCompany}
                  </label>
                  <input
                    type="text"
                    value={customerCompany}
                    onChange={(e) => setCustomerCompany(e.target.value)}
                    placeholder="Agency / Studio / Enterprise"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  {t.paymentMethod}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'bkash', label: 'bKash', color: 'text-pink-400' },
                    { id: 'nagad', label: 'Nagad', color: 'text-orange-400' },
                    { id: 'rocket', label: 'Rocket', color: 'text-purple-400' },
                    { id: 'bank', label: 'Bank Transfer', color: 'text-sky-400' },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <span className={method.color}>{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">Send money to:</span>
                    <span className="text-white font-mono font-bold">
                      {paymentNumbers[paymentMethod]}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyNumber}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] flex items-center gap-1 border border-slate-700"
                  >
                    {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Total Due Row */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-baseline justify-between pt-3">
                <span className="text-xs text-slate-300 font-semibold">{t.total}:</span>
                <span className="text-xl font-extrabold font-mono text-emerald-400">
                  {formatBDT(total, language)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.placeOrderDemo}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                Order Ref: {orderRef}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3 mb-1">
                {t.orderSuccessTitle}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                {t.orderSuccessDesc} Activation instructions have been staged for {customerEmail}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <span className="font-mono text-slate-400 uppercase text-[10px] block">Next Step:</span>
              <p className="text-slate-300">
                Please complete your {paymentMethod.toUpperCase()} transfer and click below to notify our desk with your Transaction ID for 15-minute activation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleLaunchWhatsAppOrder}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send TrxID via WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
