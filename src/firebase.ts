import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// User's provided Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4bgSusVPVrzWRs9gGGX48D2IDsKuJE_o",
  authDomain: "smart-earning-63e85.firebaseapp.com",
  databaseURL: "https://smart-earning-63e85-default-rtdb.firebaseio.com",
  projectId: "smart-earning-63e85",
  storageBucket: "smart-earning-63e85.firebasestorage.app",
  messagingSenderId: "425448212470",
  appId: "1:425448212470:web:779fba0a4b121b5fdb29d7",
  measurementId: "G-TLSW1T6QH8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);
export const realtimeDb = getDatabase(firebaseApp);
