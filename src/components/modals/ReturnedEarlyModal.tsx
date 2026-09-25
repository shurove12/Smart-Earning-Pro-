import React from 'react';
import { X, AlertCircle, RotateCcw } from 'lucide-react';

interface ReturnedEarlyModalProps {
  isOpen: boolean;
  requiredSeconds: number;
  onClose: () => void;
  onTryAgain: () => void;
}

export const ReturnedEarlyModal: React.FC<ReturnedEarlyModalProps> = ({
  isOpen,
  requiredSeconds,
  onClose,
  onTryAgain,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl border-2 border-red-500 p-6 text-center animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs shadow"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Exclamation Icon inside double circle */}
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-3 ring-4 ring-red-50">
          <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-black shadow-md">
            !
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-1">Returned Too Early!</h3>
        <p className="text-xs font-bold text-rose-600 mb-2">আপনি খুব তাড়াতাড়ি ফিরে এসেছেন!</p>

        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-xs text-slate-700 font-semibold leading-relaxed mb-4 text-center">
          You must visit for full{' '}
          <strong className="text-red-600">{requiredSeconds} seconds</strong>.<br />
          <span className="text-[11px] text-slate-600 block mt-1">
            আপনাকে অবশ্যই পুরো <strong>{requiredSeconds} সেকেন্ড</strong> সাইটে অবস্থান করতে হবে। নির্দিষ্ট সময়ের আগে ব্যাক আসলে কোনো রিওয়ার্ড পাওয়া যাবে না।
          </span>
        </div>

        <button
          onClick={onTryAgain}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:to-rose-600 text-white font-black text-sm shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};
