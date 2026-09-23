import React from 'react';
import {
  Package,
  Layers,
  FolderTree,
  Building,
  ShoppingCart,
  Users,
  Image,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  ShieldAlert,
  DollarSign,
} from 'lucide-react';
import { Product, Order, Category, IndustrySolution, Bundle, MediaItem, AuditLogEntry } from '../../types';
import { formatBDT } from '../../utils/helpers';
import { ProductLogo } from '../ProductLogo';
import { AdminTab } from './AdminSidebar';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  industries: IndustrySolution[];
  bundles: Bundle[];
  media: MediaItem[];
  auditLogs: AuditLogEntry[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenProductEdit: (product: Product) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  categories,
  industries,
  bundles,
  media,
  auditLogs,
  onNavigateTab,
  onOpenProductEdit,
}) => {
  // Compute vital metrics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'published' || !p.status).length;
  const draftProducts = products.filter((p) => p.status === 'draft').length;
  const featuredProducts = products.filter((p) => p.isFeatured).length;

  // Media health check
  const missingMediaProducts = products.filter((p) => !p.logoUrl || p.logoUrl.trim() === '');
  const verificationNeeded = products.filter((p) => p.verificationStatus === 'VERIFICATION_REQUIRED');

  // Revenue computation
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.netAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'new' || o.status === 'pending');

  const metricCards = [
    {
      label: 'Total Products',
      val: totalProducts,
      sub: `${activeProducts} Active • ${draftProducts} Draft`,
      icon: Package,
      color: 'text-blue-400',
      bg: 'bg-blue-950/40 border-blue-800/40',
      action: () => onNavigateTab('products'),
    },
    {
      label: 'Verified Gross Revenue',
      val: formatBDT(totalRevenue),
      sub: `${orders.length} total processed orders`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-800/40',
      action: () => onNavigateTab('orders'),
    },
    {
      label: 'Orders Queue',
      val: orders.length,
      sub: `${pendingOrders.length} requiring activation`,
      icon: ShoppingCart,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/40',
      action: () => onNavigateTab('orders'),
    },
    {
      label: 'Active Bundles',
      val: bundles.length,
      sub: `${categories.length} Categories • ${industries.length} Industries`,
      icon: Layers,
      color: 'text-purple-400',
      bg: 'bg-purple-950/40 border-purple-800/40',
      action: () => onNavigateTab('bundles'),
    },
    {
      label: 'Media Library Assets',
      val: media.length,
      sub: 'Official vectors & covers',
      icon: Image,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-800/40',
      action: () => onNavigateTab('media'),
    },
    {
      label: 'Missing Media Audit',
      val: missingMediaProducts.length,
      sub: missingMediaProducts.length === 0 ? 'All tools have valid logos' : 'Tools requiring replacement',
      icon: AlertTriangle,
      color: missingMediaProducts.length > 0 ? 'text-red-400' : 'text-emerald-400',
      bg: missingMediaProducts.length > 0 ? 'bg-red-950/40 border-red-800/40' : 'bg-slate-900/60 border-slate-800',
      action: () => onNavigateTab('products-missing-media'),
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Quick Action Ribbon */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Quick Operations
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => onNavigateTab('products-add')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Product</span>
          </button>
          <button
            onClick={() => onNavigateTab('bundles')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Bundle</span>
          </button>
          <button
            onClick={() => onNavigateTab('media')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Upload Media</span>
          </button>
          <button
            onClick={() => onNavigateTab('categories')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Category</span>
          </button>
          <button
            onClick={() => onNavigateTab('homepage')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
          >
            <span>Hero & Banner CMS</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={card.action}
              className={`p-5 rounded-2xl border transition-all cursor-pointer hover:border-slate-600 ${card.bg} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono mb-1">{card.val}</div>
                <div className="text-xs text-slate-400">{card.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Recent Orders & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-emerald-400" />
              <span>Recent Customer Inquiries & Orders</span>
            </h2>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Products</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-mono font-bold text-blue-400">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-white">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400">{ord.customerPhone}</div>
                    </td>
                    <td className="py-3 text-slate-300 max-w-[160px] truncate">
                      {ord.productNames.join(', ')}
                    </td>
                    <td className="py-3 font-mono font-semibold text-emerald-400">
                      {formatBDT(ord.netAmount)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          ord.status === 'completed'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : ord.status === 'processing'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Audit Feed (1 Column) */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Live Audit Activity</span>
              </h2>
              <button
                onClick={() => onNavigateTab('audit')}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                Log
              </button>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-blue-400 font-bold">{log.action}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-slate-300 leading-snug line-clamp-2">{log.details}</p>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">{log.userName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Catalogue Preview Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-400" />
            <span>Featured Marketplace Digital Tools ({products.slice(0, 6).length})</span>
          </h2>
          <button
            onClick={() => onNavigateTab('products')}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>Manage All {products.length} Products</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.slice(0, 6).map((p) => (
            <div
              key={p.id}
              onClick={() => onOpenProductEdit(p)}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3 truncate">
                <ProductLogo
                  name={p.name}
                  brand={p.brand}
                  logoUrl={p.logoUrl}
                  accentColor={p.accentColor}
                  size="sm"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{p.brand} • {p.category}</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                {formatBDT(p.marketPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
