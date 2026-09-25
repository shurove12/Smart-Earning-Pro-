import React, { useState, useEffect } from 'react';
import { Copy, Check, Send, Sparkles, Gift, Lock, Award, ChevronRight } from 'lucide-react';
import { AdminSettings, ReferralMilestone, UserProfile } from '../types';
import { initialReferralMilestones } from '../mockData';
import confetti from 'canvas-confetti';

interface ReferScreenProps {
  user: UserProfile;
  settings: AdminSettings;
  onClaimDailyReward: (rewardUSD: number, freeVideos: number, rewardLabel: string) => void;
  onSimulateReferral: () => void;
  onSendToInbox: () => void;
}

export const ReferScreen: React.FC<ReferScreenProps> = ({
  user,
  settings,
  onClaimDailyReward,
  onSimulateReferral,
  onSendToInbox,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [claimedLevels, setClaimedLevels] = useState<Record<number, boolean>>({});

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 16,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const referralLink = `https://t.me/${settings.botUsername}/app?start=ref_${user.name.toLowerCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = (milestone: ReferralMilestone) => {
    if (claimedLevels[milestone.level]) return;
    if (user.joinedRefs < milestone.requiredRefs) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.65 },
    });
    setClaimedLevels((prev) => ({ ...prev, [milestone.level]: true }));
    onClaimDailyReward(
      milestone.rewardUSD,
      milestone.freeVideos,
      `Level ${milestone.level}: ${milestone.title}`
    );
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 👑 ১. প্রিমিয়াম রিওয়ার্ডস কার্ড (সবার উপরে - Matches screenshots 144319 & 144314) */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 p-5 text-white shadow-xl shadow-purple-900/25 border border-white/20 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2 border border-amber-400/30">
          <span>👑</span> PREMIUM REWARDS
        </div>

        <h2 className="text-xl font-extrabold tracking-tight text-white mb-2">
          Invite Friends
        </h2>

        <p className="text-xs text-purple-100/90 leading-relaxed max-w-xs mx-auto mb-4">
          For every successful referral you will get{' '}
          <strong className="text-amber-300 font-extrabold">${settings.referralRewardUSD.toFixed(2)}</strong>{' '}
          directly in pending balance! It moves to main balance once they start working.
        </p>

        {/* Pending Referral Bonus Box */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 flex items-center justify-between border border-white/10 mb-4 shadow-inner">
          <div className="text-left">
            <span className="text-[11px] font-bold tracking-wider text-purple-200 block uppercase">
              Pending Referral Bonus
            </span>
          </div>
          <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
            ${user.pendingBonusUSD.toFixed(2)}
          </span>
        </div>

        {/* Send to Inbox Button */}
        <button
          onClick={onSendToInbox}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98 mb-4 cursor-pointer"
        >
          <Send className="w-4 h-4 text-slate-900" />
          <span>Send to Inbox</span>
        </button>

        {/* 3 Referral Stats */}
        <div className="grid grid-cols-3 gap-2 bg-black/20 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
          <div className="text-center">
            <h3 className="text-xl font-black text-white">{user.joinedRefs}</h3>
            <p className="text-[11px] font-medium text-purple-200">Joined</p>
          </div>
          <div className="text-center border-x border-white/10">
            <h3 className="text-xl font-black text-emerald-300">{user.activeRefs}</h3>
            <p className="text-[11px] font-medium text-purple-200">Active</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-rose-300">{user.inactiveRefs}</h3>
            <p className="text-[11px] font-medium text-purple-200">Inactive</p>
          </div>
        </div>

        {/* Simulator Button for testing 10 levels */}
        <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-center text-xs">
          <span className="text-[11px] text-purple-200">Test Invite System:</span>
          <button
            onClick={onSimulateReferral}
            className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-amber-300 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>+ Simulate 1 Invite</span>
          </button>
        </div>
      </div>

      {/* 🔗 ২. রেফারেল লিংক কার্ড (প্রিমিয়াম কার্ডের ঠিক নিচে) */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border-l-4 border-purple-600 border-slate-200/80">
        <h3 className="text-xs font-extrabold text-purple-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span>🔗</span> Your Referral Link
        </h3>

        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 border border-slate-200">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-transparent border-none text-xs text-slate-700 px-2 font-mono truncate focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm shrink-0 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 🎁 ৩. ফ্রি আনলক গাইড */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift className="w-5 h-5 text-purple-600" />
          <h3 className="text-sm font-extrabold text-purple-800">Free Unlock Guide!</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900 font-bold">Invite Friends:</strong> Get free video access per referral.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900 font-bold">Milestones:</strong> Watch ads to automatically get a{' '}
              <span className="text-rose-600 font-bold">Gift Card!</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900 font-bold">10 Level Rewards:</strong> Complete referral tiers to unlock massive cash rewards!
            </div>
          </div>
        </div>
      </div>

      {/* 🟡 ৪. ইয়েলো ব্যানার */}
      <div className="rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 p-3 text-center text-slate-900 font-black text-xs tracking-wider shadow-md shadow-amber-500/20 border border-amber-300">
        WORK DAILY, GET PAID 100%! 💸
      </div>

      {/* 🎁 ৫. ১০ লেভেল রেফারেল প্রজেক্ট ও রিওয়ার্ডস (Full 10 Levels) */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <Award className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                ১০ লেভেল রেফার প্রজেক্ট রিওয়ার্ডস
              </h3>
              <p className="text-[10px] text-slate-500">
                প্রতিটি লেভেলে রেফার টার্গেট পূরণ করে রিওয়ার্ড নিন
              </p>
            </div>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold font-mono">
            ⏳ {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>

        {/* আজকের রেফার ও মোট রেফার কাউন্টার */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-blue-50/80 border border-blue-100 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900">আজকের রেফার:</span>
            <span className="bg-white px-2.5 py-0.5 rounded-lg text-xs font-extrabold text-blue-700 shadow-sm border border-blue-200">
              {user.todayRefs}
            </span>
          </div>

          <div className="bg-purple-50/80 border border-purple-100 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900">মোট রেফার:</span>
            <span className="bg-white px-2.5 py-0.5 rounded-lg text-xs font-extrabold text-purple-700 shadow-sm border border-purple-200">
              {user.joinedRefs}
            </span>
          </div>
        </div>

        {/* All 10 Referral Project Levels */}
        <div className="space-y-2.5">
          {initialReferralMilestones.map((m) => {
            const isUnlocked = user.joinedRefs >= m.requiredRefs;
            const isClaimed = claimedLevels[m.level];
            const neededRefs = Math.max(0, m.requiredRefs - user.joinedRefs);
            const progress = Math.min(100, (user.joinedRefs / m.requiredRefs) * 100);

            return (
              <div
                key={m.level}
                className={`p-3 rounded-2xl border transition ${
                  isClaimed
                    ? 'bg-slate-50 border-slate-200 opacity-80'
                    : isUnlocked
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-300 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 bg-gradient-to-r ${m.color}`}
                    >
                      L{m.level}
                    </span>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 leading-tight">
                        {m.title}
                      </h5>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Target: {m.requiredRefs} Refs
                      </span>
                    </div>
                  </div>

                  {/* Reward Badges */}
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-black font-mono">
                      +${m.rewardUSD.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-[10px] font-bold">
                      +{m.freeVideos} Videos
                    </span>
                  </div>
                </div>

                {/* Progress bar inside card */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100">
                  <div className="flex-1">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${m.color}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {!isUnlocked && (
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                        Need {neededRefs} more referral{neededRefs > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  {/* Claim Button */}
                  <button
                    onClick={() => handleClaim(m)}
                    disabled={!isUnlocked || isClaimed}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition shadow-sm shrink-0 cursor-pointer ${
                      isClaimed
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : isUnlocked
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 shadow-emerald-600/30'
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed flex items-center gap-1'
                    }`}
                  >
                    {isClaimed ? (
                      'Claimed ✓'
                    ) : isUnlocked ? (
                      'Claim 🎁'
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Locked</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
