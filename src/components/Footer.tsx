import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/i18n';
import { TechNestLogo } from './TechNestLogo';
import { storageService } from '../utils/storageService';

interface FooterProps {
  language: Language;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const t = translations[language];
  const settings = storageService.getSettings();

  return (
    <footer className="bg-transparent border-t border-white/10 text-slate-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-2">
              <TechNestLogo size="md" showTagline={true} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.officeAddress || 'Dhaka, Bangladesh'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${settings.supportPhone || '01969101010'}`} className="hover:text-white transition-colors">
                  {settings.supportPhone || '+880 1969-101010'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${settings.supportEmail || 'tajmilur.kopol@gmail.com'}`} className="hover:text-white transition-colors">
                  {settings.supportEmail || 'tajmilur.kopol@gmail.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Digital Tools & AI */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              {t.footerProducts}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  AI Assistants & Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Adobe & Creative Cloud
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  Canva & CapCut Pro
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('marketplace')}
                  className="hover:text-white transition-colors"
                >
                  SEO & Marketing Engines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('stack-builder')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Custom Stack Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry ERP Solutions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              {t.footerIndustries}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('industries')}
                  className="hover:text-white transition-colors"
                >
                  Construction & BOQ ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('industries')}
                  className="hover:text-white transition-colors"
                >
                  Garments RMG Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('industries')}
                  className="hover:text-white transition-colors"
                >
                  Poultry & Layer Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('industries')}
                  className="hover:text-white transition-colors"
                >
                  Real Estate & Plot CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('industries')}
                  className="hover:text-white transition-colors"
                >
                  Autodesk AutoCAD & Revit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Enterprise IT Services & Admin Portal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4">
              {t.footerServices}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Google Workspace & M365
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Custom Software Dev
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Business Bot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors"
                >
                  Cloud Server & Cyber SLA
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white text-[11px] font-mono transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin & CMS Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Trademark Notice */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 mb-8 text-[11px] text-slate-300 leading-relaxed">
          <p className="font-semibold text-emerald-300 mb-1">
            LEGAL DISCLAIMER & TRADEMARK ATTRIBUTION:
          </p>
          <p>
            {settings.legalDisclaimer ||
              'Product names, logos, brands, and other trademarks featured or referred to within the TECH NEST BD platform are the property of their respective trademark holders. These trademark holders are not affiliated with TECH NEST BD, our products, or our website. TECH NEST BD operates as an independent digital tools marketplace and IT consultancy in Bangladesh.'}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Bangladesh BDT Settlement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
