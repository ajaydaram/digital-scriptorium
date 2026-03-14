/**
 * @fileOverview Defines the structured reading plans for The Scriptorium.
 * Implements Chronological and Genre-specific (Parables) paths.
 */

export interface ReadingPlanDay {
  day: number;
  reference: string;
  title: string;
  audience?: string;
  mainTruth?: string;
}

export const CHRONOLOGICAL_PLAN: Record<number, ReadingPlanDay> = {
  1: { day: 1, reference: "Genesis 1-3", title: "Creation and the Fall" },
  2: { day: 2, reference: "Genesis 4-7", title: "The Flood" },
  3: { day: 3, reference: "Genesis 8-11", title: "Tower of Babel" },
  4: { day: 4, reference: "Genesis 12-15", title: "The Call of Abraham" },
  5: { day: 5, reference: "Genesis 16-19", title: "Sodom and Gomorrah" },
};

export const GENRE_PLAN: Record<number, ReadingPlanDay> = {
  1: { 
    day: 1, 
    reference: "Matthew 13:1-9", 
    title: "The Sower", 
    audience: "Jesus speaking to a large crowd by the sea",
    mainTruth: "The receptivity of the heart determines the fruitfulness of the Word."
  },
  2: { 
    day: 2, 
    reference: "Matthew 13:18-23", 
    title: "The Sower (Explanation)", 
    audience: "Jesus speaking privately to His disciples",
    mainTruth: "True understanding leads to a life that produces a hundredfold return."
  },
  3: { 
    day: 3, 
    reference: "Luke 15:1-10", 
    title: "The Lost Sheep & Coin", 
    audience: "Tax collectors, sinners, and grumbling Pharisees",
    mainTruth: "There is immense joy in heaven over one sinner who repents."
  },
  4: { 
    day: 4, 
    reference: "Luke 15:11-24", 
    title: "The Prodigal Son (Part 1)", 
    audience: "The same crowd of sinners and religious leaders",
    mainTruth: "God's grace welcomes the repentant home with open arms."
  },
  5: { 
    day: 5, 
    reference: "Luke 15:25-32", 
    title: "The Older Brother (Part 2)", 
    audience: "Direct challenge to the Pharisees' heart attitude",
    mainTruth: "Religious legalism can blind us to the beauty of redemption."
  },
  6: { 
    day: 6, 
    reference: "Matthew 20:1-16", 
    title: "The Workers in the Vineyard", 
    audience: "Disciples, following Peter's question about rewards",
    mainTruth: "The kingdom operates on grace, not human concepts of fairness."
  },
  7: { 
    day: 7, 
    reference: "Luke 10:25-37", 
    title: "The Good Samaritan", 
    audience: "An expert in the law seeking to justify himself",
    mainTruth: "Our 'neighbor' is anyone in need, regardless of boundaries."
  },
};

export type PathId = 'chronological' | 'thematic' | 'genre';

export function getPlanDay(path: PathId, day: number): ReadingPlanDay | null {
  if (path === 'chronological') {
    return CHRONOLOGICAL_PLAN[day] || null;
  }
  if (path === 'genre') {
    return GENRE_PLAN[day] || null;
  }
  return null;
}
