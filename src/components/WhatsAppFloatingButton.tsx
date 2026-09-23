import React from 'react';
import { MessageSquare, PhoneCall, Zap } from 'lucide-react';
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
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
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

      {/* Mobile Sticky CTA Bar (compliant with 15% viewport height rule - single line, height 56px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070F1E]/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 flex items-center justify-between gap-2.5 h-14">
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
