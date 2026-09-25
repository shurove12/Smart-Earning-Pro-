import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, VolumeX, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdSimulationModalProps {
  isOpen: boolean;
  durationSeconds?: number;
  rewardUSD: number;
  monetagDirectLink: string;
  adTitle?: string;
  onCloseEarly: (requiredSeconds: number) => void;
  onAdCompleted: (rewardUSD: number) => void;
}

export const AdSimulationModal: React.FC<AdSimulationModalProps> = ({
  isOpen,
  durationSeconds = 15,
  rewardUSD = 0.1,
  monetagDirectLink = 'https://omg10.com/4/11887609',
  adTitle = 'Monetag Sponsored High-Earning Video Ad',
  onCloseEarly,
  onAdCompleted,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(durationSeconds);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsRemaining(durationSeconds);
    setIsPlaying(true);

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          onAdCompleted(rewardUSD);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, durationSeconds, rewardUSD, onAdCompleted]);

  if (!isOpen) return null;

  const handleAttemptClose = () => {
    if (secondsRemaining > 0) {
      onCloseEarly(durationSeconds);
    }
  };

  const handleOpenDirectPartner = () => {
    window.open(monetagDirectLink, '_blank');
  };

  const progressPercent = Math.min(
    100,
    Math.max(5, ((durationSeconds - secondsRemaining) / durationSeconds) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-3 select-none">
      {/* Top Header Bar */}
      <div className="bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2.5 flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <div className="leading-tight">
            <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
              Monetag Rewarded Video
            </span>
            <span className="text-xs font-black text-amber-300 font-mono">
              {secondsRemaining > 0 ? (
                <>
                  Reward in <strong className="text-white text-sm">{secondsRemaining}s</strong>
                </>
              ) : (
                <span className="text-emerald-400">🎉 Verified! Rewarding +${rewardUSD.toFixed(2)}</span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleAttemptClose}
            className="px-3 py-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white text-xs font-black flex items-center gap-1 transition shadow-md active:scale-95 cursor-pointer"
            title="Exit Ad Early"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Main Video Ad Screen (Replaces old AdZilla dinosaur screen) */}
      <div className="flex-1 my-3 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 border border-purple-500/30 flex flex-col justify-between p-4 relative shadow-2xl">
        {/* Animated Gradient Backdrop simulating video */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600 via-indigo-700 to-transparent pointer-events-none" />

        {/* Video Top Tags */}
        <div className="flex items-center justify-between z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5 shadow">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>LIVE MONETAG HD AD</span>
          </div>

          <div className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
            +${rewardUSD.toFixed(2)} Cash Reward
          </div>
        </div>

        {/* Center Video Motion Simulation Graphics */}
        <div className="my-auto text-center z-10 space-y-4 max-w-xs mx-auto">
          {/* Video Player Pulsing Frame */}
          <div className="relative w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-400 p-1 shadow-2xl ring-4 ring-white/10 animate-pulse">
            <div className="w-full h-full rounded-[22px] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
              <Play className="w-12 h-12 fill-white text-white ml-1 drop-shadow-lg" />
              <span className="text-[10px] font-mono font-bold text-amber-300 mt-1">
                STREAMING
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-white leading-tight drop-shadow mb-1">
              {adTitle}
            </h2>
            <p className="text-xs text-purple-200/90 font-medium leading-relaxed">
              ভিডিও অ্যাডটি সম্পূর্ণ {durationSeconds} সেকেন্ড দেখুন। সময় শেষ হলে আপনার অ্যাকাউন্টে সরাসরি ব্যালেন্স যুক্ত হবে।
            </p>
          </div>

          {/* Interactive Direct Partner Link Button */}
          <button
            onClick={handleOpenDirectPartner}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>স্পনসর সাইট ব্রাউজ করুন (Monetag Partner)</span>
          </button>
        </div>

        {/* Bottom Video Timeline Controls */}
        <div className="z-10 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-purple-200">
            <span>00:{String(durationSeconds - secondsRemaining).padStart(2, '0')}</span>
            <span className="font-bold text-amber-300">
              {secondsRemaining > 0 ? `${secondsRemaining}s বাকি` : 'Completed ✓'}
            </span>
            <span>00:{String(durationSeconds).padStart(2, '0')}</span>
          </div>

          {/* Timeline bar */}
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Legal / Partner Info */}
      <div className="text-center text-[10px] text-slate-400 font-medium">
        Powered by Monetag Official SDK & Ad Network · Zone ID: 11887274
      </div>
    </div>
  );
};
