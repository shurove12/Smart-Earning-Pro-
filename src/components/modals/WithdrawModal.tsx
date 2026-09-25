import React, { useState } from 'react';
import { X, Wallet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface WithdrawModalProps {
  isOpen: boolean;
  user: UserProfile;
  onClose: () => void;
  onSubmitWithdraw: (method: string, accountNumber: string, amountUSD: number) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  user,
  onClose,
  onSubmitWithdraw,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('10.00');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const paymentMethods = [
    { id: 'bkash', name: 'bKash' },
    { id: 'nagad', name: 'Nagad' },
    { id: 'rocket', name: 'Rocket' },
    { id: 'upay', name: 'Upay' },
    { id: 'paytm', name: 'PayTM (India)' },
    { id: 'binance', name: 'Binance Pay (Crypto)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedMethod) {
      setError('Please select a payment method.');
      return;
    }

    if (!accountNumber.trim()) {
      setError('Please enter your account number / wallet ID.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10.0) {
      setError('Minimum withdrawal amount is $10.00.');
      return;
    }

    if (numAmount > user.balanceUSD) {
      setError(
        `Insufficient balance. You currently have ${formatCurrency(
          user.balanceUSD,
          user.currency
        )}. Keep completing tasks to reach $10.00!`
      );
      return;
    }

    onSubmitWithdraw(selectedMethod, accountNumber, numAmount);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">💸</span>
            <h3 className="font-extrabold text-base text-slate-900">Withdraw Funds</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Withdrawal Submitted!</h4>
            <p className="text-xs text-slate-600">
              Your request for ${amount} via {selectedMethod} is queued and will be processed within
              1 hour.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Current Balance Display */}
            <div className="bg-purple-50 rounded-2xl p-3 border border-purple-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-purple-700 block">Current Balance</span>
                <span className="text-lg font-black text-purple-950 font-mono">
                  {formatCurrency(user.balanceUSD, user.currency)}
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-purple-600 bg-purple-200/60 px-2 py-1 rounded-full">
                Min: $10.00
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Payment Method Selector (Matches screenshot 144107) */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Payment Method
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="">-- Select Method --</option>
                {paymentMethods.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Account Number Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Account Number / Wallet ID
              </label>
              <input
                type="text"
                placeholder="e.g. 017XXXXXXXX or Binance Pay ID"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Withdraw Amount (USD)
              </label>
              <input
                type="number"
                step="0.1"
                min="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-600 focus:outline-none font-mono"
              />
            </div>

            {/* Submit Button (Matches screenshot 144104) */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 transition active:scale-98 cursor-pointer"
            >
              Submit Request
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-700 font-medium py-1"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
