/**
 * @fileOverview Defines the structured reading plans for The Scriptorium.
 * Implements Chronological and Genre-specific (Parables & Psalms) paths.
 */

export interface ReadingPlanDay {
  day: number;
  reference: string;
  title: string;
  audience?: string;
  mainTruth?: string;
  culturalInsights?: { title: string; note: string }[];
  symbolicMapping?: { symbol: string; reality: string; insight: string }[];
  scribalStrategy?: { title: string; instructions: string[] };
  reflectionQuestion?: string;
}

export const CHRONOLOGICAL_PLAN: Record<number, ReadingPlanDay> = {
  1: { day: 1, reference: "Genesis 1-3", title: "Creation and the Fall" },
  2: { day: 2, reference: "Genesis 4-7", title: "The Flood" },
  3: { day: 3, reference: "Genesis 8-11", title: "Tower of Babel" },
  4: { day: 4, reference: "Genesis 12-15", title: "The Call of Abraham" },
  5: { day: 5, reference: "Genesis 16-19", title: "Sodom and Gomorrah" },
};

export const GENRE_PLAN: Record<number, ReadingPlanDay> = {
  // --- Week 1: The Parables of Jesus ---
  1: { 
    day: 1, 
    reference: "Matthew 13:1-9", 
    title: "The Sower", 
    audience: "Jesus speaking to a large crowd by the sea",
    mainTruth: "The receptivity of the heart determines the fruitfulness of the Word.",
    culturalInsights: [
      { title: "The Sower’s Method", note: "Ancient farmers threw seeds in a wide arc (broadcast). The sower is extravagantly generous with the seed, not careless." },
      { title: "The 'Path'", note: "Communal footpaths became as hard as concrete. Represents a heart hardened by the world until nothing can penetrate." },
      { title: "The 'Rocky Ground'", note: "Thin topsoil over solid limestone shelves. The plant looks healthy initially but has no depth." },
      { title: "The 'Thorns'", note: "Bell-Thorns grow faster than wheat. The problem is competition for the plant’s attention." }
    ],
    scribalStrategy: {
      title: "Parable Mapping",
      instructions: [
        "Leave a wide margin to sketch the four soil types.",
        "Use block text for the narrative description.",
        "Indent dialogue to distinguish characters."
      ]
    },
    reflectionQuestion: "Which soil is my heart today?"
  },
  2: { 
    day: 2, 
    reference: "Matthew 13:18-23", 
    title: "The Sower (Explanation)", 
    audience: "Jesus speaking privately to His disciples",
    mainTruth: "True understanding leads to a life that produces a hundredfold return.",
    symbolicMapping: [
      { symbol: "The Birds", reality: "The Evil One (Satan)", insight: "What is heard but not understood is easily stolen." },
      { symbol: "The Scorching Sun", reality: "Tribulation / Persecution", insight: "Pressure reveals the root's depth, it doesn't create the problem." },
      { symbol: "The Thorns", reality: "Cares & Deceitfulness", insight: "Distraction is as deadly to faith as outright persecution." },
      { symbol: "The Harvest", reality: "Spiritual Fruitfulness", insight: "Growth is the natural result of hearing AND understanding." }
    ],
    scribalStrategy: {
      title: "The Parallel Ledger",
      instructions: [
        "Use a split-column layout.",
        "Re-list the four ground types on the left.",
        "Transcribe Jesus's explanation on the right.",
        "Draw connecting lines between image and meaning."
      ]
    },
    reflectionQuestion: "What 'distraction' is currently competing for the nutrients in my heart's soil?"
  },
  3: { 
    day: 3, 
    reference: "Luke 15:1-10", 
    title: "The Search and the Joy", 
    audience: "Tax collectors, sinners, and grumbling Pharisees (v. 1-2)",
    mainTruth: "God proactively and exhaustively searches for the lost, and all of heaven rejoices when one is found.",
    culturalInsights: [
      { title: "The Shepherd’s Risk", note: "A mature sheep weighs 50-100 lbs. The shepherd doesn't lead it; he carries it. Grace has a physical cost." },
      { title: "The Woman’s Dowry", note: "Coins were often woven into hair as a safety net. Losing one was a catastrophe of stewardship and future security." },
      { title: "The Dark House", note: "Basalt floors and few windows made finding a small coin nearly impossible without a lamp and a broom." }
    ],
    scribalStrategy: {
      title: "The Joy Journal",
      instructions: [
        "Write REJOICE in large script in the center of the page.",
        "Transcribe the Lost Sheep (v. 3-7) on the top half.",
        "Transcribe the Lost Coin (v. 8-10) on the bottom half.",
        "Note the shared phrase: 'There is joy before the angels of God...'"
      ]
    },
    reflectionQuestion: "How does the 'physical cost' of the shepherd carrying the sheep change my view of God's search for me?"
  },
  4: { 
    day: 4, 
    reference: "Luke 15:11-24", 
    title: "The Prodigal Son (Part 1)", 
    audience: "Tax collectors, sinners, and the grumbling religious elite",
    mainTruth: "God's grace welcomes the repentant home with open arms, taking the shame of the journey upon Himself.",
    culturalInsights: [
      { title: "The Inheritance Request", note: "Asking for inheritance early was a public 'death wish' toward the father. It required liquidating family assets, causing public shame for the household." },
      { title: "Distant Country & Pigs", note: "Feeding pigs (unclean) represented a total loss of Jewish identity and dignity. Carob pods were animal fodder, indigestible for humans." },
      { title: "The Running Father", note: "A patriarch *never* ran. He ran to shield his son from the 'Qetsatsah' ceremony—a community banishment where a pot was broken to signify eternal exile." }
    ],
    scribalStrategy: {
      title: "The Journey Home Timeline",
      instructions: [
        "Use a horizontal timeline layout across your page.",
        "Far Left: Transcribe the son's demand and departure (v. 11-13).",
        "The Valley: In smaller, lower script, transcribe the famine and the pig pen (v. 14-16).",
        "The Ascent: Transcribe the 'coming to himself' and the journey back (v. 17-20).",
        "The Climax: In your most beautiful, bold script, transcribe the father’s embrace (v. 20)."
      ]
    },
    reflectionQuestion: "How does the father's willingness to take on public shame (by running) change my understanding of God's pursuit of me?"
  },
  5: { 
    day: 5, 
    reference: "Luke 15:25-32", 
    title: "The Older Brother (Part 2)", 
    audience: "The Pharisees (The 'Older Brothers' grumbling about Jesus)",
    mainTruth: "Religious legalism and self-righteousness can be just as lost as outward rebellion.",
    culturalInsights: [
      { title: "Lost in the Backyard", note: "The older brother was 'serving as a slave' (douleuō), working for the 'pay' of the inheritance rather than out of love for his father." },
      { title: "The Refusal", note: "By refusing to enter the feast, he publicly insulted his father, forcing the father to 'go out' a second time to entreat him." },
      { title: "The 'Kid' (Goat)", note: "He complained about a young goat while ignoring that 'all the father has' was already his. He saw a boss, not a father." },
      { title: "The Unfinished Ending", note: "We never find out if the older brother went inside. Jesus leaves the choice to the Pharisees (the audience)." }
    ],
    scribalStrategy: {
      title: "The Contrast Page",
      instructions: [
        "Left Margin: Write 'Younger Brother: Rebellion'.",
        "Right Margin: Write 'Older Brother: Self-Righteousness'.",
        "Center Column: Transcribe the Father’s final plea in Luke 15:31-32.",
        "The Scribe's Silence: Leave significant white space at the bottom for the unfinished choice."
      ]
    },
    reflectionQuestion: "Am I working for the 'pay' of the inheritance (blessings) or out of love for the Father Himself?"
  },
  6: { 
    day: 6, 
    reference: "Matthew 20:1-16", 
    title: "The Workers in the Vineyard", 
    audience: "Disciples, following Peter's question about rewards",
    mainTruth: "The kingdom operates on grace, not human concepts of fairness.",
    culturalInsights: [
      { title: "The 11th Hour", note: "5:00 PM, one hour before sunset. If you weren't hired by now, your family would likely go hungry that night." },
      { title: "The Denarius", note: "A standard daily wage—just enough to provide food for a family for one day." },
      { title: "The Payroll Twist", note: "The Master insists on paying the last workers first, intentionally letting the early workers see the grace given to others." }
    ],
    symbolicMapping: [
      { symbol: "Marketplace", reality: "The World", insight: "Where we wait for purpose and provision." },
      { symbol: "The Master", reality: "God's Character", insight: "He is governed by His own generosity, not our 'fairness'." },
      { symbol: "The Denarius", reality: "The Gift of Grace", insight: "Salvation is an equal gift to all who enter the Kingdom, regardless of time served." }
    ],
    scribalStrategy: {
      title: "The Grace Ledger",
      instructions: [
        "Header: Write 'The First shall be Last' in bold script.",
        "Body: Transcribe the Master's dialogue in v. 13-15.",
        "The Tipped Scale: Sketch a balance tipped heavily toward 'The Master's Character' over 'Effort'."
      ]
    },
    reflectionQuestion: "Is my security based on my performance or the Master's promise?"
  },
  7: { 
    day: 7, 
    reference: "Luke 10:25-37", 
    title: "The Good Samaritan", 
    audience: "An expert in the law seeking to justify himself",
    mainTruth: "Our 'neighbor' is anyone in need, regardless of boundaries.",
    culturalInsights: [
      { title: "The Road to Jericho", note: "The 'Way of Blood' drops 3,000 ft in 17 miles. Treacherous cliffs notorious for highwaymen." },
      { title: "Priest & Levite", note: "Chose ritual purity over mercy. Touching a dead body would have made them 'ceremonially unclean' for temple duties." },
      { title: "The Samaritan", note: "A scandal. Jews and Samaritans had a centuries-old blood feud. Oil acted as balm, wine as antiseptic." }
    ],
    scribalStrategy: {
      title: "The Heart Exam",
      instructions: [
        "Header: Write the lawyer's original question: 'And who is my neighbor?' (v. 29).",
        "Body: Transcribe the Samaritan's actions (v. 33-35) in a list format.",
        "Footer: Transcribe Jesus's final command: 'Go, and do likewise' (v. 37)."
      ]
    },
    reflectionQuestion: "Being a neighbor isn't about 'who' deserves my help, but about 'what' kind of person I am becoming."
  },

  // --- Week 2: The Language of the Heart (Hebrew Poetry) ---
  8: {
    day: 8,
    reference: "Psalm 1",
    title: "The Two Ways",
    audience: "The 'Porch' to the entire Psalter",
    mainTruth: "Human existence is a binary choice: flourishing in the Word or vanishing like chaff.",
    culturalInsights: [
      { title: "The Irrigation Stream", note: "In Israel's arid climate, a flourishing tree is usually 'transplanted' by a man-made channel (peleg). Flourishing is intentional, not accidental." },
      { title: "The Threshing Floor", note: "Winnowing occurred on hilltops. Chaff (the light, useless husk) was tossed into the wind to be blown into nothingness." },
      { title: "Walk, Stand, Sit", note: "A Hebrew progression of settling into sin. It begins casual and ends with a fixed seat among mockers." }
    ],
    symbolicMapping: [
      { symbol: "The Tree", reality: "The Righteous Life", insight: "Strength comes from a source outside oneself (the Water)." },
      { symbol: "The Chaff", reality: "The Wicked Life", insight: "Useless, weightless, and ultimately forgotten by the wind." },
      { symbol: "The Water", reality: "The Torah (Instruction)", insight: "Continuous meditation is the root that reaches the stream." }
    ],
    scribalStrategy: {
      title: "Parallel Lines & Contrast",
      instructions: [
        "Indent the second line of every verse by one inch to show Parallelism.",
        "Draw a Tree in the center; write 'Meditation' on the roots.",
        "Write the 'Wicked' verses in a thin, wispy script to represent Chaff."
      ]
    },
    reflectionQuestion: "In what area of my life am I currently 'walking, standing, or sitting' with the wrong influence?"
  },
  9: { day: 9, reference: "Psalm 19:1-6", title: "Nature's Speech", scribalStrategy: { title: "Spaced Lines", instructions: ["Space your lines widely to represent the vastness of the heavens."] } },
  10: { day: 10, reference: "Psalm 19:7-14", title: "The Perfection of the Word", scribalStrategy: { title: "Law Bullets", instructions: ["Bullet point the different names and characteristics of the Law."] } },
  11: { day: 11, reference: "Psalm 23", title: "The Shepherd's Provision", scribalStrategy: { title: "Comfort Script", instructions: ["Use a gentle, cursive 'Comfort Script' for this entire transcription."] } },
  12: { day: 12, reference: "Psalm 42", title: "Thirsting in Despair", scribalStrategy: { title: "Indent Refrains", instructions: ["Indent the refrains in v. 5 and 11 to notice the soul's self-talk."] } },
  13: { day: 13, reference: "Psalm 51", title: "A Prayer of Repentance", scribalStrategy: { title: "Narrow Margins", instructions: ["Use narrow margins to represent the humility of a broken spirit."] } },
  14: { day: 14, reference: "Psalm 100", title: "Liturgy of Thanksgiving", scribalStrategy: { title: "The Shout", instructions: ["Use ALL-CAPS or bold script for every instance of 'SHOUT' or 'JOY'."] } },
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
