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
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export interface Annotation {
  id: string;
  userId: string;
  userDisplayName: string;
  userAvatarUrl: string | null;
  passageRef: string;
  highlightedText: string;
  comment: string;
  createdAt: any;
  circleId?: string | null;
  parentId?: string | null;
  reactions?: {
    insightful?: string[];
    needsContext?: string[];
  };
}

/**
 * Saves a new scholarly annotation. Supports threads and circles.
 */
export function saveAnnotation(
  db: Firestore, 
  user: User, 
  passageRef: string, 
  highlightedText: string, 
  comment: string,
  circleId: string | null = null,
  parentId: string | null = null
) {
  if (!comment.trim()) return;

  const annotationsRef = collection(db, 'annotations');
  
  addDocumentNonBlocking(annotationsRef, {
    userId: user.uid,
    userDisplayName: user.displayName || 'Anonymous Scholar',
    userAvatarUrl: user.photoURL || null,
    passageRef: passageRef,
    highlightedText: highlightedText || '',
    comment: comment,
    createdAt: serverTimestamp(),
    circleId: circleId || null,
    parentId: parentId || null,
    reactions: {
      insightful: [],
      needsContext: []
    }
  });
}

/**
 * Toggles a reaction on an annotation.
 */
export async function toggleAnnotationReaction(
  db: Firestore,
  annotationId: string,
  userId: string,
  reactionType: 'insightful' | 'needsContext'
): Promise<void> {
  const annotationRef = doc(db, 'annotations', annotationId);
  const docSnap = await getDoc(annotationRef);
  if (!docSnap.exists()) return;
  
  const data = docSnap.data();
  const currentReactions = data.reactions || {};
  const users = currentReactions[reactionType] || [];
  
  if (users.includes(userId)) {
    await updateDoc(annotationRef, {
      [`reactions.${reactionType}`]: arrayRemove(userId)
    });
  } else {
    await updateDoc(annotationRef, {
      [`reactions.${reactionType}`]: arrayUnion(userId)
    });
  }
}

/**
 * Returns a query for annotations filtered by passage and circleId (null for public).
 * Omit orderBy to avoid composite index requirements, sorting client-side instead.
 */
export function getAnnotationsQuery(db: Firestore, passageRef: string, circleId: string | null = null): Query {
  return query(
    collection(db, 'annotations'),
    where('passageRef', '==', passageRef),
    where('circleId', '==', circleId)
  );
}
