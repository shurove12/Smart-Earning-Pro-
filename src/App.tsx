import React, { useState, useEffect, useRef } from 'react';
import {
  AdminSettings,
  CurrencyType,
  JobItem,
  LanguageType,
  PayoutRecord,
  ScreenType,
  TransactionHistoryItem,
  UserProfile,
  VideoItem,
} from './types';
import {
  defaultAdminSettings,
  initialJobs,
  initialPayouts,
  initialTransactions,
  initialUserProfile,
  initialVideos,
} from './mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ReferScreen } from './components/ReferScreen';
import { EarnScreen } from './components/EarnScreen';
import { RankScreen } from './components/RankScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SplashScreen } from './components/SplashScreen';
import { AdminPanel } from './components/AdminPanel';

// Modals
import { WithdrawModal } from './components/modals/WithdrawModal';
import { JobDetailModal } from './components/modals/JobDetailModal';
import { VideoAdModal } from './components/modals/VideoAdModal';
import { AdSimulationModal } from './components/modals/AdSimulationModal';
import { ReturnedEarlyModal } from './components/modals/ReturnedEarlyModal';
import { SetupProfileModal } from './components/modals/SetupProfileModal';
import { CategoryModal } from './components/modals/CategoryModal';
import { TargetModal } from './components/modals/TargetModal';
import { MegaContestModal } from './components/modals/MegaContestModal';
import { WelcomeNotificationModal } from './components/modals/WelcomeNotificationModal';
import { HistoryModal } from './components/modals/HistoryModal';
import { SupportModal } from './components/modals/SupportModal';
import { ImageLightboxModal } from './components/modals/ImageLightboxModal';

// Monetag SDK helper
import { initMonetagInApp, playMonetagRewardedAd } from './utils/monetag';

// Firebase persistent synchronization
import {
  fetchFirebaseSettings,
  subscribeFirebaseSettings,
  saveFirebaseSettings,
  syncUserProfileToFirebase,
  loadUserProfileFromFirebase,
  recordWithdrawalInFirebase,
  updateWithdrawalStatusInFirebase,
  recordTransactionInFirebase,
} from './utils/firebaseService';

interface RunningTaskInfo {
  job: JobItem;
  startTime: number; // millisecond timestamp
  requiredSeconds: number;
}

export default function App() {
  // App state
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search.toLowerCase();
      return search.includes('admin=true') || search.includes('admin=shurove');
    }
    return false;
  });
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [payouts, setPayouts] = useState<PayoutRecord[]>(initialPayouts);
  const [transactions, setTransactions] = useState<TransactionHistoryItem[]>(initialTransactions);
  const [completedJobIds, setCompletedJobIds] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(42);

  // Active Running Task state (with return-back detection)
  const [runningTask, setRunningTask] = useState<RunningTaskInfo | null>(null);
  const [taskSecondsElapsed, setTaskSecondsElapsed] = useState<number>(0);
  const runningTaskRef = useRef<RunningTaskInfo | null>(null);
  runningTaskRef.current = runningTask;

  // Modals state
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showTargetModal, setShowTargetModal] = useState<boolean>(false);
  const [showMegaContestModal, setShowMegaContestModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);

  // Dynamic interactive modals
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [showAdSimulation, setShowAdSimulation] = useState<boolean>(false);
  const [activeAdReward, setActiveAdReward] = useState<number>(0.1);
  const [activeAdDuration, setActiveAdDuration] = useState<number>(15);
  const [earlyExitSeconds, setEarlyExitSeconds] = useState<number | null>(null);
  const [demoLightboxImage, setDemoLightboxImage] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initialize Monetag In-App on mount & Sync Firebase
  useEffect(() => {
    initMonetagInApp();

    // Listen to real-time live settings from Firebase (updates instantly when saved in standalone admin)
    const unsubSettings = subscribeFirebaseSettings((remoteSettings) => {
      if (remoteSettings) {
        setAdminSettings((prev) => ({ ...prev, ...remoteSettings }));
      }
    });

    // Fetch user profile from Firebase or local cache
    loadUserProfileFromFirebase().then((remoteUser) => {
      if (remoteUser) {
        setUser((prev) => ({ ...prev, ...remoteUser }));
      }
    });

    return () => {
      unsubSettings();
    };
  }, []);

  // Sync user changes to Firebase
  useEffect(() => {
    if (isLoaded) {
      syncUserProfileToFirebase(user);
    }
  }, [user.balanceUSD, user.tasksCompleted, user.joinedRefs, isLoaded]);

  // Live fluctuating online users count
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(25, Math.min(58, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Timer counter for active running task
  useEffect(() => {
    if (!runningTask) {
      setTaskSecondsElapsed(0);
      return;
    }

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - runningTask.startTime) / 1000);
      setTaskSecondsElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [runningTask]);

  // Detect when user switches back to this window from the task website
  useEffect(() => {
    const handleWindowFocusOrVisible = () => {
      const current = runningTaskRef.current;
      if (!current) return;

      const elapsed = Math.floor((Date.now() - current.startTime) / 1000);
      const remaining = current.requiredSeconds - elapsed;

      if (remaining > 0) {
        // User came back too early!
        setEarlyExitSeconds(remaining);
        showToast(`⚠️ আপনি নির্দিষ্ট সময়ের ${remaining} সেকেন্ড আগে ব্যাক এসেছেন!`);
      } else {
        // User fulfilled the full required time!
        // As requested: "এবং যখন কাছ থেকে ব্যাক আসবে তখন শুধু ভিডিওটি চলে ঠিক আছে"
        setRunningTask(null);
        showToast(`🎉 টাস্কের সময় পূর্ণ হয়েছে! স্পনসরড ভিডিও অ্যাড শুরু হচ্ছে...`);
        handleOpenWatchAd(current.job.rewardUSD, 15);
        setCompletedJobIds((prev) => [...prev, current.job.id]);
      }
    };

    window.addEventListener('focus', handleWindowFocusOrVisible);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleWindowFocusOrVisible();
      }
    });

    return () => {
      window.removeEventListener('focus', handleWindowFocusOrVisible);
    };
  }, []);

  // When splash finishes, trigger welcome notification
  const handleSplashLoaded = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setShowWelcomeModal(true);
    }, 300);
  };

  // 1. Claim Daily Milestone Rewards in Refer Screen
  const handleClaimDailyReward = (rewardUSD: number, freeVideos: number, label: string) => {
    setUser((prev) => ({
      ...prev,
      balanceUSD: prev.balanceUSD + rewardUSD,
      freeVideosAvailable: prev.freeVideosAvailable + freeVideos,
    }));

    const newTx: TransactionHistoryItem = {
      id: `tx-${Date.now()}`,
      title: label,
      type: 'reward',
      amountUSD: rewardUSD,
      date: 'Today, Just now',
      status: 'Completed',
      details: `+$${rewardUSD} & +${freeVideos} free videos unlocked`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    recordTransactionInFirebase(newTx);
    showToast(`🎉 Claimed +$${rewardUSD.toFixed(2)} & +${freeVideos} Free Videos!`);
  };

  // 2. Simulate Referral testing helper
  const handleSimulateReferral = () => {
    setUser((prev) => ({
      ...prev,
      joinedRefs: prev.joinedRefs + 1,
      todayRefs: prev.todayRefs + 1,
      activeRefs: prev.activeRefs + 1,
      pendingBonusUSD: prev.pendingBonusUSD + adminSettings.referralRewardUSD,
      userRank: Math.max(1, prev.userRank - 1),
    }));

    showToast(`👥 New referral joined! +$${adminSettings.referralRewardUSD.toFixed(2)} added to pending bonus.`);
  };

  // 3. Send to Inbox action in Refer screen
  const handleSendToInbox = () => {
    if (user.pendingBonusUSD > 0) {
      showToast(
        `📨 $${user.pendingBonusUSD.toFixed(2)} Pending Bonus summary sent to your Telegram Inbox!`
      );
    } else {
      showToast('📨 Referral invite card sent to your Telegram Inbox!');
    }
  };

  // 4. Watch Ad handler (Triggers Monetag SDK or Simulation)
  const handleOpenWatchAd = async (reward = adminSettings.perAdRewardUSD, duration = 15) => {
    setActiveAdReward(reward);
    setActiveAdDuration(duration);

    // Call real Monetag Rewarded Popup
    try {
      playMonetagRewardedAd('pop', adminSettings.monetagDirectLink);
    } catch (e) {
      console.warn('Monetag execution notice:', e);
    }

    setShowAdSimulation(true);
  };

  // When ad finishes successfully
  const handleAdCompleted = (rewardUSD: number) => {
    setShowAdSimulation(false);
    setUser((prev) => ({
      ...prev,
      balanceUSD: prev.balanceUSD + rewardUSD,
      adsWatchedToday: prev.adsWatchedToday + 1,
      tasksCompleted: prev.tasksCompleted + 1,
    }));

    const newTx: TransactionHistoryItem = {
      id: `tx-${Date.now()}`,
      title: 'Monetag Video Ad Reward',
      type: 'ad',
      amountUSD: rewardUSD,
      date: 'Today, Just now',
      status: 'Completed',
      details: 'Watched sponsored Monetag video stream',
    };

    setTransactions((prev) => [newTx, ...prev]);
    recordTransactionInFirebase(newTx);
    showToast(`💰 Monetag Ad Reward: +$${rewardUSD.toFixed(2)} USD Credited!`);
  };

  // When user attempts to close ad before timer ends
  const handleAdClosedEarly = (requiredSeconds: number) => {
    setShowAdSimulation(false);
    setEarlyExitSeconds(requiredSeconds);
  };

  // 5. Start a Task (Opens link in new tab, starts timer with back-protection)
  const handleStartTask = (job: JobItem) => {
    const requiredSec = job.timeSeconds || 15;
    const taskInfo: RunningTaskInfo = {
      job,
      startTime: Date.now(),
      requiredSeconds: requiredSec,
    };

    setRunningTask(taskInfo);

    // Open sponsor url / Monetag direct link
    const targetUrl = job.url || adminSettings.monetagDirectLink;
    window.open(targetUrl, '_blank');

    showToast(`⏳ টাস্ক শুরু হয়েছে! স্পনসর সাইটে ${requiredSec} সেকেন্ড থাকুন।`);
  };

  // Manual verify task button (when user taps "Verify & Watch Ad" in app)
  const handleVerifyRunningTaskManually = () => {
    if (!runningTask) return;

    const elapsed = Math.floor((Date.now() - runningTask.startTime) / 1000);
    const remaining = runningTask.requiredSeconds - elapsed;

    if (remaining > 0) {
      setEarlyExitSeconds(remaining);
    } else {
      setRunningTask(null);
      showToast(`🎉 টাস্ক সফলভাবে সম্পন্ন হয়েছে! ভিডিও অ্যাড চালু হচ্ছে...`);
      handleOpenWatchAd(runningTask.job.rewardUSD, 15);
      setCompletedJobIds((prev) => [...prev, runningTask.job.id]);
    }
  };

  // 6. Job Proof submission
  const handleSubmitJobProof = (jobId: string, textProof: string, _files: File[]) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    setCompletedJobIds((prev) => [...prev, jobId]);
    setUser((prev) => ({
      ...prev,
      balanceUSD: prev.balanceUSD + job.rewardUSD,
      tasksCompleted: prev.tasksCompleted + 1,
    }));

    const newTx: TransactionHistoryItem = {
      id: `tx-${Date.now()}`,
      title: `Task: ${job.title}`,
      type: 'reward',
      amountUSD: job.rewardUSD,
      date: 'Today, Just now',
      status: 'Completed',
      details: textProof || 'Job proof verified',
    };

    setTransactions((prev) => [newTx, ...prev]);
    recordTransactionInFirebase(newTx);
    showToast(`✅ Proof verified! +$${job.rewardUSD.toFixed(2)} added to balance.`);
  };

  // 7. Withdraw submission
  const handleSubmitWithdraw = (method: string, accountNumber: string, amountUSD: number) => {
    setUser((prev) => ({
      ...prev,
      balanceUSD: prev.balanceUSD - amountUSD,
    }));

    const newPayout: PayoutRecord = {
      id: `pay-${Date.now()}`,
      userName: user.name,
      amountUSD,
      method,
      timeAgo: 'Just now',
      status: 'Processing',
      accountNumber,
      date: 'Today',
    };

    setPayouts((prev) => [newPayout, ...prev]);
    recordWithdrawalInFirebase(newPayout);

    const newTx: TransactionHistoryItem = {
      id: `tx-${Date.now()}`,
      title: `Withdrawal via ${method}`,
      type: 'withdraw',
      amountUSD,
      date: 'Today, Just now',
      status: 'Pending',
      details: `Account: ${accountNumber}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    recordTransactionInFirebase(newTx);
    showToast(`💸 Withdrawal request of $${amountUSD.toFixed(2)} submitted!`);
  };

  // 8. Watch Demo in Inbox
  const handleWatchDemoInInbox = (video: VideoItem) => {
    setSelectedVideo(null);
    showToast(`🎬 Demo video for "${video.title}" has been sent to your Telegram Inbox!`);
  };

  // 9. Video card clicked
  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  // 10. Watch ad for video unlock
  const handleWatchAdForVideo = (video: VideoItem) => {
    const newCount = video.adsWatched + 1;
    setVideos((prev) =>
      prev.map((v) => (v.id === video.id ? { ...v, adsWatched: newCount } : v))
    );

    // Call Monetag Ad
    handleOpenWatchAd(0.15, 15);

    if (newCount >= video.adsRequired) {
      showToast(`🎉 "${video.title}" is now UNLOCKED! Full video stream ready!`);
    }
  };

  // Admin Actions
  const handleSaveAdminSettings = (newSettings: AdminSettings) => {
    setAdminSettings(newSettings);
    saveFirebaseSettings(newSettings);
    showToast('⚙️ Admin settings updated & synced to Firebase!');
  };

  const handleAdminAddVideo = (newVid: VideoItem) => {
    setVideos((prev) => [newVid, ...prev]);
    showToast(`🎬 Video "${newVid.title}" uploaded!`);
  };

  const handleAdminDeleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    showToast('Video deleted from catalog.');
  };

  const handleAdminAddJob = (newJob: JobItem) => {
    setJobs((prev) => [newJob, ...prev]);
    showToast(`💼 Task "${newJob.title}" added!`);
  };

  const handleAdminDeleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    showToast('Task removed.');
  };

  const handleAdminUpdatePayoutStatus = (id: string, status: 'Completed' | 'Rejected') => {
    setPayouts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    updateWithdrawalStatusInFirebase(id, status);
    showToast(`Withdrawal marked as ${status}!`);
  };

  const handleAdminUpdateUserBalance = (newBalance: number) => {
    setUser((prev) => ({ ...prev, balanceUSD: newBalance }));
    showToast(`User balance adjusted to $${newBalance.toFixed(2)}.`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex justify-center items-center p-0 sm:p-4">
      {/* If in Admin Mode, show full Admin Panel */}
      {isAdminMode ? (
        <AdminPanel
          settings={adminSettings}
          user={user}
          videos={videos}
          jobs={jobs}
          payouts={payouts}
          onSaveSettings={handleSaveAdminSettings}
          onAddVideo={handleAdminAddVideo}
          onDeleteVideo={handleAdminDeleteVideo}
          onAddJob={handleAdminAddJob}
          onDeleteJob={handleAdminDeleteJob}
          onUpdatePayoutStatus={handleAdminUpdatePayoutStatus}
          onUpdateUserBalance={handleAdminUpdateUserBalance}
          onExitAdmin={() => setIsAdminMode(false)}
        />
      ) : (
        /* Mobile App Viewport Container */
        <div className="w-full max-w-md h-screen sm:h-[860px] bg-slate-50 flex flex-col overflow-hidden relative shadow-2xl sm:rounded-[36px] sm:border-8 sm:border-slate-800">
          {/* SplashScreen */}
          {!isLoaded && <SplashScreen onLoaded={handleSplashLoaded} />}

          {/* Top Header with Admin Launcher button */}
          <Header
            user={user}
            onlineCount={onlineCount}
            onOpenSettings={() => setShowSetupModal(true)}
            onOpenProfile={() => setActiveScreen('profile')}
            onOpenNotification={() => setShowWelcomeModal(true)}
            onOpenAdmin={() => setIsAdminMode(true)}
          />

          {/* Main Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4 relative no-scrollbar">
            {activeScreen === 'home' && (
              <HomeScreen
                user={user}
                videos={videos}
                onChangeScreen={setActiveScreen}
                onOpenWithdraw={() => setShowWithdrawModal(true)}
                onOpenCategoryModal={() => setShowCategoryModal(true)}
                onSelectVideo={handleSelectVideo}
              />
            )}

            {activeScreen === 'refer' && (
              <ReferScreen
                user={user}
                settings={adminSettings}
                onClaimDailyReward={handleClaimDailyReward}
                onSimulateReferral={handleSimulateReferral}
                onSendToInbox={handleSendToInbox}
              />
            )}

            {activeScreen === 'earn' && (
              <EarnScreen
                user={user}
                jobs={jobs}
                completedJobIds={completedJobIds}
                runningTaskId={runningTask?.job.id}
                onOpenWatchAd={() => handleOpenWatchAd(adminSettings.perAdRewardUSD, 15)}
                onSelectJob={(job) => {
                  handleStartTask(job);
                }}
              />
            )}

            {activeScreen === 'rank' && (
              <RankScreen
                user={user}
                onOpenTargetModal={() => setShowTargetModal(true)}
                onOpenMegaContestModal={() => setShowMegaContestModal(true)}
              />
            )}

            {activeScreen === 'profile' && (
              <ProfileScreen
                user={user}
                settings={adminSettings}
                payouts={payouts}
                onOpenWithdraw={() => setShowWithdrawModal(true)}
                onOpenHistory={() => setShowHistoryModal(true)}
                onOpenSupport={() => setShowSupportModal(true)}
                onOpenSettings={() => setShowSetupModal(true)}
                onUpdateAvatar={(newAvatar) => setUser((u) => ({ ...u, avatar: newAvatar }))}
                onUpdateName={(newName) => setUser((u) => ({ ...u, name: newName }))}
                onSimulateReferral={handleSimulateReferral}
              />
            )}
          </main>

          {/* Active Running Task Floating Banner */}
          {runningTask && (
            <div className="absolute bottom-20 left-3 right-3 z-40 bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-amber-400/50 shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-5">
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                  ⏳
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">
                    {runningTask.job.title}
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono font-bold flex items-center gap-1.5">
                    <span>
                      {taskSecondsElapsed}s / {runningTask.requiredSeconds}s
                    </span>
                    {taskSecondsElapsed < runningTask.requiredSeconds ? (
                      <span className="text-rose-400 text-[10px]">
                        (বাকি: {runningTask.requiredSeconds - taskSecondsElapsed}s)
                      </span>
                    ) : (
                      <span className="text-emerald-400 text-[10px] font-bold">
                        (সময় পূর্ণ হয়েছে! ✓)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleVerifyRunningTaskManually}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition shadow cursor-pointer ${
                  taskSecondsElapsed >= runningTask.requiredSeconds
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white animate-bounce'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                {taskSecondsElapsed >= runningTask.requiredSeconds ? 'ভিডিও দেখুন ▶' : 'যাচাই করুন'}
              </button>
            </div>
          )}

          {/* Bottom Floating Navigation */}
          <BottomNav activeScreen={activeScreen} onChangeScreen={setActiveScreen} />

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="absolute top-24 left-4 right-4 z-50 pointer-events-none flex justify-center animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 text-center max-w-xs">
                {toastMessage}
              </div>
            </div>
          )}

          {/* Modals */}
          <WithdrawModal
            isOpen={showWithdrawModal}
            user={user}
            onClose={() => setShowWithdrawModal(false)}
            onSubmitWithdraw={handleSubmitWithdraw}
          />

          <JobDetailModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onSubmitJobProof={handleSubmitJobProof}
            onOpenDemoImage={(img) => setDemoLightboxImage(img)}
          />

          <VideoAdModal
            video={selectedVideo}
            directLink={adminSettings.monetagDirectLink}
            onClose={() => setSelectedVideo(null)}
            onWatchAd={handleWatchAdForVideo}
            onWatchDemoInInbox={handleWatchDemoInInbox}
          />

          <AdSimulationModal
            isOpen={showAdSimulation}
            rewardUSD={activeAdReward}
            durationSeconds={activeAdDuration}
            monetagDirectLink={adminSettings.monetagDirectLink}
            onCloseEarly={handleAdClosedEarly}
            onAdCompleted={handleAdCompleted}
          />

          <ReturnedEarlyModal
            isOpen={earlyExitSeconds !== null}
            requiredSeconds={earlyExitSeconds || 15}
            onClose={() => setEarlyExitSeconds(null)}
            onTryAgain={() => {
              const sec = earlyExitSeconds || 15;
              setEarlyExitSeconds(null);
              if (runningTask) {
                handleStartTask(runningTask.job);
              } else {
                handleOpenWatchAd(activeAdReward, sec);
              }
            }}
          />

          <SetupProfileModal
            isOpen={showSetupModal}
            currentLanguage={user.language}
            currentCurrency={user.currency}
            onClose={() => setShowSetupModal(false)}
            onSave={(lang: LanguageType, curr: CurrencyType) => {
              setUser((prev) => ({ ...prev, language: lang, currency: curr }));
              setShowSetupModal(false);
              showToast(`Settings updated: ${lang} · ${curr}`);
            }}
          />

          <CategoryModal
            isOpen={showCategoryModal}
            currentCategory={user.selectedCategory}
            onClose={() => setShowCategoryModal(false)}
            onSelectCategory={(cat) => {
              setUser((prev) => ({ ...prev, selectedCategory: cat }));
              showToast(`Category switched to: ${cat}`);
            }}
          />

          <TargetModal
            isOpen={showTargetModal}
            user={user}
            onClose={() => setShowTargetModal(false)}
            onContinue={() => {
              setShowTargetModal(false);
              setActiveScreen('earn');
            }}
          />

          <MegaContestModal
            isOpen={showMegaContestModal}
            onClose={() => setShowMegaContestModal(false)}
            onJoin={() => {
              setShowMegaContestModal(false);
              setActiveScreen('refer');
            }}
          />

          {/* Mandatory Welcome Channel Join Barrier */}
          <WelcomeNotificationModal
            isOpen={showWelcomeModal}
            settings={adminSettings}
            onVerifiedAndEntered={() => setShowWelcomeModal(false)}
          />

          <HistoryModal
            isOpen={showHistoryModal}
            user={user}
            transactions={transactions}
            onClose={() => setShowHistoryModal(false)}
          />

          <SupportModal isOpen={showSupportModal} onClose={() => setShowSupportModal(false)} />

          <ImageLightboxModal
            imageUrl={demoLightboxImage}
            onClose={() => setDemoLightboxImage(null)}
          />
        </div>
      )}
    </div>
  );
}
