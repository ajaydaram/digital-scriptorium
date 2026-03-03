
'use client';

import { useFirestore, useUser, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy, serverTimestamp, doc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

/**
 * Hook to manage scripture annotations for the current user.
 */
export function useAnnotations(passageRef: string) {
  const { user } = useUser();
  const { firestore } = useFirestore();

  const annotationsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'annotations'),
      where('passageRef', '==', passageRef),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user, passageRef]);

  const { data: annotations, isLoading, error } = useCollection(annotationsQuery);

  const addAnnotation = (content: string) => {
    if (!firestore || !user || !content.trim()) return;

    const colRef = collection(firestore, 'users', user.uid, 'annotations');
    
    addDocumentNonBlocking(colRef, {
      userId: user.uid,
      passageRef,
      content,
      createdAt: serverTimestamp(),
    });
  };

  return {
    annotations,
    isLoading,
    error,
    addAnnotation,
  };
}
