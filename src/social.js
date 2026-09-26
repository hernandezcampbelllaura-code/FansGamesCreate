import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

function requireCloud() {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase no está configurado.');
  }
}

// === Followers ===
export async function followUser(followerUid, targetUid) {
  requireCloud();
  const ref = doc(db, 'social', targetUid);
  await updateDoc(ref, {
    followers: arrayUnion(followerUid),
    updatedAt: serverTimestamp(),
  }).catch(() => {
    // Document doesn't exist, create it
    return updateDoc(ref, {
      followers: [followerUid],
      updatedAt: serverTimestamp(),
    });
  });
}

export async function unfollowUser(followerUid, targetUid) {
  requireCloud();
  const ref = doc(db, 'social', targetUid);
  await updateDoc(ref, {
    followers: arrayRemove(followerUid),
    updatedAt: serverTimestamp(),
  });
}

export async function getFollowers(uid) {
  requireCloud();
  const snapshot = await getDocs(
    query(collection(db, 'social'), where('uid', '==', uid))
  );
  if (snapshot.empty) return [];
  return snapshot.docs[0].data().followers || [];
}

// === Notifications ===
export async function createNotification(recipientUid, type, data) {
  requireCloud();
  await addDoc(collection(db, 'notifications'), {
    recipientUid,
    type, // 'follow', 'like', 'comment'
    data,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export async function getNotifications(uid) {
  requireCloud();
  const snapshot = await getDocs(
    query(
      collection(db, 'notifications'),
      where('recipientUid', '==', uid),
      orderBy('createdAt', 'desc')
    )
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function markNotificationAsRead(notificationId) {
  requireCloud();
  const ref = doc(db, 'notifications', notificationId);
  await updateDoc(ref, { read: true });
}

// === Likes & Comments ===
export async function likePost(postId, userUid, userName) {
  requireCloud();
  const ref = doc(db, 'posts', postId);
  await updateDoc(ref, {
    likedBy: arrayUnion(userUid),
    updatedAt: serverTimestamp(),
  });
  // Create notification
  const postSnap = await getDocs(query(collection(db, 'posts'), where('id', '==', postId)));
  if (!postSnap.empty) {
    const post = postSnap.docs[0].data();
    await createNotification(post.authorUid, 'like', {
      userName,
      postId,
      postTitle: post.title,
    });
  }
}

export async function unlikePost(postId, userUid) {
  requireCloud();
  const ref = doc(db, 'posts', postId);
  await updateDoc(ref, {
    likedBy: arrayRemove(userUid),
    updatedAt: serverTimestamp(),
  });
}

export async function addComment(postId, userUid, userName, text) {
  requireCloud();
  const ref = doc(db, 'posts', postId);
  const comment = {
    id: `${Date.now()}`,
    userUid,
    userName,
    text,
    createdAt: new Date().toISOString(),
  };
  await updateDoc(ref, {
    comments: arrayUnion(comment),
    updatedAt: serverTimestamp(),
  });
  // Create notification
  const postSnap = await getDocs(query(collection(db, 'posts'), where('id', '==', postId)));
  if (!postSnap.empty) {
    const post = postSnap.docs[0].data();
    await createNotification(post.authorUid, 'comment', {
      userName,
      postId,
      postTitle: post.title,
      text,
    });
  }
}
