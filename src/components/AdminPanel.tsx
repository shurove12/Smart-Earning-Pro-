import React, { useState } from 'react';
import {
  ShieldAlert,
  Save,
  PlusCircle,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  Smartphone,
  Video,
  Briefcase,
  Settings,
  DollarSign,
  Users,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { AdminSettings, JobItem, PayoutRecord, UserProfile, VideoItem } from '../types';

interface AdminPanelProps {
  settings: AdminSettings;
  user: UserProfile;
  videos: VideoItem[];
  jobs: JobItem[];
  payouts: PayoutRecord[];
  onSaveSettings: (newSettings: AdminSettings) => void;
  onAddVideo: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onAddJob: (job: JobItem) => void;
  onDeleteJob: (id: string) => void;
  onUpdatePayoutStatus: (id: string, status: 'Completed' | 'Rejected') => void;
  onUpdateUserBalance: (newBalance: number) => void;
  onExitAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  user,
  videos,
  jobs,
  payouts,
  onSaveSettings,
  onAddVideo,
  onDeleteVideo,
  onAddJob,
  onDeleteJob,
  onUpdatePayoutStatus,
  onUpdateUserBalance,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'videos' | 'jobs' | 'withdrawals' | 'apk'>('settings');

  // Form states for settings
  const [formData, setFormData] = useState<AdminSettings>(settings);

  // New video form
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('All Videos');
  const [newVideoThumbnail, setNewVideoThumbnail] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState(settings.monetagDirectLink);

  // New job form
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobReward, setNewJobReward] = useState('0.50');
  const [newJobType, setNewJobType] = useState<'visit' | 'special'>('special');
  const [newJobUrl, setNewJobUrl] = useState(settings.monetagDirectLink);
  const [newJobDescription, setNewJobDescription] = useState('লিংকে ভিজিট করে নির্দেশনা মেনে কাজ সম্পন্ন করুন।');

  // User balance override
  const [manualBalance, setManualBalance] = useState(user.balanceUSD.toString());

  const [apkNotice, setApkNotice] = useState<string | null>(null);
  const [balanceSavedNotice, setBalanceSavedNotice] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim()) return;

    const newVid: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideoTitle,
      category: newVideoCategory,
      thumbnail:
        newVideoThumbnail.trim() ||
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=80',
      views: '1.2K',
      demoAvailable: true,
      adsRequired: 2,
      adsWatched: 0,
      videoUrl: newVideoUrl || settings.monetagDirectLink,
    };

    onAddVideo(newVid);
    setNewVideoTitle('');
    setNewVideoThumbnail('');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const newJobItem: JobItem = {
      id: `job-${Date.now()}`,
      title: newJobTitle,
      rewardUSD: parseFloat(newJobReward) || 0.5,
      type: newJobType,
      isHot: true,
      buttonText: 'Complete Work',
      url: newJobUrl || settings.monetagDirectLink,
      description: [newJobDescription],
      proofRequirements: ['Submit screenshot proof or Telegram ID'],
      demoPictures: [],
    };

    onAddJob(newJobItem);
    setNewJobTitle('');
    setNewJobDescription('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-3 sm:p-5 max-w-xl mx-auto space-y-4">
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-purple-800 p-4 rounded-3xl shadow-xl flex items-center justify-between border border-red-400/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
            title="Back to User App"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
              <h2 className="font-black text-base tracking-wide text-white">
                SMART EARN ADMIN
              </h2>
            </div>
            <p className="text-[10px] text-red-200">
              এখান থেকে অ্যাপের সবকিছু নিয়ন্ত্রণ ও আপলোড করুন
            </p>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="px-3 py-1.5 rounded-xl bg-white text-red-700 text-xs font-black shadow-md hover:bg-slate-100 transition cursor-pointer"
        >
          User App
        </button>
      </div>

      {/* Admin Subnav Tabs */}
      <div className="grid grid-cols-5 gap-1 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === 'settings' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 mb-0.5" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === 'videos' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4 mb-0.5" />
          <span>Videos</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === 'jobs' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-0.5" />
          <span>Tasks</span>
        </button>

        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === 'withdrawals' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4 mb-0.5" />
          <span>Payouts</span>
        </button>

        <button
          onClick={() => setActiveTab('apk')}
          className={`py-2 px-1 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === 'apk' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4 mb-0.5" />
          <span>APK / PWA</span>
        </button>
      </div>

      {/* 1. Global Settings Tab */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSettingsSubmit} className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Monetag অ্যাডস এবং অ্যাপ কন্ট্রোল</span>
            </h3>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> সংরক্ষিত!
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Monetag Zone ID (যেমন: 11887274)
              </label>
              <input
                type="text"
                value={formData.monetagZoneId}
                onChange={(e) => setFormData({ ...formData, monetagZoneId: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">
                Monetag Direct Link (যেমন: https://omg10.com/4/11887609)
              </label>
              <input
                type="text"
                value={formData.monetagDirectLink}
                onChange={(e) => setFormData({ ...formData, monetagDirectLink: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Telegram Bot ইউজারনেম
                </label>
                <input
                  type="text"
                  value={formData.botUsername}
                  onChange={(e) => setFormData({ ...formData, botUsername: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-red-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  মিনিমাম উইথড্র অ্যামাউন্ট ($)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.minWithdrawUSD}
                  onChange={(e) => setFormData({ ...formData, minWithdrawUSD: parseFloat(e.target.value) || 10 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-red-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  প্রতি অ্যাড রিওয়ার্ড ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.perAdRewardUSD}
                  onChange={(e) => setFormData({ ...formData, perAdRewardUSD: parseFloat(e.target.value) || 0.1 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-red-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  প্রতি রেফার রিওয়ার্ড ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.referralRewardUSD}
                  onChange={(e) => setFormData({ ...formData, referralRewardUSD: parseFloat(e.target.value) || 1.0 })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-red-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Mandatory Channel Join Settings */}
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">বাধ্যতামূলক চ্যানেল জয়েন চালু রাখুন</span>
                <input
                  type="checkbox"
                  checked={formData.isMandatoryChannelJoin}
                  onChange={(e) => setFormData({ ...formData, isMandatoryChannelJoin: e.target.checked })}
                  className="w-5 h-5 accent-red-600 rounded"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">অফিসিয়াল চ্যানেল লিংক ১</label>
                <input
                  type="text"
                  value={formData.channel1Url}
                  onChange={(e) => setFormData({ ...formData, channel1Url: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">পেমেন্ট প্রুফ চ্যানেল লিংক ২</label>
                <input
                  type="text"
                  value={formData.channel2Url}
                  onChange={(e) => setFormData({ ...formData, channel2Url: e.target.value })}
                  className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs shadow-lg transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>সেটিংস সেভ করুন (Save Settings)</span>
          </button>
        </form>
      )}

      {/* 2. Video Upload & Management */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          {/* Upload New Video Form */}
          <form onSubmit={handleCreateVideo} className="bg-slate-800 p-4 rounded-3xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>নতুন ভিডিও বা মুভি অ্যাড করুন</span>
            </h3>

            <div className="space-y-2 text-xs">
              <input
                type="text"
                required
                placeholder="ভিডিওর শিরোনাম (যেমন: PRINCE - Full Movie)"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                >
                  <option value="All Videos">All Videos</option>
                  <option value="বাংলা মুভি">বাংলা মুভি</option>
                  <option value="Shakib Khan">Shakib Khan</option>
                  <option value="অনলাইন ইনকাম">অনলাইন ইনকাম</option>
                  <option value="Hindi Dubbed">Hindi Dubbed</option>
                </select>

                <input
                  type="text"
                  placeholder="থাম্বনেইল ইমেজ URL (ঐচ্ছিক)"
                  value={newVideoThumbnail}
                  onChange={(e) => setNewVideoThumbnail(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <input
                type="text"
                placeholder="ভিডিও লিংক বা Monetag ডিরেক্ট লিংক"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition cursor-pointer"
            >
              + ভিডিও আপলোড করুন
            </button>
          </form>

          {/* Existing Videos List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">বর্তমান ভিডিওসমূহ ({videos.length}):</h4>
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={vid.thumbnail}
                    alt=""
                    className="w-12 h-9 rounded-lg object-cover bg-slate-900"
                  />
                  <div>
                    <h5 className="font-bold text-white line-clamp-1">{vid.title}</h5>
                    <span className="text-[10px] text-slate-400">{vid.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteVideo(vid.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition cursor-pointer"
                  title="Delete Video"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Task / Job Management */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <form onSubmit={handleCreateJob} className="bg-slate-800 p-4 rounded-3xl border border-slate-700 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>নতুন টাস্ক বা জব যোগ করুন</span>
            </h3>

            <div className="space-y-2 text-xs">
              <input
                type="text"
                required
                placeholder="কাজের নাম (যেমন: টেলিগ্রামে সাইন আপ)"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.05"
                  placeholder="রিওয়ার্ড USD (যেমন: 0.50)"
                  value={newJobReward}
                  onChange={(e) => setNewJobReward(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />

                <select
                  value={newJobType}
                  onChange={(e) => setNewJobType(e.target.value as any)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
                >
                  <option value="special">Special Job</option>
                  <option value="visit">Visit Job</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="কাজের টার্গেট লিংক (Monetag Direct Link)"
                value={newJobUrl}
                onChange={(e) => setNewJobUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
              />

              <textarea
                rows={2}
                placeholder="কাজের বিস্তারিত বিবরণ"
                value={newJobDescription}
                onChange={(e) => setNewJobDescription(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition cursor-pointer"
            >
              + নতুন টাস্ক তৈরি করুন
            </button>
          </form>

          {/* Existing Jobs List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">বর্তমান টাস্কসমূহ ({jobs.length}):</h4>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-white">{job.title}</h5>
                  <span className="text-emerald-400 font-mono font-bold">+${job.rewardUSD.toFixed(2)}</span>
                  <span className="text-slate-400 text-[10px] ml-2">({job.type})</span>
                </div>

                <button
                  onClick={() => onDeleteJob(job.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition cursor-pointer"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Withdrawals Approval */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700">
            <h3 className="text-sm font-black text-white mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>ইউজার উত্তোলন রিকোয়েস্টসমূহ ({payouts.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              ইউজারের bKash/Nagad পেমেন্ট পাঠিয়ে এখান থেকে অনুমোদন (Approve) করুন
            </p>

            <div className="space-y-2">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-900 p-3 rounded-2xl border border-slate-700 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{p.userName}</span>
                      <span className="font-mono text-emerald-400 font-black">+${p.amountUSD.toFixed(2)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Method: <strong className="text-amber-300">{p.method}</strong> · {p.accountNumber || '01XXXXXXXX'}
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold inline-block mt-1 ${
                        p.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : p.status === 'Rejected'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {p.status === 'Processing' || p.status === 'Pending' ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdatePayoutStatus(p.id, 'Completed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => onUpdatePayoutStatus(p.id, 'Rejected')}
                        className="px-2 py-1 rounded-lg bg-red-600/50 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-bold">{p.status}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. APK / PWA Native Installation */}
      {activeTab === 'apk' && (
        <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-black text-white">
                এডমিন ও ইউজার অ্যান্ড্রয়েড APK / PWA ইন্সটলার
              </h3>
              <p className="text-[10px] text-slate-400">
                যেকোনো অ্যান্ড্রয়েড ফোনে ইনস্টল করে রিয়েল অ্যাপ হিসেবে ব্যবহার করুন
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/50 border border-emerald-500/30 p-4 rounded-2xl space-y-2 text-xs text-emerald-200">
            <p className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>PWA Web App Manifest এবং Service Worker সক্রিয় আছে!</span>
            </p>
            <p className="text-slate-300 leading-relaxed">
              এই ওয়েব অ্যাপ্লিকেশনটি Google Chrome / Samsung Internet ব্রাউজারের <strong>"Install App"</strong> বা <strong>"Add to Home screen"</strong> ক্লিক করে সরাসরি অ্যান্ড্রয়েড হোমস্ক্রিনে নেটিভ APK আকারে ইনস্টল করা যাবে।
            </p>
          </div>

          {apkNotice && (
            <div className="bg-amber-950/80 border border-amber-500/50 p-3 rounded-xl text-amber-200 text-xs font-semibold whitespace-pre-line">
              {apkNotice}
            </div>
          )}

          <div className="space-y-2.5">
            <button
              onClick={() => {
                if ('serviceWorker' in navigator && (window as any).deferredPrompt) {
                  (window as any).deferredPrompt.prompt();
                } else {
                  setApkNotice(
                    '📱 Android এ ইনস্টল করতে:\n১. Chrome ব্রাউজারের উপরে ৩-ডট (⋮) মেন্যুতে চাপুন।\n২. "Install App" বা "Add to Home screen" চাপুন।\n৩. আপনার ফোনে অফিশিয়াল অ্যাপ হিসেবে ইনস্টল হয়ে যাবে!'
                  );
                }
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ইন্সটল অ্যাপ / ডাউনলোড APK প্যাকেজ</span>
            </button>

            <button
              onClick={() => {
                const configData = {
                  appName: 'Smart Earning Pro',
                  botUrl: `https://t.me/${settings.botUsername}`,
                  monetagZoneId: settings.monetagZoneId,
                  monetagDirectLink: settings.monetagDirectLink,
                  exportedAt: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'smart_earning_admin_config.json';
                a.click();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ব্যাকআপ কনফিগারেশন ফাইল ডাউনলোড</span>
            </button>
          </div>

          {/* Override User Balance for Testing */}
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300">
                ইউজার ব্যালেন্স সরাসরি পরিবর্তন (Balance Override):
              </span>
              {balanceSavedNotice && (
                <span className="text-[10px] font-bold text-emerald-400">ব্যালেন্স আপডেট হয়েছে!</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                step="1"
                value={manualBalance}
                onChange={(e) => setManualBalance(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  onUpdateUserBalance(parseFloat(manualBalance) || 0);
                  setBalanceSavedNotice(true);
                  setTimeout(() => setBalanceSavedNotice(false), 2500);
                }}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
              >
                Set Balance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
