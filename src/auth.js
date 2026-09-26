import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

function requireAuth() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase no está configurado.');
  }
}

export function listenToAuthState(callback) {
  requireAuth();
  return onAuthStateChanged(auth, callback);
}

export async function registerUser(email, password, displayName) {
  requireAuth();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }
  return credential.user;
}

export async function loginUser(email, password) {
  requireAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logoutUser() {
  requireAuth();
  await signOut(auth);
}

export function getCurrentUser() {
  requireAuth();
  return auth.currentUser;
}
