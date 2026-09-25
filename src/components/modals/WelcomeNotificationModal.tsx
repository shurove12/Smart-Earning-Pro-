import React, { useState } from 'react';
import { Send, CheckCircle2, Bell, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AdminSettings } from '../../types';

interface WelcomeNotificationModalProps {
  isOpen: boolean;
  settings: AdminSettings;
  onVerifiedAndEntered: () => void;
}

export const WelcomeNotificationModal: React.FC<WelcomeNotificationModalProps> = ({
  isOpen,
  settings,
  onVerifiedAndEntered,
}) => {
  const [joinedChannel1, setJoinedChannel1] = useState<boolean>(false);
  const [joinedChannel2, setJoinedChannel2] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleJoinChannel1 = () => {
    window.open(settings.channel1Url, '_blank');
    setJoinedChannel1(true);
    setErrorMessage(null);
  };

  const handleJoinChannel2 = () => {
    window.open(settings.channel2Url, '_blank');
    setJoinedChannel2(true);
    setErrorMessage(null);
  };

  const handleVerifyAndContinue = () => {
    // Mandatory verification check: BOTH channels must be joined
    if (settings.isMandatoryChannelJoin && (!joinedChannel1 || !joinedChannel2)) {
      setErrorMessage(
        '⚠️ আপনাকে অবশ্যই উভয় চ্যানেলে জয়েন হতে হবে! জয়েন না থাকলে অ্যাপে প্রবেশ করতে পারবেন না।'
      );
      return;
    }

    setErrorMessage(null);
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      onVerifiedAndEntered();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-3xl p-1.5 w-full max-w-xs shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative text-center">
        {/* Notice: No X (close button) here as requested by user! Mandatory join barrier */}

        <div className="bg-white/95 rounded-[22px] p-5 space-y-4">
          {/* Bell Icon Header Graphic */}
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto shadow-md ring-4 ring-amber-300 relative">
            <span className="text-3xl">👑</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">
              <Bell className="w-3 h-3 fill-white" />
            </span>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Notification</h3>
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 inline-block mt-1">
              বাধ্যতামূলক চ্যানেল জয়েন
            </span>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-slate-800 space-y-2 text-left leading-relaxed">
            <p className="font-extrabold text-slate-900">
              🎉 আমাদের অ্যাপে আপনাকে স্বাগতম! প্রতিদিন কাজ করুন এবং ১০০% পেমেন্ট নিন।
            </p>
            <p className="text-slate-700">
              মাত্র ১০ টাকা হলেই উত্তোলন করতে পারবেন বিকাশ, নগদ ও রকেটে 😍
            </p>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-700 text-xs font-bold text-left flex items-start gap-1.5 animate-bounce">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Telegram Channel Joins (Matches screenshot 143741) */}
          <div className="space-y-2 text-left">
            <div className="text-[11px] font-extrabold text-amber-900 uppercase flex items-center gap-1">
              <span>📌</span> আমাদের চ্যানেলে জয়েন করুন:
            </div>

            {/* Channel 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800">{settings.channel1Name}</span>
              </div>
              <button
                type="button"
                onClick={handleJoinChannel1}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
                  joinedChannel1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
              >
                {joinedChannel1 ? 'Joined ✓' : 'Join'}
              </button>
            </div>

            {/* Channel 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800">{settings.channel2Name}</span>
              </div>
              <button
                type="button"
                onClick={handleJoinChannel2}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
                  joinedChannel2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
              >
                {joinedChannel2 ? 'Joined ✓' : 'Join'}
              </button>
            </div>
          </div>

          {/* Checking / Continue Button */}
          <button
            onClick={handleVerifyAndContinue}
            disabled={isChecking}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer border border-amber-300"
          >
            {isChecking ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                Checking Channels...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Enter App</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
