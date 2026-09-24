import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, Zap, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { generateWhatsAppLink } from '../utils/helpers';

interface WhatsAppFloatingButtonProps {
  language: Language;
  onOpenStackBuilder: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  language,
  onOpenStackBuilder,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectWhatsApp = () => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: 'Hello Kyrops Digital, I would like to inquire about digital tools and software subscriptions in Bangladesh.',
      lang: language,
    });
    window.open(link, '_blank');
  };

  return (
    <>
      {/* Desktop Floating Actions (Scroll To Top & WhatsApp) */}
      <div className="hidden sm:flex flex-col items-end gap-3 fixed bottom-6 right-6 z-40">
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/90 hover:bg-blue-600 text-slate-200 hover:text-white rounded-full shadow-2xl border border-slate-700/80 hover:border-blue-500 transition-all hover:scale-105 cursor-pointer backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
            aria-label="Scroll to top"
            title={language === 'bn' ? 'উপরে যান' : 'Scroll to top'}
          >
            <ArrowUp className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold tracking-wide">
              {language === 'bn' ? 'উপরে যান' : 'Top'}
            </span>
          </button>
        )}

        <button
          onClick={handleDirectWhatsApp}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 cursor-pointer font-sans"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
          <span className="text-xs font-bold tracking-wide">
            {language === 'bn' ? 'WhatsApp সাপোর্ট' : 'WhatsApp Support'}
          </span>
        </button>
      </div>

      {/* Mobile Sticky CTA Bar with Top Jump */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0624]/95 backdrop-blur-md border-t border-purple-500/20 px-3 py-2 flex items-center justify-between gap-2 h-14">
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="p-2.5 bg-slate-800 border border-slate-700 text-blue-300 rounded-lg text-xs font-bold flex items-center justify-center shrink-0"
            aria-label="Scroll to top"
            title="উপরে যান"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={handleDirectWhatsApp}
          className="flex-1 py-2 px-3 bg-[#25D366] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp Desk</span>
        </button>

        <button
          onClick={onOpenStackBuilder}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Stack Builder</span>
        </button>
      </div>
    </>
  );
};
