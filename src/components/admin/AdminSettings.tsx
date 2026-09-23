import React, { useState } from 'react';
import { Settings, Save, Check, RotateCcw, AlertTriangle, MessageSquare, Phone, Mail } from 'lucide-react';
import { SiteSettings, User } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminSettingsProps {
  currentUser: User;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ currentUser }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleChange = (field: keyof SiteSettings, val: any) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(settings, currentUser);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetFactory = () => {
    storageService.resetToFactoryDefaults(currentUser);
    setSettings(storageService.getSettings());
    setResetConfirm(false);
    alert('Catalog and settings restored to factory defaults successfully.');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Platform Configuration</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic WhatsApp ordering desks, contact hotlines, banners and legal notices.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Saved' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* WhatsApp & Hotline Desk */}
        <div className="border-b border-slate-800 pb-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Direct WhatsApp & Customer Hotline Desks</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                WhatsApp Order Number (International Format)
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="+8801969101010"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                All storefront WhatsApp order buttons and CTAs route dynamically to this number.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Support Phone Hotline</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => handleChange('supportPhone', e.target.value)}
                placeholder="+880 1969-101010"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Official Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                placeholder="support@technestbd.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Physical Office Address</label>
              <input
                type="text"
                value={settings.officeAddress}
                onChange={(e) => handleChange('officeAddress', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Brand & Tagline */}
        <div className="border-b border-slate-800 pb-5">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
            Platform Branding & Slogan
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Official Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="DIGITAL TOOLS & AI"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Bangla Tagline</label>
              <input
                type="text"
                value={settings.taglineBn}
                onChange={(e) => handleChange('taglineBn', e.target.value)}
                placeholder="ডিজিটাল টুলস ও এআই"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-bold"
              />
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400">
              Top Header Announcement Banner
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.announcementActive}
                onChange={(e) => handleChange('announcementActive', e.target.checked)}
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600"
              />
              <span className="text-xs text-slate-300">Display Banner</span>
            </label>
          </div>

          <textarea
            rows={2}
            value={settings.announcementBanner}
            onChange={(e) => handleChange('announcementBanner', e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>

        {/* Legal Disclaimer */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
            Mandatory Legal & Trademark Notice
          </h3>
          <textarea
            rows={3}
            value={settings.legalDisclaimer}
            onChange={(e) => handleChange('legalDisclaimer', e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>
      </form>

      {/* Danger Zone: Factory Reset */}
      <div className="p-6 rounded-3xl bg-red-950/20 border border-red-900/50 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Restore Factory Catalog & System Seeds</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Resets all local product customizations, media links, and demo orders back to initial release seeds.
          </p>
        </div>

        {resetConfirm ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setResetConfirm(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleResetFactory}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
            >
              Yes, Reset All
            </button>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950 border border-red-800 text-red-300 hover:text-white hover:bg-red-900 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>
        )}
      </div>
    </div>
  );
};
