import React, { useState } from 'react';
import { Building, Plus, Edit, Trash2, Check, PhoneCall, Layers } from 'lucide-react';
import { IndustrySolution, User } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminIndustriesProps {
  currentUser: User;
}

export const AdminIndustries: React.FC<AdminIndustriesProps> = ({ currentUser }) => {
  const [industries, setIndustries] = useState<IndustrySolution[]>(() =>
    storageService.getIndustries()
  );
  const [editingIndustry, setEditingIndustry] = useState<IndustrySolution | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (ind: IndustrySolution) => {
    setEditingIndustry({ ...ind });
    setShowModal(true);
  };

  const handleAddNew = () => {
    const newInd: IndustrySolution = {
      id: `ind-${Date.now().toString().slice(-4)}`,
      name: '',
      nameBn: '',
      tagline: '',
      taglineBn: '',
      headline: '',
      headlineBn: '',
      description: '',
      descriptionBn: '',
      heroBadge: 'SPECIALIZED VERTICAL',
      heroBadgeBn: 'বিশেষায়িত সমাধান',
      accentColor: '#10B981',
      tools: [],
      keyBenefits: [],
      demoText: 'Request specialized deployment demo',
      demoTextBn: 'অন-সাইট ডেমো ও প্রজেক্ট কনসালটেশন',
      phone: '+880 1969-101010',
    };
    setEditingIndustry(newInd);
    setShowModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry) return;
    storageService.saveIndustry(editingIndustry, currentUser);
    setIndustries(storageService.getIndustries());
    setShowModal(false);
    setEditingIndustry(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Industry ERP & Vertical Solutions CMS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage Bangladesh sector-specific software suites (Garments, Civil Construction, Real Estate).
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Industry Vertical</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {industries.map((ind) => (
          <div
            key={ind.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {ind.heroBadge}
                </span>
                <span className="text-xs font-mono text-slate-500">ID: {ind.id}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{ind.name}</h3>
              <div className="text-xs text-emerald-400 font-semibold mb-2">{ind.nameBn}</div>
              <p className="text-xs text-slate-300 mb-4">{ind.tagline}</p>

              {/* Tools list */}
              <div className="space-y-1.5 mb-4">
                {ind.tools.slice(0, 3).map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="text-[11px] text-slate-400">{t.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => handleEdit(ind)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Vertical</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && editingIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">Edit Industry Solution</h3>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Industry Name (EN)</label>
                <input
                  type="text"
                  required
                  value={editingIndustry.name}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Bangla Name (BN)</label>
                <input
                  type="text"
                  value={editingIndustry.nameBn}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, nameBn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingIndustry.tagline}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingIndustry.description}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Save Industry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
