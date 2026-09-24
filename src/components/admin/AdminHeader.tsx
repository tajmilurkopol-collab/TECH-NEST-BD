import React from 'react';
import { Search, Bell, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { User } from '../../types';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  currentTab: AdminTab;
  currentUser: User;
  onQuickAction: (action: string) => void;
  globalSearch: string;
  onGlobalSearchChange: (val: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTab,
  currentUser,
  onQuickAction,
  globalSearch,
  onGlobalSearchChange,
}) => {
  const getTabTitle = (tab: AdminTab): string => {
    switch (tab) {
      case 'dashboard':
        return 'Executive Overview & Operations';
      case 'products':
        return 'Product Catalogue Management';
      case 'products-add':
        return 'Add New Product / Software';
      case 'products-drafts':
        return 'Draft & Unpublished Products';
      case 'products-missing-media':
        return 'Missing & Broken Media Audit';
      case 'categories':
        return 'Taxonomy & Categories';
      case 'industries':
        return 'Industry Solutions & ERP Desk';
      case 'bundles':
        return 'Packages & Bundles Builder';
      case 'pricing':
        return 'Pricing Verification & Rates Matrix';
      case 'orders':
        return 'Customer Orders & Inquiries';
      case 'customers':
        return 'Customer Directory & Accounts';
      case 'media':
        return 'Central Media & Asset Library';
      case 'homepage':
        return 'Homepage & Editorial Layout CMS';
      case 'services':
        return 'Enterprise IT Services Catalog';
      case 'languages':
        return 'English & বাংলা Content Synchronization';
      case 'users':
        return 'Staff Access & Role Management';
      case 'settings':
        return 'Global Platform & WhatsApp Configuration';
      case 'audit':
        return 'Security & Operational Audit Log';
      default:
        return 'CMS Management';
    }
  };

  return (
    <header className="h-16 bg-[#050b16] border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase">
          <span>Admin Portal</span>
          <span>/</span>
          <span className="text-blue-400">{currentTab}</span>
        </div>
        <h1 className="text-sm font-bold text-white tracking-tight">
          {getTabTitle(currentTab)}
        </h1>
      </div>

      {/* Center Search */}
      <div className="relative w-80 hidden md:block">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={globalSearch}
          onChange={(e) => onGlobalSearchChange(e.target.value)}
          placeholder="Filter catalog, orders or media..."
          className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-[10px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Production Ready</span>
        </div>

        <button
          onClick={() => onQuickAction('add-product')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </div>
    </header>
  );
};
