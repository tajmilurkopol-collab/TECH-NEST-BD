import React, { useState } from 'react';
import { FolderTree, Plus, Edit, Trash2, Check, ArrowUpDown } from 'lucide-react';
import { Category, User } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminCategoriesProps {
  currentUser: User;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({ currentUser }) => {
  const [categories, setCategories] = useState<Category[]>(() => storageService.getCategories());
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddNew = () => {
    const newCat: Category = {
      id: `cat-${Date.now().toString().slice(-4)}`,
      name: '',
      nameBn: '',
      tagline: '',
      taglineBn: '',
      description: '',
      descriptionBn: '',
      icon: 'Layers',
      accentColor: '#3B82F6',
      toolCount: 0,
      sampleTools: [],
    };
    setEditingCategory(newCat);
    setShowModal(true);
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory({ ...cat });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    storageService.deleteCategory(id, currentUser);
    setCategories(storageService.getCategories());
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    storageService.saveCategory(editingCategory, currentUser);
    setCategories(storageService.getCategories());
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Taxonomy & Category Architecture CMS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add or modify digital tool taxonomy without editing frontend codebase.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                  ID: {cat.id}
                </span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.accentColor }}
                />
              </div>

              <h3 className="text-base font-bold text-white mb-0.5">{cat.name}</h3>
              <div className="text-xs font-medium text-blue-400 mb-2">{cat.nameBn}</div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">{cat.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400">
                {cat.toolCount} Listed Tools
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">
              {editingCategory.name ? 'Edit Category' : 'Create Category'}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category ID / Slug</label>
                <input
                  type="text"
                  required
                  value={editingCategory.id}
                  onChange={(e) => setEditingCategory({ ...editingCategory, id: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Name (English)</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Name (বাংলা)</label>
                <input
                  type="text"
                  value={editingCategory.nameBn}
                  onChange={(e) => setEditingCategory({ ...editingCategory, nameBn: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingCategory.tagline}
                  onChange={(e) => setEditingCategory({ ...editingCategory, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
