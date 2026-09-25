import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  onSnapshot, 
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { firestoreDb } from '../firebase';
import { AdminSettings, JobItem, PayoutRecord, TransactionHistoryItem, UserProfile } from '../types';
import { defaultAdminSettings } from '../mockData';

// Firestore collection names
const SETTINGS_DOC_ID = 'app_settings';
const USERS_COLLECTION = 'users';
const WITHDRAWALS_COLLECTION = 'withdrawals';
const TRANSACTIONS_COLLECTION = 'transactions';

/**
 * 1. Synchronize Admin Settings with Firebase
 */
export async function fetchFirebaseSettings(): Promise<AdminSettings | null> {
  try {
    const docRef = doc(firestoreDb, 'config', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as AdminSettings;
    }
  } catch (error) {
    console.warn('Firebase settings read note:', error);
  }
  return null;
}

export function subscribeFirebaseSettings(callback: (settings: AdminSettings) => void) {
  try {
    const docRef = doc(firestoreDb, 'config', SETTINGS_DOC_ID);
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        callback(snap.data() as AdminSettings);
      }
    }, (error) => {
      console.warn('Firebase settings subscription notice:', error);
    });
  } catch (e) {
    console.warn('Firebase snapshot setup:', e);
    return () => {};
  }
}

export async function saveFirebaseSettings(settings: AdminSettings): Promise<boolean> {
  try {
    const docRef = doc(firestoreDb, 'config', SETTINGS_DOC_ID);
    await setDoc(docRef, settings, { merge: true });
    return true;
  } catch (error) {
    console.warn('Firebase settings write error:', error);
    return false;
  }
}

/**
 * 2. Synchronize User Profile & Balances with Firebase
 */
export async function syncUserProfileToFirebase(user: UserProfile): Promise<void> {
  try {
    const userDocId = user.id || 'default_user';
    const docRef = doc(firestoreDb, USERS_COLLECTION, userDocId);
    await setDoc(docRef, {
      ...user,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.warn('Firebase user sync notice:', error);
  }
}

export async function loadUserProfileFromFirebase(userId = 'default_user'): Promise<Partial<UserProfile> | null> {
  try {
    const docRef = doc(firestoreDb, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as Partial<UserProfile>;
    }
  } catch (error) {
    console.warn('Firebase user load notice:', error);
  }
  return null;
}

/**
 * 3. Log Withdrawals to Firebase
 */
export async function recordWithdrawalInFirebase(payout: PayoutRecord): Promise<void> {
  try {
    const docRef = doc(firestoreDb, WITHDRAWALS_COLLECTION, payout.id);
    await setDoc(docRef, {
      ...payout,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Firebase withdrawal record error:', error);
  }
}

export async function updateWithdrawalStatusInFirebase(payoutId: string, status: 'Completed' | 'Rejected'): Promise<void> {
  try {
    const docRef = doc(firestoreDb, WITHDRAWALS_COLLECTION, payoutId);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.warn('Firebase withdrawal update error:', error);
  }
}

export function subscribeWithdrawals(callback: (payouts: PayoutRecord[]) => void) {
  try {
    const colRef = collection(firestoreDb, WITHDRAWALS_COLLECTION);
    return onSnapshot(colRef, (snap) => {
      const results: PayoutRecord[] = [];
      snap.forEach((d) => {
        results.push(d.data() as PayoutRecord);
      });
      callback(results);
    }, (error) => {
      console.warn('Firebase withdrawals subscription notice:', error);
    });
  } catch (e) {
    console.warn('Firebase withdrawals snapshot setup:', e);
    return () => {};
  }
}

export async function fetchWithdrawalsFromFirebase(): Promise<PayoutRecord[]> {
  try {
    const colRef = collection(firestoreDb, WITHDRAWALS_COLLECTION);
    const snap = await getDocs(colRef);
    const results: PayoutRecord[] = [];
    snap.forEach((d) => {
      results.push(d.data() as PayoutRecord);
    });
    return results;
  } catch (error) {
    console.warn('Firebase withdrawals fetch error:', error);
    return [];
  }
}

/**
 * 4. All Users Management in Firebase
 */
export async function fetchAllUsersFromFirebase(): Promise<UserProfile[]> {
  try {
    const colRef = collection(firestoreDb, USERS_COLLECTION);
    const snap = await getDocs(colRef);
    const users: UserProfile[] = [];
    snap.forEach((d) => {
      users.push(d.data() as UserProfile);
    });
    return users;
  } catch (error) {
    console.warn('Firebase fetch all users error:', error);
    return [];
  }
}

export async function updateUserBalanceInFirebase(userId: string, newBalanceUSD: number): Promise<boolean> {
  try {
    const docRef = doc(firestoreDb, USERS_COLLECTION, userId);
    await updateDoc(docRef, { balanceUSD: newBalanceUSD });
    return true;
  } catch (error) {
    console.warn('Firebase update user balance error:', error);
    return false;
  }
}

/**
 * 5. Record Transaction History in Firebase
 */
export async function recordTransactionInFirebase(tx: TransactionHistoryItem): Promise<void> {
  try {
    const docRef = doc(firestoreDb, TRANSACTIONS_COLLECTION, tx.id);
    await setDoc(docRef, {
      ...tx,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Firebase transaction log note:', error);
  }
}
