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

  // Create a memoized reference to the progress document in the user's private subcollection
  const progressRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'user_progress', readingUnitId);
  }, [firestore, user, readingUnitId]);

  // Subscribe to real-time updates for this specific progress record
  const { data: progress, isLoading, error } = useDoc(progressRef);

  /**
   * Updates the user's progress stage and timestamps.
   * Uses non-blocking writes for a responsive UI.
   */
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
        // Initialize startedAt if this is the first stage
        ...(stage === 'Read' && !progress?.startedAt ? { startedAt: serverTimestamp() } : {}),
        // Set completedAt if the user reaches Mastery
        ...(stage === 'Master' ? { completedAt: serverTimestamp() } : {}),
      },
      { merge: true }
    );
  };

  // Auto-initialize progress to "Read" stage if the document is missing
  useEffect(() => {
    if (!isLoading && !progress && user && progressRef) {
      updateProgress('Read');
    }
  }, [isLoading, progress, user, progressRef]);

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    currentStep: (progress?.currentStage as StepId) || 'Read',
  };
}
