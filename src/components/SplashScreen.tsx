import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface SplashScreenProps {
  onLoaded: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const p1 = setTimeout(() => setProgress(45), 400);
    const p2 = setTimeout(() => setProgress(75), 1000);
    const p3 = setTimeout(() => setProgress(100), 1800);
    const p4 = setTimeout(() => onLoaded(), 2200);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(p4);
    };
  }, [onLoaded]);

  return (
    <div
      onClick={onLoaded}
      className="fixed inset-0 z-50 bg-gradient-to-b from-purple-700 via-indigo-700 to-purple-900 flex flex-col justify-between p-6 text-white text-center cursor-pointer select-none"
    >
      {/* Top native bar */}
      <div className="flex items-center justify-between text-xs opacity-75">
        <span>✕</span>
        <span className="font-bold">🎁 Smart Earning 💸</span>
        <span>⋮</span>
      </div>

      {/* Middle Animated Graphic */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 p-1 shadow-2xl flex items-center justify-center ring-8 ring-white/10 animate-pulse">
            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-10 h-10 fill-white text-white ml-1" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-1.5 drop-shadow-md">
            Explore Your Earnings
          </h1>
          <p className="text-xs text-purple-200 font-semibold tracking-wide">
            Welcome to <span className="text-amber-300 font-bold">🎁 Smart Earning 💸</span>
          </p>
        </div>

        {/* Progress bar matching screenshot 145455 */}
        <div className="w-64 max-w-xs space-y-2">
          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden border border-white/15 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-400 to-green-300 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-black text-purple-200 font-mono tracking-widest block uppercase">
            CONNECTING TO DATABASE...
          </span>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="text-[11px] text-purple-300/80 font-medium">
        Tap anywhere to skip
      </div>
    </div>
  );
};
