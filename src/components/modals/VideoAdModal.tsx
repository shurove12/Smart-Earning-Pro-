import React from 'react';
import { X, Play, Eye, CheckCircle } from 'lucide-react';
import { VideoItem } from '../../types';

interface VideoAdModalProps {
  video: VideoItem | null;
  directLink: string;
  onClose: () => void;
  onWatchAd: (video: VideoItem) => void;
  onWatchDemoInInbox: (video: VideoItem) => void;
}

export const VideoAdModal: React.FC<VideoAdModalProps> = ({
  video,
  directLink,
  onClose,
  onWatchAd,
  onWatchDemoInInbox,
}) => {
  if (!video) return null;

  const isUnlocked = video.adsWatched >= video.adsRequired;

  const handleOpenDirectLink = () => {
    window.open(video.videoUrl || directLink, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3">
      <div className="bg-gradient-to-b from-amber-300 via-amber-200 to-yellow-300 rounded-3xl p-1.5 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative">
        <div className="bg-white rounded-[22px] p-5 space-y-4 relative">
          {/* Close button in top right (Matches screenshot 143932) */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 transition ring-2 ring-white z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Video Thumbnail with Views Tag */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md bg-slate-900">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            {/* YouTube logo pill */}
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Play className="w-3 h-3 fill-white" />
              <span>YouTube</span>
            </div>

            {/* Views Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full border border-white/20 shadow">
              👁 Views : {video.views}
            </div>

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 fill-rose-600 ml-0.5" />
              </div>
            </div>
          </div>

          {/* Video Title */}
          <h3 className="font-extrabold text-sm text-slate-900 text-center leading-snug">
            {video.title}
          </h3>

          {/* Watched Status Badge (Matches screenshot 143932) */}
          <div className="flex justify-center">
            <div
              className={`px-4 py-1 rounded-full text-xs font-black font-mono shadow-inner tracking-wider ${
                isUnlocked ? 'bg-emerald-600 text-white' : 'bg-black text-amber-300'
              }`}
            >
              {isUnlocked ? 'UNLOCKED! FULL MOVIE READY ✓' : `Watched: ${video.adsWatched} / ${video.adsRequired}`}
            </div>
          </div>

          <p className="text-xs text-slate-600 font-semibold text-center">
            {isUnlocked
              ? 'মুভিটি আনলক হয়েছে! নিচের বাটনে ক্লিক করে ফুল এইচডি ভিডিও উপভোগ করুন।'
              : 'Watch the ad completely to view full video.'}
          </p>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            {isUnlocked ? (
              <button
                onClick={handleOpenDirectLink}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Full Movie / Video Now</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onWatchDemoInInbox(video)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Watch Demo in Inbox</span>
                </button>

                <button
                  onClick={() => onWatchAd(video)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs shadow-md shadow-slate-900/40 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Monetag Ad ({video.adsWatched}/{video.adsRequired})</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
