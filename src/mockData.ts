import {
  AdminSettings,
  JobItem,
  LeaderboardUser,
  PayoutRecord,
  ReferralMilestone,
  TransactionHistoryItem,
  UserProfile,
  VideoItem,
} from './types';

export const CURRENCY_RATES = {
  USD: 1,
  BDT: 122,
  INR: 87,
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  BDT: '৳',
  INR: '₹',
};

export const defaultAdminSettings: AdminSettings = {
  monetagZoneId: '11887274',
  monetagDirectLink: 'https://omg10.com/4/11887609',
  botUsername: 'smartearningprro_bot',
  channel1Url: 'https://t.me/payment_bot_proof',
  channel1Name: 'পেমেন্ট প্রুফ চ্যানেল',
  channel2Url: 'https://t.me/shurovedailyincome',
  channel2Name: 'Shurove Daily Income চ্যানেল',
  supportUrl: 'https://t.me/payment_bot_proof',
  minWithdrawUSD: 10.0,
  perAdRewardUSD: 0.1,
  referralRewardUSD: 1.0,
  isMandatoryChannelJoin: true,
};

export const initialUserProfile: UserProfile = {
  id: 'usr_shurove_default',
  name: 'Shurove',
  avatar: '😎',
  balanceUSD: 0.05,
  pendingBonusUSD: 0.0,
  joinedRefs: 0,
  activeRefs: 0,
  inactiveRefs: 0,
  todayRefs: 0,
  adsWatchedToday: 0,
  maxDailyAds: 300,
  tasksCompleted: 0,
  freeVideosAvailable: 5,
  userRank: 11,
  selectedCategory: 'Monetag Video Ads',
  currency: 'USD',
  language: 'বাংলা',
};

// 10 Full Levels of Referral Milestones
export const initialReferralMilestones: ReferralMilestone[] = [
  { level: 1, requiredRefs: 1, rewardUSD: 0.5, freeVideos: 2, title: 'Invite 1 Friend', badge: 'Novice', color: 'from-purple-500 to-indigo-600' },
  { level: 2, requiredRefs: 3, rewardUSD: 0.8, freeVideos: 5, title: 'Invite 3 Friends', badge: 'Bronze', color: 'from-blue-500 to-cyan-600' },
  { level: 3, requiredRefs: 5, rewardUSD: 1.0, freeVideos: 10, title: 'Invite 5 Friends', badge: 'Silver', color: 'from-pink-500 to-rose-600' },
  { level: 4, requiredRefs: 8, rewardUSD: 1.5, freeVideos: 15, title: 'Invite 8 Friends', badge: 'Gold', color: 'from-amber-500 to-orange-600' },
  { level: 5, requiredRefs: 10, rewardUSD: 2.0, freeVideos: 25, title: 'Invite 10 Friends', badge: 'Platinum', color: 'from-emerald-500 to-teal-600' },
  { level: 6, requiredRefs: 15, rewardUSD: 3.5, freeVideos: 40, title: 'Invite 15 Friends', badge: 'Sapphire', color: 'from-blue-600 to-indigo-700' },
  { level: 7, requiredRefs: 20, rewardUSD: 5.0, freeVideos: 60, title: 'Invite 20 Friends', badge: 'Ruby', color: 'from-red-500 to-pink-600' },
  { level: 8, requiredRefs: 30, rewardUSD: 8.0, freeVideos: 100, title: 'Invite 30 Friends', badge: 'Diamond', color: 'from-cyan-500 to-blue-700' },
  { level: 9, requiredRefs: 50, rewardUSD: 15.0, freeVideos: 200, title: 'Invite 50 Friends', badge: 'Master', color: 'from-violet-600 to-purple-800' },
  { level: 10, requiredRefs: 100, rewardUSD: 35.0, freeVideos: 500, title: 'Invite 100 Friends', badge: '👑 King VIP', color: 'from-amber-400 to-yellow-600' },
];

/**
 * Full 20 Tasks with exact Seconds timers & direct Monetag links
 * Matching user requirement: 1 to 20 tasks, exact seconds, back protection
 */
export const initialJobs: JobItem[] = [
  {
    id: 'task-1',
    title: 'টাস্ক ১: মনিট্যাগ এক্সপ্রেস অ্যাড ক্লিক ⚡',
    rewardUSD: 0.15,
    timeSeconds: 15,
    type: 'visit',
    isHot: true,
    badgeText: '15s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসর লিংকে গিয়ে ১৫ সেকেন্ড থাকুন।',
      '১৫ সেকেন্ডের পূর্বে অ্যাপে ফেরত আসলে কোনো রিওয়ার্ড যোগ হবে না।',
      '১৫ সেকেন্ড পর ফিরে আসলে অটোমেটিক ভিডিও অ্যাড চালু হবে ও ব্যালেন্স যোগ হবে।'
    ],
    proofRequirements: ['পূর্ণ ১৫ সেকেন্ড অবস্থান করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-2',
    title: 'টাস্ক ২: হাই eCPM বিজ্ঞাপন ব্রাউজ 🎁',
    rewardUSD: 0.20,
    timeSeconds: 20,
    type: 'visit',
    isHot: true,
    badgeText: '20s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসর সাইটটি ওপেন করে ২০ সেকেন্ড স্ক্রল করুন।',
      '২০ সেকেন্ড পূর্ণ হওয়ার আগে ব্যাক আসলে "Returned Too Early" নোটিশ পাবেন।'
    ],
    proofRequirements: ['পূর্ণ ২০ সেকেন্ড ব্রাউজ করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-3',
    title: 'টাস্ক ৩: Shurove Daily Income চ্যানেল ভিজিট 📢',
    rewardUSD: 0.25,
    timeSeconds: 25,
    type: 'visit',
    isHot: false,
    badgeText: '25s',
    buttonText: 'Start ▶',
    url: 'https://t.me/shurovedailyincome',
    description: [
      'Shurove Daily Income চ্যানেলে যান এবং ২৫ সেকেন্ড পোস্টগুলো পড়ুন।',
      'সময় শেষ হওয়ার পর ফিরে এসে ভিডিও অ্যাডটি উপভোগ করুন।'
    ],
    proofRequirements: ['২৫ সেকেন্ড ভিজিট নিশ্চিত করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-4',
    title: 'টাস্ক ৪: পেমেন্ট প্রুফ চ্যানেল ভিজিট ও রিঅ্যাক্ট 💸',
    rewardUSD: 0.30,
    timeSeconds: 30,
    type: 'visit',
    isHot: true,
    badgeText: '30s',
    buttonText: 'Start ▶',
    url: 'https://t.me/payment_bot_proof',
    description: [
      'পেমেন্ট প্রুফ চ্যানেলে ৩০ সেকেন্ড থাকুন এবং পেমেন্ট প্রুফগুলো দেখুন।',
      '৩০ সেকেন্ডের পূর্বে ব্যাক আসলে টাস্ক বাতিল হবে।'
    ],
    proofRequirements: ['পূর্ণ ৩০ সেকেন্ড চ্যানেলে অবস্থান।'],
    demoPictures: [],
  },
  {
    id: 'task-5',
    title: 'টাস্ক ৫: মনিট্যাগ ডিরেক্ট স্পনসর সাইট 🌐',
    rewardUSD: 0.35,
    timeSeconds: 35,
    type: 'visit',
    isHot: false,
    badgeText: '35s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসর পেজটি ওপেন করে ৩৫ সেকেন্ড স্ক্রল ও ব্রাউজ করুন।',
      'ফিরে আসলে স্বয়ংক্রিয়ভাবে ভিডিও চালু হয়ে ব্যালেন্স যুক্ত হবে।'
    ],
    proofRequirements: ['৩৫ সেকেন্ড ব্রাউজিং সম্পন্ন করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-6',
    title: 'টাস্ক ৬: অনলাইন আর্নিং ওয়েবসাইট ভিজিট 💻',
    rewardUSD: 0.40,
    timeSeconds: 40,
    type: 'visit',
    isHot: true,
    badgeText: '40s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ওয়েবসাইটে যান এবং ৪০ সেকেন্ড আর্টিকেলগুলো মনোযোগ দিয়ে পড়ুন।',
      'টাইম শেষ হওয়ার পর অ্যাপে ফিরুন।'
    ],
    proofRequirements: ['পূর্ণ ৪০ সেকেন্ড সাইটে কাটান।'],
    demoPictures: [],
  },
  {
    id: 'task-7',
    title: 'টাস্ক ৭: মনিট্যাগ পপআন্ডার অ্যাড ভিউ 🎯',
    rewardUSD: 0.45,
    timeSeconds: 45,
    type: 'visit',
    isHot: false,
    badgeText: '45s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসর ল্যান্ডিং পেজে ৪৫ সেকেন্ড থাকুন।',
      '৪৫ সেকেন্ডের আগে ফিরলে রিওয়ার্ড পাবেন না।'
    ],
    proofRequirements: ['৪৫ সেকেন্ড ভিজিট।'],
    demoPictures: [],
  },
  {
    id: 'task-8',
    title: 'টাস্ক ৮: স্পনসরড ভিডিও প্রিভিউ 🎬',
    rewardUSD: 0.50,
    timeSeconds: 50,
    type: 'visit',
    isHot: true,
    badgeText: '50s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসরড ভিডিও স্ট্রিমে ৫০ সেকেন্ড থাকুন।',
      'ব্যাক আসলে ইনস্ট্যান্ট ভিডিও অ্যাড থেকে ব্যালেন্স নিন।'
    ],
    proofRequirements: ['৫০ সেকেন্ড স্ট্রিমিং ভিজিট।'],
    demoPictures: [],
  },
  {
    id: 'task-9',
    title: 'টাস্ক ৯: প্রিমিয়াম অফার পেজ ব্রাউজ 🌟',
    rewardUSD: 0.55,
    timeSeconds: 60,
    type: 'visit',
    isHot: true,
    badgeText: '60s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'অফার পেজটিতে পূর্ণ ৬০ সেকেন্ড অবস্থান করুন।',
      'পূর্বে ফিরলে রিওয়ার্ড বাতিল হবে।'
    ],
    proofRequirements: ['পূর্ণ ৬০ সেকেন্ড অবস্থান।'],
    demoPictures: [],
  },
  {
    id: 'task-10',
    title: 'টাস্ক ১০: ক্রিপ্টোকারেন্সি ট্রেডিং গাইড 🪙',
    rewardUSD: 0.65,
    timeSeconds: 75,
    type: 'visit',
    isHot: false,
    badgeText: '75s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ট্রেডিং গাইড আর্টিকেলটি ৭৫ সেকেন্ড স্ক্রল করে পড়ুন।',
      'সময় শেষ হলে অ্যাপে ফিরে এসে ভিডিও বোনাস গ্রহণ করুন।'
    ],
    proofRequirements: ['৭৫ সেকেন্ড ভিজিট।'],
    demoPictures: [],
  },
  {
    id: 'task-11',
    title: 'টাস্ক ১১: ইনভেস্টমেন্ট পোর্টাল প্রিভিউ 📈',
    rewardUSD: 0.75,
    timeSeconds: 90,
    type: 'visit',
    isHot: true,
    badgeText: '90s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ইনভেস্টমেন্ট প্ল্যাটফর্ম পেজে ৯০ সেকেন্ড অবস্থান করুন।',
      '৯০ সেকেন্ডের পূর্বে অ্যাপে ফেরত আসলে ইনকাম হবে না।'
    ],
    proofRequirements: ['৯০ সেকেন্ড ব্রাউজিং সম্পন্ন করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-12',
    title: 'টাস্ক ১২: ই-কমার্স ডিসকাউন্ট ডিলস 🛍️',
    rewardUSD: 0.85,
    timeSeconds: 100,
    type: 'visit',
    isHot: false,
    badgeText: '100s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ডিসকাউন্ট শপিং সাইটে ১০০ সেকেন্ড বিভিন্ন ক্যাটাগরি ব্রাউজ করুন।',
      'সময় পূর্ণ হলে ফিরে এসে অ্যাড দেখুন ও ক্যাশ ইন করুন।'
    ],
    proofRequirements: ['১০০ সেকেন্ড সাইট ভিজিট।'],
    demoPictures: [],
  },
  {
    id: 'task-13',
    title: 'টাস্ক ১৩: অনলাইন গেমিং পোর্টাল টেস্টিং 🎮',
    rewardUSD: 0.95,
    timeSeconds: 120,
    type: 'visit',
    isHot: true,
    badgeText: '120s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'গেমিং সাইটে ১২০ সেকেন্ড কাটান ও ডেমো গেমগুলো চেক করুন।',
      'আগে ফিরলে কোনো ব্যালেন্স পাবেন না।'
    ],
    proofRequirements: ['১২০ সেকেন্ড অবস্থান।'],
    demoPictures: [],
  },
  {
    id: 'task-14',
    title: 'টাস্ক ১৪: সফটওয়্যার ডাউনলোড ল্যান্ডিং 📲',
    rewardUSD: 1.05,
    timeSeconds: 140,
    type: 'visit',
    isHot: false,
    badgeText: '140s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'সফটওয়্যার ল্যান্ডিং পেজে ১৪০ সেকেন্ড অবস্থান করুন।',
      'সময় পূর্ণ করে ফিরে এসে রিওয়ার্ড ভিডিও আনলক করুন।'
    ],
    proofRequirements: ['১৪০ সেকেন্ড স্ক্রলিং।'],
    demoPictures: [],
  },
  {
    id: 'task-15',
    title: 'টাস্ক ১৫: ভিআইপি স্পনসর অফার 🏆',
    rewardUSD: 1.20,
    timeSeconds: 150,
    type: 'visit',
    isHot: true,
    badgeText: '150s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ভিআইপি স্পনসর পেজে ১৫০ সেকেন্ড থাকুন।',
      '১৫০ সেকেন্ডের পূর্বে ব্যাক আসলে "Returned Too Early" নোটিশ আসবে।'
    ],
    proofRequirements: ['১৫০ সেকেন্ড অবস্থান করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-16',
    title: 'টাস্ক ১৬: অ্যান্ড্রয়েড ইউটিলিটি টুলস 🔧',
    rewardUSD: 1.35,
    timeSeconds: 180,
    type: 'visit',
    isHot: false,
    badgeText: '180s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'টুলস পেজটিতে ১৮০ সেকেন্ড মনোযোগ সহকারে সময় দিন।',
      'সময় শেষ হলে অ্যাপে ফিরুন এবং ভিডিও অ্যাড সম্পূর্ণ করে ব্যালেন্স নিন।'
    ],
    proofRequirements: ['১৮০ সেকেন্ড ভিজিট সম্পন্ন করুন।'],
    demoPictures: [],
  },
  {
    id: 'task-17',
    title: 'টাস্ক ১৭: ফিন্যান্সিয়াল নিউজ ও অ্যানালাইসিস 📰',
    rewardUSD: 1.50,
    timeSeconds: 200,
    type: 'visit',
    isHot: true,
    badgeText: '200s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'ফিন্যান্স পেজে ২০০ সেকেন্ড অবস্থান করে আর্টিকেলগুলো ব্রাউজ করুন।',
      '২০০ সেকেন্ডের আগে ব্যাক আসলে ইনকাম পাবেন না।'
    ],
    proofRequirements: ['২০০ সেকেন্ড অবস্থান।'],
    demoPictures: [],
  },
  {
    id: 'task-18',
    title: 'টাস্ক ১৮: টেলিগ্রাম অফিসিয়াল বট স্টার্ট 🤖',
    rewardUSD: 1.70,
    timeSeconds: 220,
    type: 'visit',
    isHot: true,
    badgeText: '220s',
    buttonText: 'Start ▶',
    url: 'https://t.me/smartearningprro_bot',
    description: [
      'অফিসিয়াল বটে যান, /start দিন এবং মেনুগুলো ২২০ সেকেন্ড পর্যবেক্ষণ করুন।',
      '২২০ সেকেন্ড পর অ্যাপে ফিরলে ভিডিও অ্যাড চালু হবে।'
    ],
    proofRequirements: ['২২০ সেকেন্ড বটের সাথে ইন্টারঅ্যাক্ট।'],
    demoPictures: [],
  },
  {
    id: 'task-19',
    title: 'টাস্ক ১৯: মেগা স্পনসর ক্যাশ ক্যাম্পেইন 💎',
    rewardUSD: 2.00,
    timeSeconds: 240,
    type: 'visit',
    isHot: true,
    badgeText: '240s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'মেগা স্পনসর লিংকে গিয়ে পুরো ২৪০ সেকেন্ড অবস্থান করুন।',
      '২৪০ সেকেন্ড পূর্ণ হওয়ার পর ফিরে আসলে ভিডিও প্লে হবে এবং $২.০০ ব্যালেন্স যোগ হবে।'
    ],
    proofRequirements: ['২৪০ সেকেন্ড ভিজিট।'],
    demoPictures: [],
  },
  {
    id: 'task-20',
    title: 'টাস্ক ২০: আল্টিমেট জ্যাকপট টাস্ক 👑',
    rewardUSD: 2.50,
    timeSeconds: 300,
    type: 'visit',
    isHot: true,
    badgeText: '300s',
    buttonText: 'Start ▶',
    url: 'https://omg10.com/4/11887609',
    description: [
      'স্পনসর প্ল্যাটফর্মে পুরো ৩০০ সেকেন্ড ব্রাউজ করুন।',
      '৩০০ সেকেন্ড পার হওয়ার পর অ্যাপে ফেরত আসলে বোনাস ভিডিও চালু হয়ে ইনস্ট্যান্ট $২.৫০ পাবেন।'
    ],
    proofRequirements: ['৩০০ সেকেন্ড সম্পূর্ণ অবস্থান।'],
    demoPictures: [],
  },
];

/**
 * Replaced Video section: Monetag Sponsored Video Streams & Ads
 * (User requested: "এই স্ক্রিনশটে যে ভিডিও আমার না ঠিক আছে এই আরটি তুমি ডিলিট করে দিবা... এর পরিবর্তে আমাদের মনিটরের ভিডিও সেখানে এড বসবে")
 */
export const initialVideos: VideoItem[] = [
  {
    id: 'vid-m1',
    title: 'Monetag Rewarded Stream #1 - High eCPM 💰',
    category: 'Monetag Video Ads',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    views: '84.2K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m2',
    title: 'Monetag Instant Video Ad #2 - Fast Cash ⚡',
    category: 'Monetag Video Ads',
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80',
    views: '62.7K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m3',
    title: 'Adsterra & Monetag Live Proof Video 🎥',
    category: 'অনলাইন ইনকাম',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    views: '93.5K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m4',
    title: 'Monetag Premium Interstitial Stream #4 🌟',
    category: 'VIP Ads',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80',
    views: '48.1K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m5',
    title: 'পেইড স্পনসর ভিডিও দেখে প্রতি মিনিটে ইনকাম 💵',
    category: 'অনলাইন ইনকাম',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    views: '71.0K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m6',
    title: 'Monetag Auto Video Player - 100% Monetized 🎬',
    category: 'Monetag Video Ads',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    views: '55.3K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m7',
    title: 'হাই রেভিনিউ স্পনসর ক্লিপ - আনলিমিটেড ভিউ 🚀',
    category: 'VIP Ads',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    views: '38.9K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
  {
    id: 'vid-m8',
    title: 'Super Cash Reward Video Stream #8 💎',
    category: 'Monetag Video Ads',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    views: '99.4K',
    demoAvailable: true,
    adsRequired: 1,
    adsWatched: 0,
    videoUrl: 'https://omg10.com/4/11887609',
  },
];

/**
 * 1 to 20 Rankings across Daily, Weekly, Monthly, Yearly
 * Top Earners, Top Referrals, Top Unlocks
 */
export const generate20Rankings = (
  type: 'earners' | 'refs' | 'unlocks',
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
): LeaderboardUser[] => {
  const baseNames = [
    'Mohiuddin', 'Noman', 'Rifat', 'Sunjinho', 'MH', 'Sherey', 'Shahinur', 'Kamrul',
    'Arif Hossain', 'Tariqul', 'Shurove (You)', 'Fahim Boss', 'Mehedi Hasan', 'Jubayer',
    'Sakib Al Hasan', 'Tanvir Pro', 'Sabbir Ahmed', 'Sumon Mia', 'Habibur Rahman', 'Al-Amin'
  ];

  const avatars = ['👨‍💼', '🦁', '⚡', '🥷', 'MA', '⭐', '🚀', '🎯', '👑', '🔥', '😎', '💎', '🦊', '🦅', '🏆', '🎮', '🌟', '🛡️', '⚡', '🦾'];

  const multiplier = period === 'Daily' ? 1 : period === 'Weekly' ? 4 : period === 'Monthly' ? 15 : 80;

  return baseNames.map((name, i) => {
    const rank = i + 1;
    const isCurrentUser = name.includes('(You)');
    let value = '';

    if (type === 'earners') {
      const amount = Math.max(0.2, (22 - rank) * 0.45 * multiplier + (rank === 1 ? 2.5 : 0));
      value = `$${amount.toFixed(2)}`;
    } else if (type === 'refs') {
      const count = Math.max(1, Math.round((22 - rank) * 1.8 * (multiplier * 0.4) + (rank === 1 ? 5 : 0)));
      value = `${count} REFS`;
    } else {
      const unlocks = Math.max(1, Math.round((22 - rank) * 2.2 * (multiplier * 0.5) + (rank === 1 ? 8 : 0)));
      value = `${unlocks} UNLOCKS`;
    }

    return {
      rank,
      name,
      avatar: avatars[i % avatars.length],
      badge: rank === 1 ? '👑 King' : rank === 2 ? '🥈 2nd Place' : rank === 3 ? '🥉 3rd Place' : undefined,
      bonusText: rank === 1 ? '🎁 Top Prize' : rank === 2 ? '🥈 Silver Bonus' : rank === 3 ? '🥉 Bronze Bonus' : undefined,
      value: isCurrentUser && type === 'earners' ? '$0.05' : isCurrentUser && type === 'refs' ? '0 REFS' : value,
      isCurrentUser,
    };
  });
};

export const getLeaderboardData = (
  metric: 'top-earners' | 'top-refs' | 'top-unlocks',
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
): LeaderboardUser[] => {
  const typeMap = {
    'top-earners': 'earners',
    'top-refs': 'refs',
    'top-unlocks': 'unlocks',
  } as const;

  return generate20Rankings(typeMap[metric], period);
};

export const initialPayouts: PayoutRecord[] = [
  { id: 'pay-1', userName: 'Mohiuddin', amountUSD: 10.5, method: 'bKash', timeAgo: '2m ago', status: 'Completed', date: 'Just now' },
  { id: 'pay-2', userName: 'Tanvir Ahmed', amountUSD: 12.0, method: 'Nagad', timeAgo: '4m ago', status: 'Completed', date: 'Just now' },
  { id: 'pay-3', userName: 'Rifat Hossain', amountUSD: 15.0, method: 'Rocket', timeAgo: '8m ago', status: 'Completed', date: '10m ago' },
  { id: 'pay-4', userName: 'Noman Ali', amountUSD: 25.0, method: 'Binance Pay', timeAgo: '12m ago', status: 'Completed', date: '15m ago' },
  { id: 'pay-5', userName: 'Kawsar Mahmud', amountUSD: 10.0, method: 'bKash', timeAgo: '19m ago', status: 'Completed', date: '20m ago' },
  { id: 'pay-6', userName: 'Hasan Raza', amountUSD: 11.2, method: 'PayTM', timeAgo: '26m ago', status: 'Completed', date: '28m ago' },
  { id: 'pay-7', userName: 'Sabbir Rahman', amountUSD: 14.8, method: 'Upay', timeAgo: '35m ago', status: 'Completed', date: '40m ago' },
];

export const initialTransactions: TransactionHistoryItem[] = [
  { id: 'tx-1', title: 'Daily Welcome Bonus', type: 'reward', amountUSD: 0.05, date: 'Today, 02:30 PM', status: 'Completed', details: 'Initial joining credit' },
];
