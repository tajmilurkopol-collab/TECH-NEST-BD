import React, { useState } from 'react';
import { Home, Save, Check, Sparkles } from 'lucide-react';
import { HomepageContent, User } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminHomepageProps {
  currentUser: User;
}

export const AdminHomepage: React.FC<AdminHomepageProps> = ({ currentUser }) => {
  const [content, setContent] = useState<HomepageContent>(() => storageService.getHomepageContent());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof HomepageContent, val: string) => {
    setContent((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.saveHomepageContent(content, currentUser);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Homepage Editorial CMS</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Modify hero copy, Bangladesh enterprise positioning, and call-to-action buttons.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Saved' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Hero Headline & Value Proposition</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Eyebrow Tagline (EN)</label>
                <input
                  type="text"
                  value={content.heroEyebrow}
                  onChange={(e) => handleChange('heroEyebrow', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Eyebrow Tagline (BN)</label>
                <input
                  type="text"
                  value={content.heroEyebrowBn}
                  onChange={(e) => handleChange('heroEyebrowBn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Line 1 (EN)</label>
                <input
                  type="text"
                  value={content.heroLine1}
                  onChange={(e) => handleChange('heroLine1', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Line 1 (BN)</label>
                <input
                  type="text"
                  value={content.heroLine1Bn}
                  onChange={(e) => handleChange('heroLine1Bn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Line 2 (EN)</label>
                <input
                  type="text"
                  value={content.heroLine2}
                  onChange={(e) => handleChange('heroLine2', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Line 2 (BN)</label>
                <input
                  type="text"
                  value={content.heroLine2Bn}
                  onChange={(e) => handleChange('heroLine2Bn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Subtitle (EN)</label>
                <textarea
                  rows={3}
                  value={content.heroSub}
                  onChange={(e) => handleChange('heroSub', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Hero Subtitle (BN)</label>
                <textarea
                  rows={3}
                  value={content.heroSubBn}
                  onChange={(e) => handleChange('heroSubBn', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3">
            Primary Call to Action Buttons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary CTA Text</label>
              <input
                type="text"
                value={content.heroExploreCta}
                onChange={(e) => handleChange('heroExploreCta', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Secondary CTA Text</label>
              <input
                type="text"
                value={content.heroStackCta}
                onChange={(e) => handleChange('heroStackCta', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
