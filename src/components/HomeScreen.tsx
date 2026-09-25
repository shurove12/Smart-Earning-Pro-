import React, { useState } from 'react';
import {
  ListChecks,
  Video,
  Users,
  Wallet,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Play,
  Bell,
  Sparkles,
} from 'lucide-react';
import { ScreenType, UserProfile, VideoItem } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface HomeScreenProps {
  user: UserProfile;
  videos: VideoItem[];
  onChangeScreen: (screen: ScreenType) => void;
  onOpenWithdraw: () => void;
  onOpenCategoryModal: () => void;
  onSelectVideo: (video: VideoItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  videos,
  onChangeScreen,
  onOpenWithdraw,
  onOpenCategoryModal,
  onSelectVideo,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All Videos');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const subCategories = [
    'All Videos',
    'Monetag Video Ads',
    'অনলাইন ইনকাম',
    'VIP Ads',
  ];

  const filteredVideos = videos.filter((video) => {
    if (selectedSubCategory === 'All Videos') return true;
    return (
      video.category.toLowerCase().includes(selectedSubCategory.toLowerCase()) ||
      video.title.toLowerCase().includes(selectedSubCategory.toLowerCase())
    );
  });

  const minWithdrawUSD = 10.0;
  const progressPercent = Math.min(100, Math.max(5, (user.balanceUSD / minWithdrawUSD) * 100));

  return (
    <div className="space-y-4 pb-24">
      {/* 1. Main Balance Card (matches screenshot 145511) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-5 text-white shadow-xl shadow-purple-900/20 border border-white/20">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-purple-200 font-semibold mb-1">
              Total Balance
            </h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                {formatCurrency(user.balanceUSD, user.currency)}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-purple-100">
                {user.currency}
              </span>
            </div>
          </div>

          <button
            onClick={() => onChangeScreen('refer')}
            className="flex items-center gap-1 text-[11px] font-semibold bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full transition border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Refer & Earn $1</span>
          </button>
        </div>

        {/* Progress Bar towards $10.00 withdrawal */}
        <div className="mt-4">
          <div className="w-full bg-black/30 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Withdraw Alert Notice Pill */}
        <div className="mt-3 text-center">
          <button
            onClick={onOpenWithdraw}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/90 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/30 transition transform active:scale-95 border border-rose-300/40"
          >
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Withdraw from minimum $10.00!</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Action Grid (Tasks, Videos, Refer, Withdraw) */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onChangeScreen('earn')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 transition active:scale-95 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform">
            <ListChecks className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-1.5">Tasks</span>
        </button>

        <button
          onClick={() => {
            const el = document.getElementById('video-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 transition active:scale-95 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-1.5">Videos</span>
        </button>

        <button
          onClick={() => onChangeScreen('refer')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 transition active:scale-95 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-1.5">Refer</span>
        </button>

        <button
          onClick={onOpenWithdraw}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 transition active:scale-95 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 mt-1.5">Withdraw</span>
        </button>
      </div>

      {/* 3. Category Banner with Filter Selector (matching screenshot 145515 & 143945) */}
      <div id="video-section" className="pt-1">
        <div className="rounded-2xl p-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-md">
          <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎬</span>
              <h3 className="font-extrabold text-sm uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
                {user.selectedCategory.toUpperCase()}
              </h3>
            </div>

            <button
              onClick={onOpenCategoryModal}
              className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 flex items-center justify-center transition active:scale-95"
              title="Change Category"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Horizontal Sub-Category Pills with Arrows */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => {
            const idx = subCategories.indexOf(selectedSubCategory);
            const prev = idx > 0 ? subCategories[idx - 1] : subCategories[subCategories.length - 1];
            setSelectedSubCategory(prev);
          }}
          className="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow hover:bg-emerald-700 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {subCategories.map((cat) => {
            const isSelected = selectedSubCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shadow-sm ${
                  isSelected
                    ? 'bg-purple-700 text-white shadow-purple-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            const idx = subCategories.indexOf(selectedSubCategory);
            const next = idx < subCategories.length - 1 ? subCategories[idx + 1] : subCategories[0];
            setSelectedSubCategory(next);
          }}
          className="w-7 h-7 shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow hover:bg-emerald-700 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. Video Cards Grid (2 Columns, matching screenshot 145515) */}
      <div className="grid grid-cols-2 gap-3">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
          >
            {/* Thumbnail with Demo Avail tag */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow">
                Demo Avail.
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
            </div>

            {/* Video Info & Watch Button */}
            <div className="p-2.5 flex-1 flex flex-col justify-between">
              <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight mb-2 group-hover:text-purple-700 transition-colors">
                {video.title}
              </h4>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectVideo(video);
                }}
                className="w-full py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1 transition active:scale-95 border border-purple-200"
              >
                <Play className="w-3 h-3 fill-purple-700" />
                <span>Watch Ad to View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer (matches screenshot 145515) */}
      <div className="flex items-center justify-center gap-4 pt-2 pb-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-sm disabled:opacity-40"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-bold text-slate-600">Page {currentPage}</span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
