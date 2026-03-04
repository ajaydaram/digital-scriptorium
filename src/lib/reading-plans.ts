/**
 * @fileOverview Defines the structured reading plans for The Scriptorium.
 * Currently implements the Chronological Path as a hardcoded mapping.
 */

export interface ReadingPlanDay {
  day: number;
  reference: string;
  title: string;
}

export const CHRONOLOGICAL_PLAN: Record<number, ReadingPlanDay> = {
  1: { day: 1, reference: "Genesis 1-3", title: "Creation and the Fall" },
  2: { day: 2, reference: "Genesis 4-7", title: "The Flood" },
  3: { day: 3, reference: "Genesis 8-11", title: "Tower of Babel" },
  4: { day: 4, reference: "Genesis 12-15", title: "The Call of Abraham" },
  5: { day: 5, reference: "Genesis 16-19", title: "Sodom and Gomorrah" },
  // Plans can be extended easily here
};

export type PathId = 'chronological' | 'thematic' | 'genre';

export function getPlanDay(path: PathId, day: number): ReadingPlanDay | null {
  if (path === 'chronological') {
    return CHRONOLOGICAL_PLAN[day] || null;
  }
  return null;
}
