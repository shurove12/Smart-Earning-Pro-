import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';

/**
 * Dedicated Firebase Configuration for Standalone Admin Suite
 * Project: smart-earning-63e85
 */
export const adminFirebaseConfig = {
  apiKey: "AIzaSyB4bgSusVPVrzWRs9gGGX48D2IDsKuJE_o",
  authDomain: "smart-earning-63e85.firebaseapp.com",
  databaseURL: "https://smart-earning-63e85-default-rtdb.firebaseio.com",
  projectId: "smart-earning-63e85",
  storageBucket: "smart-earning-63e85.firebasestorage.app",
  messagingSenderId: "425448212470",
  appId: "1:425448212470:web:779fba0a4b121b5fdb29d7",
  measurementId: "G-TLSW1T6QH8"
};

// Initialize Admin Firebase instance
export const adminApp = initializeApp(adminFirebaseConfig, 'ADMIN_INSTANCE');
export const adminDb = getFirestore(adminApp);
