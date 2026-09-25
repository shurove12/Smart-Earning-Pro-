import React, { useState } from 'react';
import {
  Copy,
  Check,
  History,
  Wallet,
  Headphones,
  CheckCircle2,
  TrendingUp,
  Eye,
  ListChecks,
  Pencil,
  Sparkles,
} from 'lucide-react';
import { AdminSettings, PayoutRecord, UserProfile } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface ProfileScreenProps {
  user: UserProfile;
  settings: AdminSettings;
  payouts: PayoutRecord[];
  onOpenWithdraw: () => void;
  onOpenHistory: () => void;
  onOpenSupport: () => void;
  onOpenSettings: () => void;
  onUpdateAvatar: (avatar: string) => void;
  onUpdateName: (name: string) => void;
  onSimulateReferral: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  settings,
  payouts,
  onOpenWithdraw,
  onOpenHistory,
  onOpenSupport,
  onOpenSettings,
  onUpdateAvatar,
  onUpdateName,
  onSimulateReferral,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(user.name);
  const [showAvatarPicker, setShowAvatarPicker] = useState<boolean>(false);

  const avatarOptions = ['😎', '🐻', '👑', '🦁', '🚀', '⚡', '🥷', '🐱'];

  const referralLink = `https://t.me/${settings.botUsername}/app?start=ref_${user.name.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Profile Hero Card (Matches screenshot 144059 & 143926) */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 p-5 text-white shadow-xl shadow-purple-900/25 border border-white/20 text-center relative overflow-hidden">
        {/* Avatar with edit badge */}
        <div className="relative inline-block mx-auto mb-2">
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="w-20 h-20 rounded-full bg-amber-400 p-1 ring-4 ring-white/40 shadow-xl flex items-center justify-center text-4xl hover:scale-105 transition-transform cursor-pointer"
            title="Change Avatar"
          >
            <span>{user.avatar}</span>
          </button>
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] ring-2 ring-white shadow">
            <Pencil className="w-3 h-3" />
          </div>
        </div>

        {/* Avatar Picker Dropdown */}
        {showAvatarPicker && (
          <div className="mb-3 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center gap-2 flex-wrap">
            {avatarOptions.map((av) => (
              <button
                key={av}
                onClick={() => {
                  onUpdateAvatar(av);
                  setShowAvatarPicker(false);
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-lg transition"
              >
                {av}
              </button>
            ))}
          </div>
        )}

        {/* Username with inline edit */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {isEditingName ? (
            <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent text-white text-sm font-bold text-center w-28 focus:outline-none border-b border-white"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="px-2 py-0.5 rounded bg-emerald-500 text-white text-xs font-bold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl font-extrabold tracking-tight text-white">{user.name}</h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="text-purple-200 hover:text-white p-1"
                title="Edit name"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Balance Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mb-4 shadow-inner">
          <span className="text-xs font-semibold text-purple-200">Balance</span>
          <span className="text-sm font-black text-emerald-400 font-mono">
            {formatCurrency(user.balanceUSD, user.currency)}
          </span>
          <span className="text-[10px] text-purple-200 uppercase font-mono">
            ({user.currency})
          </span>
        </div>

        {/* 3 Stats: Joined, Active, Inactive */}
        <div className="grid grid-cols-3 gap-2 bg-black/20 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
          <div className="text-center">
            <h3 className="text-xl font-black text-white">{user.joinedRefs}</h3>
            <p className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider">
              Joined
            </p>
          </div>
          <div className="text-center border-x border-white/10">
            <h3 className="text-xl font-black text-emerald-300">{user.activeRefs}</h3>
            <p className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider">
              Active
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-black text-rose-300">{user.inactiveRefs}</h3>
            <p className="text-[10px] font-semibold text-purple-200 uppercase tracking-wider">
              Inactive
            </p>
          </div>
        </div>
      </div>

      {/* 2. Action Buttons (Withdraw & History - Matches screenshot 144059) */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenWithdraw}
          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer border border-rose-300/30"
        >
          <Wallet className="w-5 h-5 text-white" />
          <span>Withdraw</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer border border-blue-300/30"
        >
          <History className="w-5 h-5 text-white" />
          <span>History</span>
        </button>
      </div>

      {/* 3. Your Invite Link Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>🔗</span> Your Invite Link
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            $1.00 / referral
          </span>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5 border border-slate-200">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 bg-transparent border-none text-xs text-slate-700 px-2 font-mono truncate focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm shrink-0 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* 4. Detailed Statistics Overview */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center">
          <Eye className="w-4 h-4 text-purple-600 mx-auto mb-1" />
          <span className="text-lg font-black text-slate-900 block font-mono">
            {user.adsWatchedToday}
          </span>
          <span className="text-[10px] font-bold text-slate-500">Ads Watched</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center">
          <ListChecks className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <span className="text-lg font-black text-slate-900 block font-mono">
            {user.tasksCompleted}
          </span>
          <span className="text-[10px] font-bold text-slate-500">Tasks Done</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center">
          <TrendingUp className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
          <span className="text-lg font-black text-slate-900 block font-mono">
            #{user.userRank}
          </span>
          <span className="text-[10px] font-bold text-slate-500">Current Rank</span>
        </div>
      </div>

      {/* 5. Live Payouts Feed with Headphones Support Icon (Matches screenshot 144059 & 143926) */}
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100 relative">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
              LIVE PAYOUTS
            </h3>
          </div>

          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            Real-time
          </span>
        </div>

        {/* Live payouts scroll list */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {payouts.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-150 text-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block leading-tight">
                    {record.userName}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    via <strong className="text-slate-700">{record.method}</strong> · {record.timeAgo}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono font-black text-emerald-600 block">
                  +${record.amountUSD.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 font-medium">Completed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Support floating headphone widget inside live payouts card */}
        <button
          onClick={onOpenSupport}
          className="absolute -top-3 -right-2 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform"
          title="24/7 Live Support"
        >
          <Headphones className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Settings and Testing Hub */}
      <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-800">Preferences & Languages</h4>
          <p className="text-[10px] text-slate-500">
            Language: {user.language} | Currency: {user.currency}
          </p>
        </div>

        <button
          onClick={onOpenSettings}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 text-xs font-bold border border-slate-200 shadow-sm transition cursor-pointer"
        >
          Configure
        </button>
      </div>
    </div>
  );
};
