'use client';

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Firestore,
  Query,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  setDoc
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export interface StudyCircle {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerName: string;
  memberIds: string[];
  readingPath?: string;
  currentDay?: number;
  createdAt: any;
}

/**
 * Creates a new private study circle.
 */
export async function createCircle(
  db: Firestore,
  name: string,
  description: string,
  user: User,
  readingPath?: string
): Promise<string> {
  const circlesRef = collection(db, 'circles');
  const newCircleDoc = doc(circlesRef);
  
  await setDoc(newCircleDoc, {
    name,
    description: description || '',
    ownerId: user.uid,
    ownerName: user.displayName || 'Anonymous Scholar',
    memberIds: [user.uid],
    readingPath: readingPath || null,
    currentDay: readingPath ? 1 : null,
    createdAt: serverTimestamp(),
  });

  return newCircleDoc.id;
}

/**
 * Returns a query for all circles where the user is a member.
 */
export function getUserCirclesQuery(db: Firestore, userId: string): Query {
  return query(
    collection(db, 'circles'),
    where('memberIds', 'array-contains', userId),
    orderBy('createdAt', 'desc')
  );
}

/**
 * Invites a user to the circle by their email.
 * Queries the `/users` collection to find the userId matching the email.
 */
export async function inviteMemberToCircle(
  db: Firestore,
  circleId: string,
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email.trim().toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'No user found with that email address.' };
    }

    const userDoc = querySnapshot.docs[0];
    const invitedUserId = userDoc.id;

    const circleRef = doc(db, 'circles', circleId);
    await updateDoc(circleRef, {
      memberIds: arrayUnion(invitedUserId)
    });

    return { success: true, message: `Successfully added ${userDoc.data().displayName || email} to the circle.` };
  } catch (error: any) {
    console.error('Error inviting member:', error);
    return { success: false, message: error.message || 'Failed to add member.' };
  }
}

/**
 * Updates the current reading day progress for a circle.
 */
export async function updateCircleReadingDay(
  db: Firestore,
  circleId: string,
  day: number
): Promise<void> {
  const circleRef = doc(db, 'circles', circleId);
  await updateDoc(circleRef, {
    currentDay: day
  });
}
