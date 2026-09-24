import React from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Building,
  Layers,
  DollarSign,
  ShoppingCart,
  Users,
  Tag,
  Image,
  Home,
  Wrench,
  FileText,
  Globe,
  Languages,
  Shield,
  Settings,
  History,
  ExternalLink,
  LogOut,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';
import { TechNestLogo } from '../TechNestLogo';
import { User, UserRole } from '../../types';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'products-add'
  | 'products-drafts'
  | 'products-missing-media'
  | 'categories'
  | 'industries'
  | 'bundles'
  | 'pricing'
  | 'orders'
  | 'customers'
  | 'media'
  | 'homepage'
  | 'services'
  | 'languages'
  | 'users'
  | 'settings'
  | 'audit';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  currentUser: User;
  onLogout: () => void;
  onViewStorefront: () => void;
  metrics: {
    totalProducts: number;
    pendingOrders: number;
    missingMediaCount: number;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onLogout,
  onViewStorefront,
  metrics,
}) => {
  const role = currentUser.role;

  // Role permissions check
  const canAccess = (tab: AdminTab): boolean => {
    if (role === 'Super Admin' || role === 'Administrator') return true;
    if (role === 'Product Manager') {
      return ['dashboard', 'products', 'products-add', 'products-drafts', 'products-missing-media', 'categories', 'industries', 'bundles', 'pricing', 'media'].includes(tab);
    }
    if (role === 'Order Manager') {
      return ['dashboard', 'orders', 'customers'].includes(tab);
    }
    if (role === 'Content Editor') {
      return ['dashboard', 'homepage', 'services', 'languages', 'media'].includes(tab);
    }
    return tab === 'dashboard';
  };

  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [
        { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      group: 'CATALOGUE & COMMERCE',
      items: [
        {
          id: 'products' as AdminTab,
          label: 'Products',
          icon: Package,
          badge: metrics.totalProducts.toString(),
        },
        { id: 'products-add' as AdminTab, label: 'Add Product', icon: PlusCircle },
        {
          id: 'products-missing-media' as AdminTab,
          label: 'Missing Media',
          icon: AlertTriangle,
          badge: metrics.missingMediaCount > 0 ? metrics.missingMediaCount.toString() : undefined,
          badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700/60',
        },
        { id: 'categories' as AdminTab, label: 'Categories', icon: FolderTree },
        { id: 'industries' as AdminTab, label: 'Industries', icon: Building },
        { id: 'bundles' as AdminTab, label: 'Bundles & Packs', icon: Layers },
        { id: 'pricing' as AdminTab, label: 'Pricing CMS', icon: DollarSign },
      ],
    },
    {
      group: 'SALES & CUSTOMERS',
      items: [
        {
          id: 'orders' as AdminTab,
          label: 'Orders',
          icon: ShoppingCart,
          badge: metrics.pendingOrders > 0 ? metrics.pendingOrders.toString() : undefined,
          badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/60',
        },
        { id: 'customers' as AdminTab, label: 'Customers', icon: Users },
      ],
    },
    {
      group: 'ASSETS & CONTENT',
      items: [
        { id: 'media' as AdminTab, label: 'Media Library', icon: Image },
        { id: 'homepage' as AdminTab, label: 'Homepage CMS', icon: Home },
        { id: 'services' as AdminTab, label: 'IT Services', icon: Wrench },
        { id: 'languages' as AdminTab, label: 'English & বাংলা', icon: Languages },
      ],
    },
    {
      group: 'PLATFORM & SYSTEM',
      items: [
        { id: 'users' as AdminTab, label: 'Users & Roles', icon: Shield },
        { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
        { id: 'audit' as AdminTab, label: 'Audit Log', icon: History },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#050b16] border-r border-white/10 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <TechNestLogo size="sm" showTagline={false} />
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-blue-950 text-blue-400 border border-blue-800/60">
            CMS v2.4
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono tracking-wider">
          DIGITAL TOOLS & AI • ADMIN
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 text-xs no-scrollbar">
        {navGroups.map((group, gIdx) => {
          const visibleItems = group.items.filter((item) => canAccess(item.id));
          if (visibleItems.length === 0) return null;

          return (
            <div key={gIdx}>
              <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                {group.group}
              </div>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            item.badgeColor || (isActive ? 'bg-blue-700 text-white border-blue-500' : 'bg-slate-900 text-slate-400 border-slate-800')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* User profile & bottom actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        <button
          onClick={onViewStorefront}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          <span>Live Storefront</span>
        </button>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
          <div className="truncate pr-2">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] font-mono text-emerald-400 truncate">{currentUser.role}</div>
          </div>
          <button
            onClick={onLogout}
            title="Log Out of CMS"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
