import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;

// Initialize Firebase Admin SDK (lazy initialization)
function initFirebaseAdmin() {
  // Return existing app if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }

  // Validate required environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Please check your environment variables: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
    );
  }

  // Initialize and return the app
  adminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      // Replace escaped newlines with actual newlines
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });

  return adminApp;
}

// Lazy getters for auth and db
export function getAdminAuth(): Auth {
  const app = initFirebaseAdmin();
  return getAuth(app);
}

export function getAdminDB(): Firestore {
  const app = initFirebaseAdmin();
  return getFirestore(app);
}

// For backward compatibility (but these will only work at runtime)
export const auth = new Proxy({} as Auth, {
  get: (target, prop) => {
    const authInstance = getAdminAuth();
    return (authInstance as any)[prop];
  },
});

export const db = new Proxy({} as Firestore, {
  get: (target, prop) => {
    const dbInstance = getAdminDB();
    return (dbInstance as any)[prop];
  },
});
