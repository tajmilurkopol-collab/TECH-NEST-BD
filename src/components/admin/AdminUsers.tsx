import React, { useState } from 'react';
import { Shield, Plus, Edit, UserCheck, Key, Check } from 'lucide-react';
import { User, UserRole } from '../../types';
import { storageService } from '../../utils/storageService';

interface AdminUsersProps {
  currentUser: User;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>(() => storageService.getUsers());
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddNew = () => {
    const newUser: User = {
      id: `user-${Date.now().toString().slice(-4)}`,
      name: '',
      email: '',
      role: 'Product Manager',
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setEditingUser(newUser);
    setShowModal(true);
  };

  const handleEdit = (u: User) => {
    setEditingUser({ ...u });
    setShowModal(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    storageService.saveUser(editingUser, currentUser);
    setUsers(storageService.getUsers());
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Staff Accounts & Role Permissions</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-Based Access Control (RBAC) across catalog management, media, and order fulfillment.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
              <th className="py-3.5 px-4">Staff Member</th>
              <th className="py-3.5 px-4">Role Assignment</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Login</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-800/40">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800">
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      u.status === 'active'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-red-950 text-red-300 border border-red-800'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleEdit(u)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">Configure Staff Member</h3>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Role Assignment</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Order Manager">Order Manager</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Support">Support</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Account Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
