'use client';

import { useEffect } from 'react';
import { useFirestore, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { type StepId } from '@/components/guided-ascent';

/**
 * Custom hook to manage and sync user study progress for a specific reading unit.
 * Automatically initializes progress if none exists.
 */
export function useUserProgress(readingUnitId: string) {
  const { user } = useUser();
  const { firestore } = useFirestore();

  const progressRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'user_progress', readingUnitId);
  }, [firestore, user, readingUnitId]);

  const { data: progress, isLoading, error } = useDoc(progressRef);

  const updateProgress = (stage: StepId) => {
    if (!progressRef || !user) return;

    setDocumentNonBlocking(
      progressRef,
      {
        id: readingUnitId,
        userId: user.uid,
        readingUnitId: readingUnitId,
        currentStage: stage,
        lastAccessedAt: serverTimestamp(),
        ...(stage === 'Read' && !progress?.startedAt ? { startedAt: serverTimestamp() } : {}),
        ...(stage === 'Master' ? { completedAt: serverTimestamp() } : {}),
      },
      { merge: true }
    );
  };

  /**
   * Specifically for setting the global active path.
   */
  const updatePath = (pathId: string) => {
    if (!progressRef || !user) return;
    setDocumentNonBlocking(
      progressRef,
      { pathId, lastAccessedAt: serverTimestamp() },
      { merge: true }
    );
  };

  useEffect(() => {
    if (!isLoading && !progress && user && progressRef && readingUnitId !== 'global-path') {
      updateProgress('Read');
    }
  }, [isLoading, progress, user, progressRef, readingUnitId]);

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    updatePath,
    currentStep: (progress?.currentStage as StepId) || 'Read',
  };
}
