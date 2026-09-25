import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  imageUrl,
  onClose,
}) => {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-sm w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-2 border border-white/20 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center text-xs shadow z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <img
          src={imageUrl}
          alt="Demo Preview"
          className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
        />

        <div className="p-3 text-center text-xs text-white/80 font-bold">
          Job Demonstration Proof Screenshot
        </div>
      </div>
    </div>
  );
};
