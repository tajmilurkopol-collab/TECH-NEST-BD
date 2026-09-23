import React, { useState, useMemo } from 'react';
import {
  Image,
  Upload,
  Search,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  Check,
  AlertTriangle,
  FileCheck,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { MediaItem, MediaAssetType, User } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminMediaLibraryProps {
  currentUser: User;
}

export const AdminMediaLibrary: React.FC<AdminMediaLibraryProps> = ({ currentUser }) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(() => storageService.getMedia());
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New media upload form state
  const [uploadFilename, setUploadFilename] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadType, setUploadType] = useState<MediaAssetType>('logo');
  const [uploadAlt, setUploadAlt] = useState('');

  const filteredMedia = useMemo(() => {
    return mediaList.filter((m) => {
      if (typeFilter !== 'all' && m.type !== typeFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          m.filename.toLowerCase().includes(q) ||
          m.altText.toLowerCase().includes(q) ||
          m.url.toLowerCase().includes(q) ||
          (m.usedBy && m.usedBy.some((u) => u.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [mediaList, search, typeFilter]);

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard?.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (item: MediaItem) => {
    setWarningMsg(null);
    const res = storageService.deleteMediaItem(item.id, currentUser);
    if (!res.success) {
      setWarningMsg(res.message || 'Cannot delete asset: file in active use.');
    } else {
      setMediaList(storageService.getMedia());
    }
  };

  const handleCreateMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFilename || !uploadUrl) return;

    storageService.addMediaItem(
      {
        filename: uploadFilename,
        url: uploadUrl,
        type: uploadType,
        dimensions: '512 x 512',
        sizeBytes: 2048,
        usedBy: [],
        altText: uploadAlt || uploadFilename,
      },
      currentUser
    );

    setMediaList(storageService.getMedia());
    setShowUploadModal(false);
    setUploadFilename('');
    setUploadUrl('');
    setUploadAlt('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Centralized Media & Brand Vector Library
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Store, audit and manage official software logos, cover art, and marketing graphics.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      {warningMsg && (
        <div className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-800 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{warningMsg}</span>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by asset name, product link, or URL..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Media Types</option>
          <option value="logo">Product Logos</option>
          <option value="cover">Covers</option>
          <option value="banner">Banners</option>
          <option value="category">Category Icons</option>
        </select>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((item) => {
          const isCopied = copiedId === item.id;
          const isLinked = item.usedBy && item.usedBy.length > 0;

          return (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              {/* Asset Preview Box */}
              <div className="w-full aspect-square rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center p-3 mb-3 relative overflow-hidden">
                <img
                  src={item.url}
                  alt={item.altText}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if asset path is missing
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-900/90 text-slate-300 border border-slate-800">
                  {item.type}
                </span>
              </div>

              {/* Asset Details */}
              <div>
                <h4 className="text-xs font-bold text-white truncate" title={item.filename}>
                  {item.filename}
                </h4>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {item.dimensions || 'Vector SVG'}
                </div>

                {/* Used By Badge */}
                {isLinked ? (
                  <div className="mt-1.5 text-[10px] text-emerald-400 truncate flex items-center gap-1">
                    <FileCheck className="w-3 h-3 shrink-0" />
                    <span className="truncate">Linked: {item.usedBy.join(', ')}</span>
                  </div>
                ) : (
                  <div className="mt-1.5 text-[10px] text-slate-500">Unattached</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleCopyUrl(item)}
                  title="Copy URL"
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => handleDelete(item)}
                  title="Delete Asset"
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Asset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Add Media Asset Record</h3>
            <p className="text-xs text-slate-400 mb-4">
              Register a vector SVG, WebP, or PNG file path into the central media index.
            </p>

            <form onSubmit={handleCreateMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Asset Filename</label>
                <input
                  type="text"
                  required
                  value={uploadFilename}
                  onChange={(e) => setUploadFilename(e.target.value)}
                  placeholder="e.g. autodesk.svg"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Asset URL / Path</label>
                <input
                  type="text"
                  required
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="/products/logos/autodesk.svg"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Asset Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as MediaAssetType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="logo">Product Official Logo</option>
                  <option value="cover">Product Cover</option>
                  <option value="banner">Promotional Banner</option>
                  <option value="category">Category Icon</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="Official vector branding logo"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
