import React from 'react';
import { X, Trophy, Check } from 'lucide-react';
import { UserProfile } from '../../types';

interface TargetModalProps {
  isOpen: boolean;
  user: UserProfile;
  onClose: () => void;
  onContinue: () => void;
}

export const TargetModal: React.FC<TargetModalProps> = ({
  isOpen,
  user,
  onClose,
  onContinue,
}) => {
  if (!isOpen) return null;

  const target1stRefs = 16;
  const refsNeeded = Math.max(1, target1stRefs - user.joinedRefs + 1);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-1 w-full max-w-xs shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative text-center">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-[22px] p-5 text-white">
          {/* Top Target Graphic */}
          <div className="w-16 h-16 rounded-full bg-white text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xl ring-4 ring-amber-400">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-400" />
          </div>

          <h3 className="text-xl font-black text-white mb-2">Your Target!</h3>

          {/* Target Description Card */}
          <div className="bg-black/25 backdrop-blur-sm rounded-2xl p-4 border border-white/15 text-xs text-white/90 space-y-2 mb-4 text-left">
            <p className="font-bold text-center text-amber-300 text-sm">
              👋 Dear User, Welcome!
            </p>

            <div className="space-y-1.5 pt-1 font-semibold">
              <div className="flex items-center justify-between">
                <span>🏆 1st Place: $15.00</span>
                <span className="text-amber-300 font-mono">(Target: 16 Refs)</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span>🥈 2nd Place: $10.00</span>
                <span className="text-slate-300 font-mono">(Target: 12 Refs)</span>
              </div>
              <div className="flex items-center justify-between text-orange-200">
                <span>🥉 3rd Place: $5.00</span>
                <span className="text-orange-300 font-mono">(Target: 7 Refs)</span>
              </div>
            </div>

            <p className="pt-2 text-center text-[11px] text-purple-200 leading-relaxed font-bold border-t border-white/10">
              You are currently Rank #{user.userRank}. To reach 1st place, you need {refsNeeded} more Refs!
            </p>
          </div>

          {/* Yellow Top Prize Banner */}
          <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider mb-2 shadow-md">
            TOP PRIZE: $15.00
          </div>

          {/* Continue Working Button */}
          <button
            onClick={() => {
              onClose();
              onContinue();
            }}
            className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-blue-700 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition active:scale-98 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Continue Working</span>
          </button>
        </div>
      </div>
    </div>
  );
};
