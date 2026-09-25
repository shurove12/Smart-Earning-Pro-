import React, { useState } from 'react';
import { X, Briefcase, Copy, ExternalLink, Upload, Check, CheckCircle2 } from 'lucide-react';
import { JobItem } from '../../types';

interface JobDetailModalProps {
  job: JobItem | null;
  onClose: () => void;
  onSubmitJobProof: (jobId: string, textProof: string, files: File[]) => void;
  onOpenDemoImage: (imageUrl: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onSubmitJobProof,
  onOpenDemoImage,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [textProof, setTextProof] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!job) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(job.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitJobProof(job.id, textProof, selectedFiles);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 p-5 space-y-4 my-auto relative">
        {/* Floating Close Button in top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header (Matches screenshot 144259) */}
        <div className="flex items-center gap-3 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-extrabold text-base text-slate-900 leading-tight">{job.title}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black text-emerald-600 font-mono">
                💰 REWARD: ${job.rewardUSD.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Proof Submitted!</h4>
            <p className="text-xs text-slate-600">
              Task review underway. +${job.rewardUSD.toFixed(2)} has been added to your pending earnings!
            </p>
          </div>
        ) : (
          <>
            {/* ℹ️ JOB DESCRIPTION Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-1.5 font-extrabold text-blue-600 uppercase tracking-wide text-[11px]">
                <span>ℹ️</span>
                <span>JOB DESCRIPTION</span>
              </div>

              {job.description.map((desc, idx) => (
                <p key={idx} className="leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>

            {/* 📷 DEMO PICTURES with Expand preview */}
            <div className="bg-blue-50/70 rounded-2xl p-3 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-1">
                  <span>📷</span> DEMO PICTURES
                </span>
                <span className="text-[10px] text-slate-500">
                  ছবিতে ক্লিক করে বড় করে দেখতে পারবেন
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() =>
                    onOpenDemoImage(
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
                    )
                  }
                  className="h-20 bg-slate-200 rounded-xl overflow-hidden cursor-pointer relative border border-slate-300 hover:opacity-90 transition group flex items-center justify-center"
                >
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                    alt="Demo 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] font-bold">
                    Demo 1 🔍
                  </div>
                </div>

                <div
                  onClick={() =>
                    onOpenDemoImage(
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
                    )
                  }
                  className="h-20 bg-slate-200 rounded-xl overflow-hidden cursor-pointer relative border border-slate-300 hover:opacity-90 transition group flex items-center justify-center"
                >
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
                    alt="Demo 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[11px] font-bold">
                    Demo 2 🔍
                  </div>
                </div>
              </div>
            </div>

            {/* Job Link & Open Button */}
            <div className="rounded-2xl p-3 bg-blue-50/60 border border-blue-100 space-y-2">
              <span className="text-[11px] font-bold text-blue-900 block">
                Click the button below or copy the link to complete the job:
              </span>

              <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={job.url}
                  className="flex-1 bg-transparent border-none text-xs text-slate-700 px-1 font-mono truncate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-bold transition flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Job Link</span>
              </a>
            </div>

            {/* ⬆️ SUBMIT PROOF Section */}
            <form
              onSubmit={handleSubmit}
              className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200 space-y-3"
            >
              <div className="flex items-center gap-1.5 font-extrabold text-amber-800 uppercase tracking-wide text-xs">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>SUBMIT PROOF</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Text Proof (Optional)
                </label>
                <textarea
                  rows={2}
                  value={textProof}
                  onChange={(e) => setTextProof(e.target.value)}
                  placeholder="Write username/email etc..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Upload Screenshots (2 Required)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-200 file:text-amber-900 hover:file:bg-amber-300 cursor-pointer"
                />
                {selectedFiles.length > 0 && (
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                    ✓ {selectedFiles.length} file(s) selected
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-red-600 hover:from-red-600 hover:to-rose-600 text-white font-black text-xs shadow-md shadow-rose-500/25 flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Proof'}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
