import React, { useState } from 'react';
import { X, Headphones, Send, MessageCircle, HelpCircle, CheckCircle } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setMessage('');
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200 relative border border-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">24/7 Help & Support</h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Message Sent!</h4>
            <p className="text-xs text-slate-500">
              Our support team will reply directly to your Telegram inbox.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Common FAQs</span>
              </div>
              <p className="text-[11px] text-slate-600">
                • Minimum withdraw is $10.00 directly to bKash/Nagad/Rocket/Binance.
              </p>
              <p className="text-[11px] text-slate-600">
                • Referral bonus adds $1.00 into pending immediately.
              </p>
              <p className="text-[11px] text-slate-600">
                • Video ad watching is credited upon full completion.
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="https://t.me/smartearning_support"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Telegram Admin</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Send quick inquiry to Helpdesk:
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question or issue..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Ticket</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
