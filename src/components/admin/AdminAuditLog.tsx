import React, { useState, useMemo } from 'react';
import { History, Search, Filter, Download, ShieldCheck, User } from 'lucide-react';
import { AuditLogEntry } from '../../types';
import { storageService } from '../../utils/storageService';

export const AdminAuditLog: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>(() => storageService.getAuditLogs());
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      if (moduleFilter !== 'all' && l.module !== moduleFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          l.action.toLowerCase().includes(q) ||
          l.userName.toLowerCase().includes(q) ||
          l.userEmail.toLowerCase().includes(q) ||
          l.details.toLowerCase().includes(q) ||
          (l.recordName && l.recordName.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [logs, search, moduleFilter]);

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Email', 'Action', 'Module', 'Record', 'Details'];
    const rows = logs.map((l) => [
      l.timestamp,
      `"${l.userName}"`,
      `"${l.userEmail}"`,
      l.action,
      l.module,
      `"${l.recordName || ''}"`,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `technest-audit-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Security & Operational Audit Log</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable tracking for all catalog edits, media operations, price changes, and staff access.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by user, action, or record..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Modules</option>
          <option value="Products">Products</option>
          <option value="Media">Media Library</option>
          <option value="Orders">Orders</option>
          <option value="Bundles">Bundles</option>
          <option value="Auth">Auth & Logins</option>
          <option value="Settings">Settings</option>
          <option value="System">System</option>
        </select>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Action & Module</th>
              <th className="py-3.5 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40">
                <td className="py-3 px-4 font-mono text-slate-400 text-[10px] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-white">{log.userName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{log.userEmail}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono font-bold text-blue-400 block text-[11px]">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    {log.module}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 max-w-md">
                  {log.details}
                  {log.recordName && (
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      Target: {log.recordName}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
