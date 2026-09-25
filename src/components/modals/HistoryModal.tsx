import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, History, Calendar, CheckCircle2 } from 'lucide-react';
import { TransactionHistoryItem, UserProfile } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface HistoryModalProps {
  isOpen: boolean;
  user: UserProfile;
  transactions: TransactionHistoryItem[];
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  user,
  transactions,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'reward' | 'withdraw'>('all');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200 relative border border-slate-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Activity History</h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 my-3 bg-slate-100 p-1 rounded-xl">
          {(['all', 'reward', 'withdraw'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition capitalize ${
                filter === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'reward' ? 'Earnings' : 'Withdrawals'}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No transactions recorded yet in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                      item.type === 'withdraw'
                        ? 'bg-rose-100 text-rose-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {item.type === 'withdraw' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h5>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono text-xs font-black block ${
                      item.type === 'withdraw' ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {item.type === 'withdraw' ? '-' : '+'}
                    {formatCurrency(item.amountUSD, user.currency)}
                  </span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 font-bold">
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
