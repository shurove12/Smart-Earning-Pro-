export type ScreenType = 'home' | 'refer' | 'earn' | 'rank' | 'profile';

export type CurrencyType = 'USD' | 'BDT' | 'INR';

export type LanguageType = 'English' | 'বাংলা' | 'हिंदी' | 'اردو';

export interface UserProfile {
  id?: string;
  name: string;
  avatar: string;
  balanceUSD: number;
  pendingBonusUSD: number;
  joinedRefs: number;
  activeRefs: number;
  inactiveRefs: number;
  todayRefs: number;
  adsWatchedToday: number;
  maxDailyAds: number;
  tasksCompleted: number;
  freeVideosAvailable: number;
  userRank: number;
  selectedCategory: string;
  currency: CurrencyType;
  language: LanguageType;
}

export interface JobItem {
  id: string;
  title: string;
  rewardUSD: number;
  timeSeconds?: number;
  isHot?: boolean;
  type: 'visit' | 'special';
  badgeText?: string;
  buttonText: string;
  url: string;
  description: string[];
  proofRequirements: string[];
  demoPictures: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  views: string;
  demoAvailable: boolean;
  adsRequired: number;
  adsWatched: number;
  videoUrl?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  badge?: string;
  bonusText?: string;
  value: string;
  isCurrentUser?: boolean;
}

export interface PayoutRecord {
  id: string;
  userName: string;
  amountUSD: number;
  method: string;
  timeAgo: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Rejected';
  accountNumber?: string;
  date: string;
}

export interface TransactionHistoryItem {
  id: string;
  title: string;
  type: 'reward' | 'withdraw' | 'referral' | 'ad';
  amountUSD: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Rejected';
  details?: string;
}

export interface ReferralMilestone {
  level: number;
  requiredRefs: number;
  rewardUSD: number;
  freeVideos: number;
  title: string;
  badge: string;
  color: string;
}

export interface AdminSettings {
  monetagZoneId: string;
  monetagDirectLink: string;
  botUsername: string;
  channel1Url: string;
  channel1Name: string;
  channel2Url: string;
  channel2Name: string;
  supportUrl: string;
  minWithdrawUSD: number;
  perAdRewardUSD: number;
  referralRewardUSD: number;
  isMandatoryChannelJoin: boolean;
}

