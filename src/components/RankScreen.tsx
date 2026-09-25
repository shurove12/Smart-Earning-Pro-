import React, { useState } from 'react';
import { Trophy, Gift, Users, Coins, Video, Flame, Crown, Medal } from 'lucide-react';
import { getLeaderboardData } from '../mockData';
import { UserProfile } from '../types';

interface RankScreenProps {
  user: UserProfile;
  onOpenTargetModal: () => void;
  onOpenMegaContestModal: () => void;
}

export const RankScreen: React.FC<RankScreenProps> = ({
  user,
  onOpenTargetModal,
  onOpenMegaContestModal,
}) => {
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');
  const [activeMetric, setActiveMetric] = useState<'top-earners' | 'top-refs' | 'top-unlocks'>(
    'top-earners'
  );

  // Dynamic 1 to 20 rankings generated based on period and metric
  const leaderboardList = getLeaderboardData(activeMetric, period);

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Top Champions Hero Card (Matches screenshot 143843) */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-5 text-white shadow-xl shadow-blue-900/25 border border-white/20 text-center relative overflow-hidden">
        <h2 className="text-xl font-black tracking-tight text-white mb-1">
          Top Champions
        </h2>
        <p className="text-[11px] font-bold tracking-wider text-blue-200 uppercase mb-3">
          STAY AHEAD AND EARN MORE!
        </p>

        {/* Gift Box Graphic */}
        <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 p-1 shadow-lg shadow-pink-500/30 flex items-center justify-center mb-3 ring-4 ring-white/20 relative">
          <span className="text-3xl">🎁</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">
            ★
          </span>
        </div>

        {/* Tap To See Your Rank Button */}
        <button
          onClick={onOpenTargetModal}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-black shadow-md shadow-rose-900/40 transition active:scale-95 mb-4 border border-rose-300/40 cursor-pointer"
        >
          <span>👆</span>
          <span>TAP TO SEE YOUR RANK!</span>
        </button>

        {/* Prize Pool and Countdown */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between border border-white/10 text-xs">
          <div className="flex items-center gap-1.5 font-extrabold text-amber-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>PRIZE: $3.00</span>
          </div>
          <div className="text-purple-200 font-mono font-bold text-[11px]">
            ENDS IN: 09:21:17
          </div>
        </div>
      </div>

      {/* Mega Contest Banner CTA */}
      <div
        onClick={onOpenMegaContestModal}
        className="rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-3 flex items-center justify-between cursor-pointer hover:shadow-md transition active:scale-98 shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🏆</span>
          <div>
            <h4 className="text-xs font-black text-slate-900">Mega Contest Active!</h4>
            <p className="text-[10px] font-semibold text-slate-800">
              Top 3 win cash prize pool! Tap to view targets.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-white rounded-lg text-[10px] font-extrabold text-rose-600 shadow-sm">
          Details
        </span>
      </div>

      {/* 2. Period Filter Pills: Daily, Weekly, Monthly, Yearly */}
      <div className="flex items-center justify-between bg-slate-100 p-1 rounded-2xl border border-slate-200">
        {(['Daily', 'Weekly', 'Monthly', 'Yearly'] as const).map((p) => {
          const isActive = period === p;
          return (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* 3. Metric Filter Tabs: Top Refs, Top Earners, Top Unlocks */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveMetric('top-refs')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center transition border cursor-pointer ${
            activeMetric === 'top-refs'
              ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20 text-rose-600'
              : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-extrabold">Top Refs</span>
        </button>

        <button
          onClick={() => setActiveMetric('top-earners')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center transition border cursor-pointer ${
            activeMetric === 'top-earners'
              ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20 text-rose-600'
              : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Coins className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-extrabold">Top Earners</span>
        </button>

        <button
          onClick={() => setActiveMetric('top-unlocks')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center transition border cursor-pointer ${
            activeMetric === 'top-unlocks'
              ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20 text-rose-600'
              : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Video className="w-5 h-5 mb-1" />
          <span className="text-[11px] font-extrabold">Top Unlocks</span>
        </button>
      </div>

      {/* 4. Complete 1 to 20 Leaderboard Ranking List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
            🏆 Top 20 লিডারবোর্ড ({period})
          </span>
          <span className="text-[10px] text-slate-500 font-bold">1 - 20 জন র্যাংক</span>
        </div>

        {leaderboardList.map((item) => {
          const isGold = item.rank === 1;
          const isSilver = item.rank === 2;
          const isBronze = item.rank === 3;
          const isYou = item.isCurrentUser;

          return (
            <div
              key={`${item.rank}-${item.name}`}
              className={`rounded-2xl p-2.5 flex items-center justify-between border transition ${
                isGold
                  ? 'bg-gradient-to-r from-amber-50 via-yellow-100/70 to-amber-50 border-amber-300 shadow-sm ring-1 ring-amber-400'
                  : isSilver
                  ? 'bg-gradient-to-r from-slate-50 via-blue-50/70 to-slate-50 border-blue-200 shadow-sm'
                  : isBronze
                  ? 'bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-orange-200 shadow-sm'
                  : isYou
                  ? 'bg-purple-50 border-purple-300 shadow-sm ring-2 ring-purple-500/30'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Rank Badge / Icon */}
                <div className="w-6 text-center shrink-0">
                  {isGold ? (
                    <span className="text-xl">🥇</span>
                  ) : isSilver ? (
                    <span className="text-xl">🥈</span>
                  ) : isBronze ? (
                    <span className="text-xl">🥉</span>
                  ) : (
                    <span className="text-xs font-extrabold text-slate-500 font-mono">
                      #{item.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 shadow-xs border ${
                    isGold
                      ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-300'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  {item.avatar}
                </div>

                {/* Name & Subtitles */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-900 leading-tight">
                      {item.name}
                    </h4>
                    {isGold && (
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
                        👑 King
                      </span>
                    )}
                    {isSilver && (
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold">
                        2nd
                      </span>
                    )}
                    {isBronze && (
                      <span className="px-1.5 py-0.2 rounded-full bg-orange-200 text-orange-800 text-[9px] font-bold">
                        3rd
                      </span>
                    )}
                  </div>

                  {item.bonusText && (
                    <span className="text-[9px] text-rose-600 font-bold block mt-0.5">
                      {item.bonusText}
                    </span>
                  )}
                </div>
              </div>

              {/* Value Pill */}
              <div
                className={`px-2.5 py-1 rounded-xl font-mono text-xs font-black tracking-tight ${
                  isGold
                    ? 'bg-white text-emerald-700 shadow-sm border border-amber-300'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
