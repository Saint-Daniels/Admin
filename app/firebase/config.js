import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDr7bC7uZCSllzpz0QF6DVnylrLprwYd84",
  authDomain: "saintdaniels-6144c.firebaseapp.com",
  projectId: "saintdaniels-6144c",
  storageBucket: "saintdaniels-6144c.firebasestorage.app",
  messagingSenderId: "99705276201",
  appId: "1:99705276201:web:6695bbbc70012e92071938",
  measurementId: "G-1CPD7FC0RZ"
};

let db;

try {
  console.log('=== FIREBASE INITIALIZATION START ===');
  console.log('Firebase config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    apiKey: firebaseConfig.apiKey ? '***' : undefined
  });

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
  console.log('Firebase app instance:', app);

  // Initialize Firestore
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
  console.log('Firestore instance:', db);

  // Test the connection
  const testCollection = collection(db, 'applications');
  console.log('✅ Test collection reference created:', testCollection);
  
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

export { db }; 