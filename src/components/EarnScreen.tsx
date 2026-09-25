import React, { useState } from 'react';
import { Play, Globe, Briefcase, Sparkles, Clock, CheckCircle, Zap, ShieldAlert } from 'lucide-react';
import { JobItem, UserProfile } from '../types';

interface EarnScreenProps {
  user: UserProfile;
  jobs: JobItem[];
  completedJobIds: string[];
  runningTaskId?: string | null;
  onOpenWatchAd: () => void;
  onSelectJob: (job: JobItem) => void;
}

export const EarnScreen: React.FC<EarnScreenProps> = ({
  user,
  jobs,
  completedJobIds,
  runningTaskId,
  onOpenWatchAd,
  onSelectJob,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'quick' | 'vip'>('all');

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'quick') return (job.timeSeconds || 0) <= 60;
    if (activeTab === 'vip') return (job.timeSeconds || 0) > 60;
    return true;
  });

  return (
    <div className="space-y-4 pb-28">
      {/* 1. Watch Ads & Earn Card (Matches screenshot 144248) */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 p-5 text-white shadow-xl shadow-purple-900/25 border border-white/20 text-center relative overflow-hidden">
        {/* Shiny Coins graphic */}
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center mb-3 ring-4 ring-white/20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex flex-col items-center justify-center">
            <span className="text-2xl">💰</span>
            <span className="text-[10px] font-black text-amber-100 tracking-tighter -mt-1 font-mono">
              $$$
            </span>
          </div>
        </div>

        <h2 className="text-xl font-black tracking-tight text-white mb-2">
          Watch Ads & Earn
        </h2>

        {/* Per ad reward badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 mb-2">
          <span className="text-xs font-medium text-purple-200">Per Ad Reward:</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-xs font-black shadow-sm">
            $0.1000
          </span>
        </div>

        <div className="text-xs font-semibold text-purple-200 mb-4 flex items-center justify-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>
            DAILY LIMIT: {user.adsWatchedToday} / {user.maxDailyAds}
          </span>
        </div>

        {/* Watch Ad Button */}
        <button
          onClick={onOpenWatchAd}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-black text-base shadow-xl shadow-amber-500/40 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer ring-2 ring-amber-300/60"
        >
          <Play className="w-5 h-5 fill-slate-900" />
          <span>WATCH AD NOW</span>
        </button>
      </div>

      {/* Rules Notice Pill */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2 text-xs text-amber-950 font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-900 block mb-0.5">টাস্ক সম্পন্ন করার নিয়মাবলী:</strong>
          প্রতিটি টাস্কের লিংকে নির্ধারিত সেকেন্ড অবস্থান করতে হবে। নির্ধারিত সময়ের পূর্বে ফিরে আসলে রিওয়ার্ড বাতিল হবে।
        </div>
      </div>

      {/* 2. Filter Tabs: All 20 Tasks vs Quick vs VIP */}
      <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeTab === 'all'
              ? 'bg-purple-700 text-white shadow-md shadow-purple-700/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>সব টাস্ক ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quick')}
          className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeTab === 'quick'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>১৫s - ৬০s</span>
        </button>

        <button
          onClick={() => setActiveTab('vip')}
          className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
            activeTab === 'vip'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>৭৫s - ৩০০s</span>
        </button>
      </div>

      {/* 3. Jobs List: Full 1 to 20 Tasks */}
      <div className="space-y-2.5">
        {filteredJobs.map((job, index) => {
          const isDone = completedJobIds.includes(job.id);
          const isRunning = runningTaskId === job.id;

          return (
            <div
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`bg-white rounded-2xl p-3.5 border transition cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden group shadow-sm hover:shadow-md ${
                isRunning ? 'border-amber-400 ring-2 ring-amber-300 bg-amber-50/50' : 'border-slate-200/80'
              }`}
            >
              {/* Left yellow bar indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${
                  isDone
                    ? 'bg-emerald-500'
                    : isRunning
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-gradient-to-b from-amber-400 to-orange-500'
                }`}
              />

              <div className="flex items-center gap-3 pl-1.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : isRunning
                      ? 'bg-amber-100 text-amber-700 border-amber-300'
                      : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : job.timeSeconds && job.timeSeconds > 60 ? (
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Globe className="w-5 h-5 text-blue-600" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {job.title}
                    </h4>
                    {job.isHot && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider">
                        HOT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-extrabold text-emerald-600 font-mono">
                      +${job.rewardUSD.toFixed(2)}
                    </span>
                    {job.timeSeconds && (
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        ⏱ {job.timeSeconds} সেকেন্ড
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isDone ? (
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                  <span>Done</span>
                </div>
              ) : isRunning ? (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 bg-amber-500 text-slate-950 animate-pulse shadow-sm"
                >
                  রানিং... ⏳
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectJob(job);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition shadow-sm ${
                    job.buttonText.includes('Complete')
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : job.buttonText.includes('Join')
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95 cursor-pointer'
                  }`}
                >
                  {job.buttonText}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
