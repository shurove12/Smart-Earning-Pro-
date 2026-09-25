import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Settings, 
  Users, 
  Wallet, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Download, 
  LogOut, 
  ExternalLink, 
  DollarSign, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import { adminDb } from './adminFirebaseConfig';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { AdminSettings, PayoutRecord, UserProfile } from '../types';
import { defaultAdminSettings } from '../mockData';

export const StandaloneAdmin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'settings' | 'withdrawals' | 'users' | 'tasks'>('settings');
  const [settings, setSettings] = useState<AdminSettings>(defaultAdminSettings);
  const [withdrawals, setWithdrawals] = useState<PayoutRecord[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Stats
  const pendingCount = withdrawals.filter((w) => w.status === 'Processing' || w.status === 'Pending').length;
  const completedTotal = withdrawals
    .filter((w) => w.status === 'Completed')
    .reduce((acc, curr) => acc + (curr.amountUSD || 0), 0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'shurove2025' || pin === 'admin123' || pin === 'shurove') {
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।');
    }
  };

  // Sync settings and records with Firebase
  useEffect(() => {
    if (!isAuthenticated) return;

    // Listen settings
    const settingsDoc = doc(adminDb, 'config', 'app_settings');
    const unsubSettings = onSnapshot(settingsDoc, (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as AdminSettings);
      }
    });

    // Listen withdrawals
    const withCol = collection(adminDb, 'withdrawals');
    const unsubWith = onSnapshot(withCol, (snap) => {
      const list: PayoutRecord[] = [];
      snap.forEach((d) => list.push(d.data() as PayoutRecord));
      setWithdrawals(list);
    });

    // Listen users
    const usersCol = collection(adminDb, 'users');
    const unsubUsers = onSnapshot(usersCol, (snap) => {
      const list: UserProfile[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as UserProfile) }));
      setUsers(list);
    });

    return () => {
      unsubSettings();
      unsubWith();
      unsubUsers();
    };
  }, [isAuthenticated]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(adminDb, 'config', 'app_settings');
      await setDoc(docRef, settings, { merge: true });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert('Error saving: ' + err.message);
    }
  };

  const handleApproveWithdrawal = async (id: string) => {
    if (!confirm('পেমেন্টটি Approve করতে চান?')) return;
    try {
      const docRef = doc(adminDb, 'withdrawals', id);
      await updateDoc(docRef, { status: 'Completed' });
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleRejectWithdrawal = async (id: string) => {
    if (!confirm('উইথড্রয়ালটি Reject করতে চান?')) return;
    try {
      const docRef = doc(adminDb, 'withdrawals', id);
      await updateDoc(docRef, { status: 'Rejected' });
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleUpdateBalance = async (userId: string, newBalance: number) => {
    try {
      const docRef = doc(adminDb, 'users', userId);
      await updateDoc(docRef, { balanceUSD: newBalance });
      alert(`User balance set to $${newBalance.toFixed(2)}`);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleDownloadStandaloneHTML = () => {
    window.open('/admin.html', '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-3xl shadow-lg mb-4">
            👑
          </div>
          <h2 className="text-xl font-black text-white">Smart Earning Admin Access</h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">স্ট্যান্ডঅ্যালোন এডমিন প্যানেলে প্রবেশ করুন</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="পাসওয়ার্ড লিখুন (shurove2025)"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-bold tracking-widest text-sm focus:outline-none focus:border-amber-400"
              autoFocus
            />
            {errorMsg && <p className="text-xs font-bold text-rose-400">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-lg cursor-pointer"
            >
              লগইন করুন 🚀
            </button>
          </form>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            Firebase: <span className="text-amber-400 font-mono">smart-earning-63e85</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-xl shadow">
            👑
          </div>
          <div>
            <h1 className="text-sm font-black text-white flex items-center gap-2">
              Smart Earning Standalone Admin
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Firebase Live
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Project: smart-earning-63e85</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadStandaloneHTML}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Standalone File</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Real-time stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 font-semibold block">মোট ইউজার</span>
            <span className="text-2xl font-black text-white font-mono">{users.length || 1}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 font-semibold block">পেন্ডিং উইথড্রয়াল</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{pendingCount}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 font-semibold block">পরিশোধিত পেমেন্ট</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">${completedTotal.toFixed(2)}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs text-slate-400 font-semibold block">সক্রিয় টাস্ক</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">20</span>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'settings' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 text-slate-400'
            }`}
          >
            ⚙️ মনিট্যাগ ও চ্যানেল সেটিংস
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'withdrawals' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 text-slate-400'
            }`}
          >
            💸 উইথড্রয়াল ম্যানেজমেন্ট ({pendingCount})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === 'users' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-900 text-slate-400'
            }`}
          >
            👥 ইউজার ও ব্যালেন্স কন্ট্রোল
          </button>
        </div>

        {/* Tab 1: Settings Form */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-white">মনিট্যাগ বিজ্ঞাপন ও চ্যানেল লিংক</h3>
                <p className="text-xs text-slate-400">ফায়ারবেসে সংরক্ষণ হয়ে ইউজারের অ্যাপে তৎক্ষণাৎ কার্যকর হবে।</p>
              </div>
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/40">
                  ✓ ফায়ারবেসে সেভ হয়েছে!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-amber-300 block mb-1">Monetag Direct Link:</label>
                  <input
                    type="url"
                    value={settings.monetagDirectLink}
                    onChange={(e) => setSettings({ ...settings, monetagDirectLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-amber-300 block mb-1">Monetag Zone ID:</label>
                  <input
                    type="text"
                    value={settings.monetagZoneId}
                    onChange={(e) => setSettings({ ...settings, monetagZoneId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-purple-300 block mb-1">চ্যানেল ১ (পেমেন্ট প্রুফ):</label>
                  <input
                    type="url"
                    value={settings.channel1Url}
                    onChange={(e) => setSettings({ ...settings, channel1Url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-purple-300 block mb-1">চ্যানেল ২ (Shurove Daily Income):</label>
                  <input
                    type="url"
                    value={settings.channel2Url}
                    onChange={(e) => setSettings({ ...settings, channel2Url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-300 block mb-1">নূন্যতম উইথড্রয়াল (USD):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={settings.minWithdrawUSD}
                    onChange={(e) => setSettings({ ...settings, minWithdrawUSD: parseFloat(e.target.value) || 10 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-300 block mb-1">প্রতি অ্যাড রিওয়ার্ড (USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={settings.perAdRewardUSD}
                    onChange={(e) => setSettings({ ...settings, perAdRewardUSD: parseFloat(e.target.value) || 0.1 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow cursor-pointer"
              >
                💾 ফায়ারবেসে সেভ করুন
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Withdrawals */}
        {activeTab === 'withdrawals' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="text-sm font-black text-white mb-3">উইথড্রয়াল রিকোয়েস্ট তালিকা</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">ইউজার</th>
                    <th className="p-3">পরিমাণ</th>
                    <th className="p-3">মেথড / নম্বর</th>
                    <th className="p-3">স্ট্যাটাস</th>
                    <th className="p-3 text-right">একশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {withdrawals.map((w) => (
                    <tr key={w.id}>
                      <td className="p-3 font-bold text-white">{w.userName}</td>
                      <td className="p-3 font-mono font-black text-emerald-400">${w.amountUSD.toFixed(2)}</td>
                      <td className="p-3">{w.method} ({w.accountNumber || '-'})</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          w.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          w.status === 'Rejected' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {(w.status === 'Processing' || w.status === 'Pending') && (
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleApproveWithdrawal(w.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectWithdrawal(w.id)}
                              className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px]"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === 'users' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="text-sm font-black text-white mb-3">ইউজার তালিকা ও ব্যালেন্স কন্ট্রোল</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">ইউজার</th>
                    <th className="p-3">ব্যালেন্স</th>
                    <th className="p-3">রেফারেল</th>
                    <th className="p-3">টাস্ক</th>
                    <th className="p-3 text-right">ব্যালেন্স পরিবর্তন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map((u) => (
                    <tr key={u.id || u.name}>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <span>{u.avatar || '😎'}</span>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3 font-mono font-black text-amber-400">${u.balanceUSD.toFixed(2)}</td>
                      <td className="p-3">{u.joinedRefs || 0} Refs</td>
                      <td className="p-3">{u.tasksCompleted || 0} Tasks</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            const val = prompt(`Enter new balance for ${u.name}:`, u.balanceUSD.toString());
                            if (val !== null) {
                              const num = parseFloat(val);
                              if (!isNaN(num) && u.id) {
                                handleUpdateBalance(u.id, num);
                              }
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-indigo-600 text-white font-bold text-[10px]"
                        >
                          Change Balance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
