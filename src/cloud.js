import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, isFirebaseConfigured, storage } from './firebase';

function requireCloud() {
  if (!isFirebaseConfigured || !db || !storage) {
    throw new Error('Firebase no está configurado. Copia .env.example a .env.local y añade las credenciales de tu proyecto.');
  }
}

export async function saveUserProfile(user, profile = {}) {
  requireCloud();
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email || '',
    username: profile.username || user.displayName || user.email?.split('@')[0] || 'Jugador',
    avatarUrl: profile.avatarUrl || user.photoURL || '',
    bio: profile.bio || '',
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(uid) {
  requireCloud();
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function createPost(post) {
  requireCloud();
  const snapshot = await addDoc(collection(db, 'posts'), {
    ...post,
    createdAt: serverTimestamp(),
  });
  return snapshot.id;
}

export async function listPosts() {
  requireCloud();
  const snapshot = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function uploadMedia(file, uid) {
  requireCloud();
  if (!file) throw new Error('Selecciona un archivo.');
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-');
  const fileRef = ref(storage, `users/${uid}/media/${Date.now()}-${safeName}`);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}
