import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  Eye,
  User,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, User as AppUser } from '../../types';
import { formatBDT } from '../../utils/helpers';
import { storageService } from '../../utils/storageService';

interface AdminOrdersProps {
  currentUser: AppUser;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ currentUser }) => {
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update state for selected order modal
  const [modalStatus, setModalStatus] = useState<OrderStatus>('new');
  const [modalPaymentStatus, setModalPaymentStatus] = useState<PaymentStatus>('unpaid');
  const [modalNotes, setModalNotes] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.productNames.some((p) => p.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, search, statusFilter]);

  const handleOpenDetail = (ord: Order) => {
    setSelectedOrder(ord);
    setModalStatus(ord.status);
    setModalPaymentStatus(ord.paymentStatus);
    setModalNotes(ord.notes || '');
  };

  const handleSaveStatus = () => {
    if (!selectedOrder) return;
    storageService.updateOrderStatus(
      selectedOrder.id,
      modalStatus,
      modalPaymentStatus,
      modalNotes,
      currentUser
    );
    setOrders(storageService.getOrders());
    setSelectedOrder(null);
  };

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer Name', 'Phone', 'Email', 'Products', 'Amount', 'Payment Method', 'Payment Status', 'Order Status'];
    const rows = orders.map((o) => [
      o.orderNumber,
      o.createdAt.split('T')[0],
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail}"`,
      `"${o.productNames.join('; ')}"`,
      o.netAmount,
      o.paymentMethod,
      o.paymentStatus,
      o.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `technest-orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Customer Inquiries & Activation Orders
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Process incoming direct checkouts, bKash transactions, and WhatsApp purchase logs.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, customer name, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Order Statuses</option>
          <option value="new">New Inquiries</option>
          <option value="processing">Processing & Verification</option>
          <option value="completed">Completed & Activated</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Tool & Tiers</th>
                <th className="py-3.5 px-4">Amount & Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No order records found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-blue-400">{ord.orderNumber}</div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ord.customerPhone}</div>
                      {ord.customerCompany && (
                        <div className="text-[10px] text-slate-500">{ord.customerCompany}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">
                        {ord.productNames.join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {ord.items.length} item(s)
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-emerald-400">
                        {formatBDT(ord.netAmount)}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {ord.paymentMethod} •{' '}
                        <span
                          className={
                            ord.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                          }
                        >
                          {ord.paymentStatus}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(ord)}
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                      >
                        Process
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Processing Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {selectedOrder.orderNumber}
                </span>
                <h3 className="text-base font-bold text-white">Order Details & Fulfillment</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-500 hover:text-white text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[11px]">Customer</span>
                  <div className="font-bold text-white">{selectedOrder.customerName}</div>
                  <div className="text-[10px] text-slate-400">{selectedOrder.customerPhone}</div>
                  <div className="text-[10px] text-slate-400">{selectedOrder.customerEmail}</div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Total Net Amount</span>
                  <div className="font-mono font-bold text-base text-emerald-400">
                    {formatBDT(selectedOrder.netAmount)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    TrxID: {selectedOrder.trxId || 'Pending verification'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Update Fulfillment Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="new">new (Awaiting initial contact)</option>
                  <option value="contacted">contacted (Staff in touch via WhatsApp)</option>
                  <option value="pending">pending (Awaiting payment TrxID)</option>
                  <option value="confirmed">confirmed (Payment verified)</option>
                  <option value="processing">processing (Generating credentials / invite)</option>
                  <option value="completed">completed (Fully delivered & active)</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payment Status</label>
                <select
                  value={modalPaymentStatus}
                  onChange={(e) => setModalPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="unpaid">Unpaid / Awaiting Confirmation</option>
                  <option value="paid">Paid & Confirmed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Internal Engineering & Delivery Notes
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="e.g. Account credentials dispatched to client email on 23-Sep..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveStatus}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
