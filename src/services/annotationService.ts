
'use client';

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Firestore,
  Query
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

/**
 * Saves a new scholarly annotation to the global social collection.
 */
export function saveAnnotation(
  db: Firestore, 
  user: User, 
  passageRef: string, 
  highlightedText: string, 
  comment: string
) {
  if (!comment.trim()) return;

  const annotationsRef = collection(db, 'annotations');
  
  addDocumentNonBlocking(annotationsRef, {
    userId: user.uid,
    userDisplayName: user.displayName || 'Anonymous Scholar',
    userAvatarUrl: user.photoURL || null,
    passageRef: passageRef,
    highlightedText: highlightedText,
    comment: comment,
    createdAt: serverTimestamp(),
  });
}

/**
 * Returns a query for all annotations for a specific verse or passage.
 */
export function getAnnotationsQuery(db: Firestore, passageRef: string): Query {
  return query(
    collection(db, 'annotations'),
    where('passageRef', '==', passageRef),
    orderBy('createdAt', 'desc')
  );
}
