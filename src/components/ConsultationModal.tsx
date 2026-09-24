import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { IndustrySolution, Language } from '../types';
import { translations } from '../data/i18n';
import { generateWhatsAppLink } from '../utils/helpers';
import { firebaseDbService } from '../services/firebaseDbService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry: IndustrySolution | null;
  language: Language;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  industry,
  language,
}) => {
  const t = translations[language];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !industry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const consultId = `CNS-${Date.now()}`;
    firebaseDbService
      .submitConsultation({
        id: consultId,
        name,
        phone,
        industryId: industry.id,
      })
      .catch((err) => console.warn('Firestore consultation sync:', err));

    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const link = generateWhatsAppLink({
      phone: '8801969101010',
      customMessage: `Hello Kyrops Digital, I want to book a live demo for: ${industry.name}.\n\nName: ${name}\nPhone: ${phone}\nCompany: ${company}\nNotes: ${notes || 'N/A'}\n\nPlease contact me to schedule a demonstration session.`,
    });
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#1e3533] border border-white/10 rounded-3xl p-6 sm:p-8 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                Live Consultant Booking
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {industry.name}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Schedule an in-depth walkthrough with our engineering specialist. We can demonstrate on-site at your office or via Google Meet.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Engr. Tanvir Ahmed"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="019XX-XXXXXX"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Company / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Builders Ltd"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Specific Requirements or Number of Users
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your project sites, factories, or current pain points..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Demo Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="py-3 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Direct</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Demonstration Booked!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, {name}. Our {industry.name} senior solutions consultant will call {phone} to coordinate the schedule.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
