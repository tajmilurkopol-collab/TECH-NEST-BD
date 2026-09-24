import React from 'react';
import { Mail, Code2, MessageSquare, Shield, Headphones, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { ITServiceItem, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT, generateWhatsAppLink } from '../utils/helpers';

interface ITServicesProps {
  services: ITServiceItem[];
  language: Language;
  onConsultationRequest: (service: ITServiceItem) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  Mail,
  Code2,
  MessageSquare,
  Shield,
  Headphones,
};

export const ITServices: React.FC<ITServicesProps> = ({
  services,
  language,
  onConsultationRequest,
}) => {
  const t = translations[language];

  const handleWhatsAppService = (srv: ITServiceItem) => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: `Hello Kyrops Digital, I am inquiring about your IT service: "${srv.title}". We would like to discuss requirements and get a project proposal.`,
    });
    window.open(link, '_blank');
  };

  return (
    <section id="services" className="py-24 bg-transparent border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Heading */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 block">
            Enterprise Technology & Implementation
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-base text-slate-400">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((srv) => {
            const Icon = serviceIcons[srv.icon] || Code2;

            return (
              <div
                key={srv.id}
                className="group rounded-3xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-7 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      {language === 'bn' ? srv.categoryBn : srv.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    {language === 'bn' ? srv.titleBn : srv.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {language === 'bn' ? srv.descriptionBn : srv.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-6">
                    {(language === 'bn' ? srv.deliverablesBn : srv.deliverables).map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {t.startingFrom}
                      </span>
                      <span className="text-xl font-bold font-mono text-white">
                        {formatBDT(srv.priceStartingAt, language)}
                      </span>
                    </div>

                    <div className="text-right flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{language === 'bn' ? srv.durationBn : srv.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppService(srv)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.requestServiceQuote}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
