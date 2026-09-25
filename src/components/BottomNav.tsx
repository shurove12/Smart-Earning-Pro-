import React from 'react';
import { Home, Users, Coins, Trophy, User } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  activeScreen: ScreenType;
  onChangeScreen: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onChangeScreen,
}) => {
  const tabs: { id: ScreenType; label: string; icon: React.ReactNode; activeColor: string }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      activeColor: 'bg-rose-500 text-white shadow-rose-500/50',
    },
    {
      id: 'refer',
      label: 'Refer',
      icon: <Users className="w-5 h-5" />,
      activeColor: 'bg-rose-500 text-white shadow-rose-500/50',
    },
    {
      id: 'earn',
      label: 'Earn',
      icon: <Coins className="w-5 h-5" />,
      activeColor: 'bg-rose-500 text-white shadow-rose-500/50',
    },
    {
      id: 'rank',
      label: 'Rank',
      icon: <Trophy className="w-5 h-5" />,
      activeColor: 'bg-rose-500 text-white shadow-rose-500/50',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      activeColor: 'bg-rose-500 text-white shadow-rose-500/50',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto pointer-events-auto">
      <nav className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-t-2xl shadow-[0_-6px_25px_rgba(0,102,255,0.3)] border-t border-white/20 px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeScreen(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 relative transition-all duration-200 group"
            >
              {isActive ? (
                <div className="flex flex-col items-center -mt-5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg ring-4 ring-blue-600/40 transform transition-transform group-active:scale-95 ${tab.activeColor}`}
                  >
                    {tab.icon}
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-tight mt-0.5">
                    {tab.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity">
                  <div className="text-white/80 group-hover:text-white transition-colors">
                    {tab.icon}
                  </div>
                  <span className="text-[10px] font-medium text-white/80 tracking-tight mt-0.5">
                    {tab.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
