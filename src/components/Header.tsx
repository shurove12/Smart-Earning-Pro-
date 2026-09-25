import React from 'react';
import { Settings, X, MoreVertical, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onlineCount: number;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenNotification: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onlineCount,
  onOpenSettings,
  onOpenProfile,
  onOpenNotification,
  onOpenAdmin,
}) => {
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTitleClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        onOpenAdmin();
        return 0;
      }
      return next;
    });

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2500);

    onOpenNotification();
  };
  return (
    <header className="sticky top-0 z-30 w-full bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white shadow-md">
      {/* Telegram Mini App Top Native Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 text-xs font-medium">
        <button
          onClick={() => {
            if (window.confirm('Close Smart Earning Mini App?')) {
              window.location.reload();
            }
          }}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
          title="Close App"
        >
          <X className="w-5 h-5 text-white/90" />
        </button>

        <button 
          onClick={handleTitleClick}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:bg-white/10 transition"
        >
          <span className="text-sm">🎁</span>
          <span className="font-bold text-sm tracking-wide text-white drop-shadow-sm">Smart Earning</span>
          <span className="text-sm">💸</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </button>

        <button 
          onClick={onOpenSettings}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
          title="App Menu"
        >
          <MoreVertical className="w-5 h-5 text-white/90" />
        </button>
      </div>

      {/* App Bar Subheader with Avatar, Online Counter & Settings */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 group text-left cursor-pointer"
          title="Go to Profile"
        >
          <div className="w-9 h-9 rounded-full bg-amber-400 p-0.5 ring-2 ring-white/60 shadow-md flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
            <span>{user.avatar}</span>
          </div>
          <div className="hidden xs:block leading-tight">
            <span className="text-xs font-semibold text-white/90 block">{user.name}</span>
          </div>
        </button>

        {/* Live Online Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/25 backdrop-blur-sm rounded-full border border-white/15 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
          <span className="text-emerald-300 font-mono tracking-tight">{onlineCount} ONLINE</span>
        </div>

        {/* Settings Gear Button */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-blue-500/60 hover:bg-blue-400 text-white flex items-center justify-center border border-white/20 shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Setup & Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
