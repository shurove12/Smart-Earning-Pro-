import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CurrencyType, LanguageType } from '../../types';

interface SetupProfileModalProps {
  isOpen: boolean;
  currentLanguage: LanguageType;
  currentCurrency: CurrencyType;
  onClose: () => void;
  onSave: (lang: LanguageType, curr: CurrencyType) => void;
}

export const SetupProfileModal: React.FC<SetupProfileModalProps> = ({
  isOpen,
  currentLanguage,
  currentCurrency,
  onClose,
  onSave,
}) => {
  const [selectedLang, setSelectedLang] = useState<LanguageType>(currentLanguage);
  const [selectedCurr, setSelectedCurr] = useState<CurrencyType>(currentCurrency);

  if (!isOpen) return null;

  const languages: LanguageType[] = ['English', 'বাংলা', 'हिंदी', 'اردو'];
  const currencies: { id: CurrencyType; label: string }[] = [
    { id: 'USD', label: '$ USD' },
    { id: 'BDT', label: '৳ BDT' },
    { id: 'INR', label: '₹ INR' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200 relative border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-1">Setup Profile</h3>
        <p className="text-xs text-slate-500 mb-5">Choose your settings</p>

        {/* Language Selection */}
        <div className="text-left mb-4">
          <label className="text-xs font-bold text-slate-600 block mb-2">Language</label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => {
              const isSelected = selectedLang === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currency Display Selection */}
        <div className="text-left mb-6">
          <label className="text-xs font-bold text-slate-600 block mb-2">Currency Display</label>
          <div className="grid grid-cols-3 gap-2">
            {currencies.map((curr) => {
              const isSelected = selectedCurr === curr.id;
              return (
                <button
                  key={curr.id}
                  type="button"
                  onClick={() => setSelectedCurr(curr.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {curr.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onSave(selectedLang, selectedCurr)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition active:scale-98 cursor-pointer"
          >
            Save & Continue
          </button>

          <button
            onClick={onClose}
            className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-600 font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
