import React, { useState } from 'react';
import { X, Shield, Search, Check, RefreshCw, AlertTriangle } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/i18n';
import { formatBDT } from '../utils/helpers';

interface AdminCatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  language: Language;
  onUpdateProductStatus: (id: string, status: 'AVAILABLE' | 'COMING SOON' | 'REQUEST QUOTE') => void;
  onUpdateProductPrice: (id: string, newPrice: number) => void;
}

export const AdminCatalogueModal: React.FC<AdminCatalogueModalProps> = ({
  isOpen,
  onClose,
  products,
  language,
  onUpdateProductStatus,
  onUpdateProductPrice,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-[#070F1E] border border-slate-800 rounded-3xl p-6 sm:p-8 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.adminModalTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.adminModalDesc}
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="my-5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter catalogue by tool name or vendor..."
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Table of items */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tool & Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Market Price (BDT)</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{product.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{product.brand}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px] uppercase">
                    {product.category}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      defaultValue={product.marketPrice}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                          onUpdateProductPrice(product.id, val);
                        }
                      }}
                      className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-right font-mono text-white text-xs"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={product.availabilityStatus || product.stockStatus || 'AVAILABLE'}
                      onChange={(e: any) => onUpdateProductStatus(product.id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-[11px] font-mono text-white rounded px-2 py-1"
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="COMING SOON">COMING SOON</option>
                      <option value="REQUEST QUOTE">REQUEST QUOTE</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      <Check className="w-3 h-3" />
                      <span>{t.verifiedBadge}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-700 cursor-pointer"
          >
            Close Admin Console
          </button>
        </div>
      </div>
    </div>
  );
};
