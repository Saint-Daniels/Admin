import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr7bC7uZCSllzpz0QF6DVnylrLprwYd84",
  authDomain: "saintdaniels-6144c.firebaseapp.com",
  projectId: "saintdaniels-6144c",
  storageBucket: "saintdaniels-6144c.appspot.com",
  messagingSenderId: "99705276201",
  appId: "1:99705276201:web:6695bbbc70012e92071938"
};

let app;
let auth;
let db;

try {
  console.log('=== FIREBASE INITIALIZATION START ===');
  
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');

  // Initialize Auth
  auth = getAuth(app);
  
  // Enable persistence for auth
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('✅ Auth persistence enabled');
    })
    .catch((error) => {
      console.error('❌ Auth persistence error:', error);
    });
  
  console.log('✅ Auth initialized successfully');

  // Initialize Firestore
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
  
  console.log('=== FIREBASE INITIALIZATION COMPLETE ===');
} catch (error) {
  console.error('❌ CRITICAL: Firebase initialization error:', error);
  console.error('Error details:', {
    code: error.code,
    message: error.message,
    stack: error.stack,
    name: error.name
  });
  throw error;
}

// Export a function to verify the database connection
export const verifyDatabaseConnection = async () => {
  try {
    if (!db) {
      throw new Error('Firestore database instance is not initialized');
    }
    return true;
  } catch (error) {
    console.error('Database connection verification failed:', error);
    return false;
  }
};

export { db, auth };
export default app; 