import React from 'react';
import { X, Trophy, Rocket, Sparkles } from 'lucide-react';

interface MegaContestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export const MegaContestModal: React.FC<MegaContestModalProps> = ({
  isOpen,
  onClose,
  onJoin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-3xl p-1.5 w-full max-w-xs shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative text-center">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-white/95 rounded-[22px] p-5 space-y-4">
          {/* Trophy Header Graphic */}
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto shadow-md ring-4 ring-amber-300 relative">
            <Trophy className="w-8 h-8 text-amber-600 fill-amber-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-white">
              ★
            </span>
          </div>

          <h3 className="text-xl font-black text-rose-600 tracking-tight">
            Mega Contest!
          </h3>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-slate-800 space-y-2.5 text-left leading-relaxed">
            <p className="font-extrabold text-slate-900">
              🎉 মেগা ইভেন্ট শুরু হয়েছে! প্রতিদিন, প্রতি সপ্তাহে এবং প্রতি মাসে লিডারবোর্ডের টপ ৩ জন জিতে নিবে <span className="text-emerald-700 font-black">ক্যাশ প্রাইজ!</span>
            </p>

            <div className="bg-white p-2.5 rounded-xl border border-amber-200 text-amber-950 font-bold text-[11px] text-center">
              আজই রেফার শুরু করুন এবং হাজার ডলারের প্রাইজ পুলে অংশগ্রহণ করুন!
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onJoin();
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Join Competition</span>
          </button>
        </div>
      </div>
    </div>
  );
};
