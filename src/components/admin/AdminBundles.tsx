import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Sparkles,
  Check,
  Tag,
  Percent,
} from 'lucide-react';
import { Bundle, Product, BillingPeriod, ProductBadge, User } from '../../types';
import { formatBDT } from '../../utils/helpers';
import { storageService } from '../../utils/storageService';

interface AdminBundlesProps {
  currentUser: User;
}

export const AdminBundles: React.FC<AdminBundlesProps> = ({ currentUser }) => {
  const [bundles, setBundles] = useState<Bundle[]>(() => storageService.getBundles());
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [showModal, setShowModal] = useState(false);

  const allProducts = storageService.getProducts();

  const handleEdit = (bundle: Bundle) => {
    setEditingBundle({ ...bundle });
    setShowModal(true);
  };

  const handleAddNew = () => {
    const newBundle: Bundle = {
      id: `bundle-${Date.now().toString().slice(-4)}`,
      name: '',
      nameBn: '',
      tagline: '',
      taglineBn: '',
      targetAudience: 'Agency & Teams',
      targetAudienceBn: 'এজেন্সি ও টিম',
      toolsIncluded: [],
      individualTotal: 2000,
      bundlePrice: 1400,
      savings: 600,
      period: 'Monthly',
      badge: 'POPULAR',
      accentColor: '#3B82F6',
      features: ['All tools included with verified delivery', 'Priority support desk'],
      featuresBn: ['সকল টুলস ভেরিফাইড ডেলিভারি সহ অন্তর্ভুক্ত', 'অগ্রাধিকার সাপোর্ট ডেস্ক'],
      status: 'published',
    };
    setEditingBundle(newBundle);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    storageService.deleteBundle(id, currentUser);
    setBundles(storageService.getBundles());
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBundle) return;

    // Auto-calculate savings
    const individual = editingBundle.individualTotal || 0;
    const bundleP = editingBundle.bundlePrice || 0;
    const savings = Math.max(0, individual - bundleP);

    const finalized: Bundle = {
      ...editingBundle,
      savings,
    };

    storageService.saveBundle(finalized, currentUser);
    setBundles(storageService.getBundles());
    setShowModal(false);
    setEditingBundle(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Curated Bundles & Industry Packages CMS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure multi-tool packs, automated discount calculations, and audience targeting.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Bundle</span>
        </button>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          const discountPercent =
            bundle.individualTotal > 0
              ? Math.round((bundle.savings / bundle.individualTotal) * 100)
              : 0;

          return (
            <div
              key={bundle.id}
              className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800">
                    {bundle.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {discountPercent}% OFF
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{bundle.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{bundle.tagline}</p>

                {/* Included Tools */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">
                    Included Software:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bundle.toolsIncluded.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown Box */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Individual Rate Total:</span>
                    <span className="line-through font-mono">
                      {formatBDT(bundle.individualTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold">
                    <span>Bundle Price:</span>
                    <span className="text-emerald-400 font-mono text-sm">
                      {formatBDT(bundle.bundlePrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-blue-400 text-[11px] pt-1 border-t border-slate-900">
                    <span>Total Client Savings:</span>
                    <span className="font-mono font-bold">{formatBDT(bundle.savings)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleEdit(bundle)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(bundle.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      {showModal && editingBundle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">
              {editingBundle.name ? 'Edit Bundle Pack' : 'Create New Bundle Pack'}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bundle Name</label>
                  <input
                    type="text"
                    required
                    value={editingBundle.name}
                    onChange={(e) => setEditingBundle({ ...editingBundle, name: e.target.value })}
                    placeholder="AI Starter Pack"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bangla Name</label>
                  <input
                    type="text"
                    value={editingBundle.nameBn}
                    onChange={(e) => setEditingBundle({ ...editingBundle, nameBn: e.target.value })}
                    placeholder="এআই স্টার্টার প্যাক"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingBundle.tagline}
                  onChange={(e) => setEditingBundle({ ...editingBundle, tagline: e.target.value })}
                  placeholder="The foundational AI stack for modern creators"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Tools Included (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingBundle.toolsIncluded.join(', ')}
                  onChange={(e) =>
                    setEditingBundle({
                      ...editingBundle,
                      toolsIncluded: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="ChatGPT Plus, Midjourney, Canva Pro"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Individual Total (BDT)
                  </label>
                  <input
                    type="number"
                    value={editingBundle.individualTotal}
                    onChange={(e) =>
                      setEditingBundle({
                        ...editingBundle,
                        individualTotal: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Bundle Discounted Price (BDT)
                  </label>
                  <input
                    type="number"
                    value={editingBundle.bundlePrice}
                    onChange={(e) =>
                      setEditingBundle({ ...editingBundle, bundlePrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-emerald-400">
                Calculated Savings: {formatBDT(Math.max(0, editingBundle.individualTotal - editingBundle.bundlePrice))}
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
                  Save Bundle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
