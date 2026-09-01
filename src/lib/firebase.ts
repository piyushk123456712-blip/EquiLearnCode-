import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import config from "../../firebase-applet-config.json";

// Suppress known benign Firebase offline warnings to prevent them from showing up as app errors
const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Could not reach Cloud Firestore backend')) {
    return;
  }
  originalConsoleError(...args);
};

const app = initializeApp(config);
export const db = getFirestore(app, config.firestoreDatabaseId);
export const storage = getStorage(app);

