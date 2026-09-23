import React, { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Copy,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { Product, CategoryId, ProductPublishStatus } from '../../types';
import { formatBDT } from '../../utils/helpers';
import { ProductLogo } from '../ProductLogo';
import { storageService } from '../../utils/storageService';

interface AdminProductsProps {
  products: Product[];
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onViewProductLive?: (product: Product) => void;
  filterMode?: 'all' | 'drafts' | 'missing-media';
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  onAddNew,
  onEdit,
  onViewProductLive,
  filterMode = 'all',
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>(
    filterMode === 'drafts' ? 'draft' : 'all'
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filterMode === 'missing-media') {
        const hasMissing = !p.logoUrl || p.logoUrl.trim() === '';
        if (!hasMissing) return false;
      }

      if (statusFilter !== 'all') {
        const pStatus = p.status || 'published';
        if (pStatus !== statusFilter) return false;
      }

      if (selectedCat !== 'all' && p.category !== selectedCat) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [products, search, selectedCat, statusFilter, filterMode]);

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `technest-products-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['id', 'name', 'brand', 'category', 'marketPrice', 'officialPrice', 'status', 'logoUrl'];
    const rows = products.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.brand.replace(/"/g, '""')}"`,
      p.category,
      p.marketPrice,
      p.officialPrice || '',
      p.status || 'published',
      p.logoUrl || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `technest-products-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON handler
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          let importedCount = 0;
          json.forEach((item: any) => {
            if (item.id && item.name && item.marketPrice) {
              storageService.saveProduct(item);
              importedCount++;
            }
          });
          alert(`Successfully imported and validated ${importedCount} products into database.`);
        } else {
          alert('Invalid format: Uploaded JSON must be an array of products.');
        }
      } catch (err) {
        alert('Malformed JSON file. Please verify file integrity.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDuplicate = (p: Product) => {
    storageService.duplicateProduct(p.id);
  };

  const handleDelete = (id: string) => {
    storageService.deleteProduct(id);
    setDeleteConfirmId(null);
  };

  const handleToggleStatus = (p: Product) => {
    const newStatus: ProductPublishStatus = p.status === 'draft' ? 'published' : 'draft';
    storageService.saveProduct({ ...p, status: newStatus });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {filterMode === 'missing-media'
              ? 'Products Requiring Logo Replacement'
              : 'Marketplace Digital Tools & Software'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage official logos, pricing models, Bangladeshi activation parameters and warranties.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export & Import */}
          <button
            onClick={handleExportCSV}
            title="Export catalog as CSV"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            title="Export catalog as JSON"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, brand, slug, or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="ai">AI Tools</option>
            <option value="creative">Creative & Design</option>
            <option value="marketing">Marketing & SEO</option>
            <option value="business">Business & Productivity</option>
            <option value="developer">Developer & Cloud</option>
            <option value="industry">Industry ERP</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-4">Tool & Official Logo</th>
                <th className="py-3.5 px-4">Brand / Category</th>
                <th className="py-3.5 px-4">Pricing (Market / Official)</th>
                <th className="py-3.5 px-4">Access & Warranty</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No products matched current search or category filter.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const isDraft = p.status === 'draft';
                  const hasLogo = p.logoUrl && p.logoUrl.trim().length > 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Logo and Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <ProductLogo
                            name={p.name}
                            brand={p.brand}
                            logoUrl={p.logoUrl}
                            accentColor={p.accentColor}
                            size="sm"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {p.badge && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-blue-950 text-blue-300 border border-blue-800">
                                  {p.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              /{p.slug || p.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Brand & Category */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{p.brand}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{p.category}</div>
                      </td>

                      {/* Pricing */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-emerald-400">
                          {formatBDT(p.marketPrice)}
                          <span className="text-[10px] text-slate-500 ml-1 font-sans">
                            /{p.billingPeriod || 'mo'}
                          </span>
                        </div>
                        {p.officialPrice && (
                          <div className="text-[10px] text-slate-500 line-through font-mono">
                            Official: {formatBDT(p.officialPrice)}
                          </div>
                        )}
                      </td>

                      {/* Access & Warranty */}
                      <td className="py-3 px-4">
                        <div className="text-slate-300 font-medium">{p.accessType}</div>
                        <div className="text-[10px] text-slate-400">{p.supportPeriod}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStatus(p)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer ${
                            isDraft
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                              : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                          }`}
                        >
                          {isDraft ? 'Draft' : 'Published'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEdit(p)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(p)}
                            title="Duplicate Product"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-2">Delete Product Record?</h3>
            <p className="text-xs text-slate-400 mb-6">
              This action will remove the product and its pricing tiers from the active database.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
