import React, { useState } from 'react';
import { X, CheckCircle2, Film, Coins, Star } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  currentCategory: string;
  onClose: () => void;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  currentCategory,
  onClose,
  onSelectCategory,
}) => {
  const [selected, setSelected] = useState<string>(currentCategory);

  if (!isOpen) return null;

  const categories = [
    {
      id: 'অনলাইন ইনকাম',
      title: 'অনলাইন ইনকাম',
      sub: 'FRESH',
      icon: <Coins className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'Movies & Clips',
      title: 'Movies & Clips',
      sub: 'MOVIE',
      icon: <Film className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'Free Mehod',
      title: 'Free Mehod',
      sub: 'FREE_MEHOD_1789122072',
      icon: <Star className="w-5 h-5 text-rose-500" />,
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200 relative border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-xl font-black text-slate-900 mb-1">Select Category</h3>
        <p className="text-xs text-slate-500 mb-5">
          আপনি কোন ক্যাটাগরির ভিডিও দেখতে চান তা নির্বাচন করুন।
        </p>

        {/* Category list (Matches screenshot 143945) */}
        <div className="space-y-3 mb-6">
          {categories.map((cat) => {
            const isChosen = selected === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelected(cat.id)}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition border ${
                  isChosen
                    ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200/80 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${cat.bg}`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{cat.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {cat.sub}
                    </span>
                  </div>
                </div>

                {isChosen && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            onSelectCategory(selected);
            onClose();
          }}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 transition active:scale-98 cursor-pointer"
        >
          Change Category
        </button>
      </div>
    </div>
  );
};
