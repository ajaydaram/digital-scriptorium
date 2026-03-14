/**
 * @fileOverview Defines the structured reading plans for The Scriptorium.
 * Implements Chronological, Genre-specific, and Thematic paths.
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
  historicalSnapshot?: { ref: string; text: string };
  thematicLedger?: { label: string; value: string }[];
}

export const CHRONOLOGICAL_PLAN: Record<number, ReadingPlanDay> = {
  1: { day: 1, reference: "Genesis 1-3", title: "Creation and the Fall" },
  2: { day: 2, reference: "Genesis 4-7", title: "The Flood" },
  3: { day: 3, reference: "Genesis 8-11", title: "Tower of Babel" },
  4: { day: 4, reference: "Genesis 12-15", title: "The Call of Abraham" },
  5: { day: 5, reference: "Genesis 16-19", title: "Sodom and Gomorrah" },
  
  // --- Week 3: The King in the Caves ---
  15: {
    day: 15,
    reference: "Psalm 56",
    title: "David at Gath: Faith in the Midst of Fear",
    historicalSnapshot: {
      ref: "1 Samuel 21:13",
      text: "So he changed his behavior before them and pretended to be insane in their hands and made marks on the doors of the gate and let his spittle run down his beard."
    },
    culturalInsights: [
      { 
        title: "The Tear Bottle", 
        note: "In the ancient Near East, 'lachrymatories' (tear bottles) were small ceramic or glass vials. People believed God was so attentive to their suffering that He 'collected' their tears as a record of their pain." 
      }
    ],
    scribalStrategy: {
      title: "The Tear Bottle Page",
      instructions: [
        "Use 'Cramp-Script' (tight, slightly fearful handwriting) for the first few verses.",
        "Draw a small Bottle or Vial in the margin.",
        "Draw an arrow from the historical snapshot to verse 3: 'When I am afraid, I put my trust in you.'",
        "Write the word 'GRACE' inside your drawn bottle."
      ]
    },
    reflectionQuestion: "When I am afraid, I put my trust in you. What is the specific fear I am 'bottling' up for God today?"
  },
  16: { 
    day: 16, 
    reference: "Psalm 142", 
    title: "The Cave of Adullam",
    historicalSnapshot: {
      ref: "1 Samuel 22:1-2",
      text: "David departed from there and escaped to the cave of Adullam... And everyone who was in distress, and everyone who was in debt, and everyone who was bitter in soul, gathered to him."
    },
    culturalInsights: [
      {
        title: "The Shephelah Caves",
        note: "The Judean foothills (Shephelah) are honeycombed with limestone caves. Adullam was a 'stronghold'—a natural fortress, cold and damp, where echoes were constant."
      }
    ],
    scribalStrategy: {
      title: "The Cave Walls Layout",
      instructions: [
        "Use a heavy, dark border on the edges of your page to represent the cave mouth.",
        "Transcribe 1 Samuel 22:1-2 in the left margin.",
        "Write the Psalm verses in a way that 'widens' toward the bottom (hope of escape).",
        "Box verse 5: 'I say, \"You are my refuge, my portion in the land of the living.\"'",
        "Use a slanted, distressed script for the complaint (v. 1-4)."
      ]
    },
    reflectionQuestion: "What are the 'Adullams' in your life where you feel hidden or forgotten? How can you move from complaint to confidence today?"
  },
  17: { 
    day: 17, 
    reference: "Psalm 57", 
    title: "En-Gedi: The Sword and the Song",
    historicalSnapshot: {
      ref: "1 Samuel 24:4-6",
      text: "And the men of David said to him, 'Here is the day of which the Lord said to you...' Then David arose and stealthily cut off a corner of Saul's robe. And afterward David's heart struck him..."
    },
    culturalInsights: [
      {
        title: "The Royal Corner (Kanaph)",
        note: "In the ancient East, the hem or 'corner' (kanaph) of a royal robe represented the king’s authority. By cutting it, David was showing he had the power to take the kingdom."
      },
      {
        title: "The Shadow of Wings",
        note: "The word for 'wings' (kanaph) is the same word for the 'corners' of a garment. While David cut Saul's robe, he prayed to be hidden under God's robe."
      }
    ],
    scribalStrategy: {
      title: "The Wing and the Sword",
      instructions: [
        "Transcribe 1 Samuel 24:4–6 as a Historical Header in an angular script.",
        "Draw a Wing and a Sword crossed in the margin.",
        "Center the 'Chorus' (v. 7 & 11) in a High Praise Box.",
        "Refuse vengeance: Write 'Grace over Force' in the margin."
      ]
    },
    reflectionQuestion: "David refused to take by force what God had promised to give by grace. Where am I tempted to 'cut the robe' instead of waiting for God?"
  },
  18: { 
    day: 18, 
    reference: "Psalm 7", 
    title: "The Midnight Test: Integrity over Opportunity",
    historicalSnapshot: {
      ref: "1 Samuel 26:12",
      text: "So David took the spear and the jar of water from Saul’s head, and they went their way."
    },
    culturalInsights: [
      {
        title: "The Spear and the Jar",
        note: "Saul's spear symbolized his royal military power, while the water jar represented his life and sustenance in the desert. David took the evidence of his mercy, not the life of his enemy."
      }
    ],
    scribalStrategy: {
      title: "The Shield of Integrity",
      instructions: [
        "Transcribe 1 Samuel 26:12 as a Historical Footer in a steady, firm hand.",
        "Draw a simple Shield in the center of the page.",
        "Box in verse 10: 'My shield is with God, who saves the upright in heart.'",
        "Contrast the Spear and the Shield in your margins."
      ]
    },
    reflectionQuestion: "Saul is protected by 3,000 men and a spear, yet he is vulnerable. David is protected by his integrity and God. Where am I tempted to take a 'short-cut' to get what God has promised?"
  },
  19: { 
    day: 19, 
    reference: "2 Samuel 7:1-17", 
    title: "The Royal Covenant: A House for a House",
    historicalSnapshot: {
      ref: "2 Samuel 7:18",
      text: "Then King David went in and sat before the Lord and said, 'Who am I, O Lord God, and what is my house, that you have brought me thus far?'"
    },
    culturalInsights: [
      {
        title: "Bayit (House)",
        note: "In Hebrew, 'bayit' means both a physical building and a family lineage. David wanted to build a building; God promised to build a dynasty."
      },
      {
        title: "Palace of Cedar",
        note: "Cedar of Lebanon was the most prestigious building material—aromatic, durable, and imported. David’s luxury contrasted with the Ark’s humble tent."
      }
    ],
    scribalStrategy: {
      title: "The Royal Dynasty",
      instructions: [
        "Use your most formal, elegant script for the title: 'The Covenant of the Eternal Throne'.",
        "Transcribe 2 Samuel 7:12–16 in the center of the page.",
        "Highlight the word 'FOREVER' in gold or a distinct color—it appears three times as the anchor of the promise.",
        "Draw a Crown or Throne to symbolize the eternal dynasty leading to the Messiah."
      ]
    },
    reflectionQuestion: "David wanted to build God a temple of stone; God built David a temple of people. Where am I trying to work for God when He wants to work for me?"
  },
  20: { 
    day: 20, 
    reference: "2 Samuel 11", 
    title: "The Great Fall",
    historicalSnapshot: {
      ref: "2 Samuel 11:1",
      text: "In the spring of the year, the time when kings go out to battle, David sent Joab... but David remained at Jerusalem."
    },
    culturalInsights: [
      {
        title: "The King's Absence",
        note: "A king's primary role was as military leader. By staying behind, David abandoned his post, creating the idleness that led to his downfall."
      },
      {
        title: "The Shadow of Uriah",
        note: "Uriah the Hittite was one of David's 'Mighty Men'. His refusal to sleep in his own house while the Ark and the army were in tents was a silent rebuke to David's own lack of discipline."
      }
    ],
    scribalStrategy: {
      title: "The Darkened Page",
      instructions: [
        "Use a heavy black or dark grey border around the entire page to represent the gravity of the fall.",
        "On the left side, transcribe the 'Progress of Sin' in a descending staircase pattern: He Remained -> He Saw -> He Took -> He Lied -> He Murdered.",
        "Leave the center of the page largely empty to represent the 'spiritual desert' David inhabited while hiding his sin.",
        "At the very bottom, write 2 Samuel 11:27 in a small, stark script: 'But the thing that David had done displeased the Lord.'"
      ]
    },
    reflectionQuestion: "Where am I currently tempted by 'palace life'—the moments when I think I've 'arrived' and no longer need to be on guard?"
  },
  21: { 
    day: 21, 
    reference: "2 Samuel 12:1-15", 
    title: "The Holy Ambush",
    historicalSnapshot: {
      ref: "2 Samuel 12:7",
      text: "Nathan said to David, 'You are the man!'"
    },
    culturalInsights: [
      { 
        title: "The Parable of the Ewe Lamb", 
        note: "Nathan uses a story about a poor man's only pet lamb to bypass David's royal defenses and reach his shepherd's heart." 
      },
      { 
        title: "The Holy Ambush", 
        note: "The four words 'You are the man!' broke a year of spiritual silence and led to the birth of Psalm 51." 
      }
    ],
    scribalStrategy: {
      title: "The Mirror of Truth",
      instructions: [
        "Transcribe Nathan's parable (v. 1-4) in an indented, storytelling script.",
        "Write 'YOU ARE THE MAN' in the center of the page in large, stark letters.",
        "Transcribe David's confession (v. 13) and the opening of Psalm 51:1-2 at the bottom.",
        "Draw a small Ewe Lamb as a symbol of both the parable and the Lamb of God."
      ]
    },
    reflectionQuestion: "David could have killed the prophet, but he chose to kill his pride. Where is God using a 'mirror' to show me a truth I've been hiding from?"
  }
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
        "Transcribe the Parable of the Lost Sheep (v. 3-7) on the top half.",
        "Transcribe the Parable of the Lost Coin (v. 8-10) on the bottom half.",
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
        "The Climax: In your most beautiful, bold script, transcribe the father’s response: 'But while he was still a long way off, his father saw him and felt compassion, and ran and embraced him and kissed him.' (v. 20)."
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
      { symbol: "The Denarius", reality: "The gift of Grace", insight: "Salvation is an equal gift to all who enter the Kingdom, regardless of time served." }
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
        "Use a bolder, stronger script for the righteous and a 'wispy' script for chaff."
      ]
    },
    reflectionQuestion: "In what area of my life am I currently 'walking, standing, or sitting' with the wrong influence?"
  },
  11: {
    day: 11,
    reference: "Psalm 23",
    title: "The Shepherd's Provision",
    audience: "A song of trust in a harsh landscape",
    mainTruth: "God’s protection and provision are absolute, even in the most treacherous environments.",
    culturalInsights: [
      { title: "Green Pastures & Still Waters", note: "In the Judean wilderness, these are small tufts of grass and calm Wadi pools. The shepherd must lead intentionally to find them." },
      { title: "The Valley of the Shadow", note: "Refers to the Wadi Qelt, a deep canyon with high walls that create deep shadows even at noon—a place of predators and flash floods." },
      { title: "The Table in the Desert", note: "The leather mat (shulchan) in a host's tent. Desert hospitality was absolute; once anointed, you were under the host's total protection." }
    ],
    scribalStrategy: {
      title: "Comfort Script & Shadowing",
      instructions: [
        "Use a fluid, cursive-style 'Comfort Script' with no sharp angles.",
        "For v. 4, use a slightly darker ink or heavier touch to represent the valley's shadows.",
        "Draw a Shepherd’s Crook next to v. 4 and an Oil Jar next to v. 5.",
        "Transcribe the final word: 'FOREVER' in your largest, most beautiful script."
      ]
    },
    reflectionQuestion: "How does the 'physical reality' of the Judean wilderness change my understanding of the Shepherd's protection?"
  },
  13: { 
    day: 13, 
    reference: "Psalm 51", 
    title: "A Prayer of Repentance", 
    audience: "A broken king seeking restoration",
    mainTruth: "True repentance is based on God's steadfast love, not the size of our sacrifice.",
    culturalInsights: [
      { title: "Blotting Out", note: "Ancient carbon-based ink could be literally sponged off parchment. To 'blot out' was to wipe the record completely clean." },
      { title: "Hyssop", note: "A ritual plant used for sprinkling blood or water. Being 'purged with hyssop' meant being declared ceremonially and morally fit for God's presence." },
      { title: "Broken & Contrite", note: "The word 'contrite' means 'crushed' or 'powdered'. God wants a heart broken open, not a religious performance." }
    ],
    scribalStrategy: { 
      title: "The Clean Slate", 
      instructions: [
        "Write MERCY in large, bold script at the top of the page.",
        "Transcribe v. 1-12 with justified, neat lines to represent a restored life.",
        "The 'Wash' Effect: Lightly blur the edges of verse 7 ('Wash me...') to symbolize the cleansing process.",
        "Transcribe v. 10 ('Create in me a clean heart...') in the exact center of the page."
      ] 
    },
    reflectionQuestion: "Is my repentance focused on the 'steadfast love' of God or the 'severity' of my mistake?"
  },
  14: { 
    day: 14, 
    reference: "Psalm 100", 
    title: "A Liturgy of Thanksgiving", 
    audience: "The gathered community entering the temple",
    mainTruth: "We enter God's presence with joy because He is the Creator and we are His people.",
    culturalInsights: [
      { title: "The Joyful Shout", note: "The 'shout' (rua) is a triumphal blast, like a trumpet. It's an active, energetic invitation to the entire earth." },
      { title: "The Sheep of His Pasture", note: "Reflects Israel's identity as a flock under the total care and ownership of Yahweh." }
    ],
    scribalStrategy: { 
      title: "The Temple Entry", 
      instructions: [
        "Draw two vertical lines on the left and right sides of your page to represent the Temple gates.",
        "Transcribe the 'Shout' and 'Serve' commands at the very top, centered between your 'gates'.",
        "Write the central truth—'Know that the LORD, he is God!'—in a distinct, boxy script.",
        "Calligraphic Emphasis: For GOOD, STEADFAST LOVE, and FAITHFULNESS, use ALL CAPS or a different color.",
        "At the bottom of the page, write 'AMEN' as your signature for the week."
      ] 
    },
    reflectionQuestion: "What is my 'joyful shout' to God today as I enter His presence?"
  },
};

export const THEMATIC_PLAN: Record<number, ReadingPlanDay> = {
  // --- Week 4: The Covenant Thread ---
  22: {
    day: 22,
    reference: "Genesis 1:26-31; 2:15-17",
    title: "The Creation Covenant",
    mainTruth: "Man is a Vice-Regent, made to represent God's rule and enjoy His provision through obedience.",
    culturalInsights: [
      { title: "Vice-Regent", note: "Man is placed in the garden as a representive ruler. We were made to reflect God's authority over the created order." },
      { title: "Work and Keep", note: "These words (abad and shamar) are the same used later for priests serving in the Tabernacle. Work is an act of worship." },
      { title: "The Probative Tree", note: "The command wasn't about fruit, but about Authority. Who defines 'good' and 'evil'—the Creator or the creature?" }
    ],
    scribalStrategy: {
      title: "The Blueprint of Life",
      instructions: [
        "Header: Write 'The Covenant of Works: Life and Image' in an elegant hand.",
        "Dual Columns: Transcribe Blessing (1:26-28) on the left and Duty (2:15-17) on the right.",
        "Marginal Symbols: Draw a Leaf and a Crown.",
        "Connection: Write 1 Corinthians 15:45 at the bottom."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" }
    ],
    reflectionQuestion: "Would I rather define 'good' for myself, or trust God's definition today?"
  },
  23: {
    day: 23,
    reference: "Genesis 9:8-17",
    title: "The Noahic Covenant",
    mainTruth: "God's unilateral promise to preserve the earth ensures stability for the unfolding plan of redemption.",
    culturalInsights: [
      { 
        title: "The Warrior's Bow", 
        note: "The word for rainbow (qeshet) is the same as for a warrior’s bow. Crucially, it is pointed upward toward heaven, signifying that the weapon of judgment has been 'hung up' and retired." 
      },
      { 
        title: "Common Grace", 
        note: "This is a universal covenant with all living creatures. It guarantees natural stability—seasons, harvest, and time—as a 'stage' for the history of redemption." 
      }
    ],
    scribalStrategy: {
      title: "The Covenant of the Clouds",
      instructions: [
        "Header: Write 'The Noahic Covenant: Preservation and Peace' in a sweeping hand.",
        "The Rainbow Arch: Transcribe verses 12-15 in an arching shape across the center.",
        "Color Code: If possible, use the seven colors of the spectrum for your lines.",
        "God's Memory: Transcribe verse 16 at the bottom, highlighting that the covenant depends on God's sight, not ours."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" }
    ],
    reflectionQuestion: "The covenant depends on God's memory, not ours. How does the 'reliability' of the natural order build my trust in God's spiritual promises?"
  },
  24: {
    day: 24,
    reference: "Genesis 15",
    title: "The Abrahamic Covenant",
    mainTruth: "God binds Himself by an oath to create a people and a place through one man's faith.",
    culturalInsights: [
      { 
        title: "The Ritual of the Pieces", 
        note: "In the ancient East, a treaty was 'cut.' Parties walked through halved animals, stating: 'May I be torn asunder if I break this promise.'" 
      },
      { 
        title: "The Solo Walk", 
        note: "Abraham is in a deep sleep. God alone passes through as a smoking fire pot, taking the entire penalty of the covenant upon Himself." 
      }
    ],
    symbolicMapping: [
      { symbol: "The Stars", reality: "Offspring", insight: "Infinite promise in a barren reality." },
      { symbol: "Smoking Fire Pot", reality: "God's Presence", insight: "God taking on the risk of man's failure." }
    ],
    scribalStrategy: {
      title: "The Starry Night Ledger",
      instructions: [
        "Upper Section: Use dark ink for the 'Stars' (v. 5). Dots of light represent offspring.",
        "Lower Section: Create a 'Path of Blood' layout by splitting the text into two distant columns.",
        "Highlight 'BELIEVED' (v. 6) in gold as the hinge of faith."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise (Substitution)" }
    ],
    reflectionQuestion: "God walked the path of blood alone. How does His 'solo commitment' change my fear of failing Him?"
  },
  25: {
    day: 25,
    reference: "Exodus 19:1-8; 20:1-17",
    title: "The Mosaic Covenant",
    mainTruth: "The Law reveals God's holy character and provides a framework for life as His set-apart people.",
    culturalInsights: [
      { title: "Suzerain-Vassal Treaty", note: "An ancient legal form where a great King (Suzerain) enters a bond with a smaller nation (Vassal). Grace (the rescue from Egypt) always precedes the Law (the stipulations)." },
      { title: "Kingdom of Priests", note: "Israel was called to be a 'set apart' people, functioning as a bridge between God and the nations by living out His wisdom." }
    ],
    scribalStrategy: {
      title: "The Tablets of Stone",
      instructions: [
        "Divide your page into two columns representing the two tablets.",
        "Left Tablet: Transcribe Commandments 1-4 (Relationship with God).",
        "Right Tablet: Transcribe Commandments 5-10 (Relationship with Man).",
        "At the top, draw a Mountain with Smoke; at the bottom, draw a Lamb."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law (Holiness)" }
    ],
    reflectionQuestion: "As you scribe the 'Thou shalts,' notice they are singular. How does God's Law act as a personal mirror for you today?"
  },
  26: {
    day: 26,
    reference: "2 Samuel 7:12-16",
    title: "The Davidic Covenant (Thematic Lens)",
    mainTruth: "The promise of an eternal dynasty bridges the gap between the Law and the ultimate King of Grace.",
    culturalInsights: [
      { title: "Son of God Language", note: "Functional, not biological. The King acts as God's representative. God promises discipline without taking away His steadfast love (hesed)." },
      { title: "From Tent to House", note: "Thematic shift from a nomadic tent (people on the move) to a permanent House (people who have arrived in the land)." },
      { title: "Covenant Security", note: "The throne is secure not because the Kings are perfect, but because God’s promise is permanent." }
    ],
    scribalStrategy: {
      title: "The Royal Bridge (Triptych)",
      instructions: [
        "Left Panel (The Past): Write the names Abraham (Promise) and Moses (Law).",
        "Center Panel (The Present): Transcribe 2 Samuel 7:12–13 and anchor with a Crown icon.",
        "Right Panel (The Future): Write 'The Son of David' in faint or shimmering ink.",
        "Connection: Draw a Crown spanning across all three sections."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law" },
      { label: "Covenant", value: "David: Kingdom (Eternal Throne)" }
    ],
    reflectionQuestion: "God builds the house. How does resting in His building project change your anxiety about your own legacy?"
  },
  27: {
    day: 27,
    reference: "Jeremiah 31:31-34",
    title: "The New Covenant Promise",
    mainTruth: "A promise of internal transformation where the law is written on the heart, not just on stone.",
    culturalInsights: [
      { title: "Inward Transformation", note: "The Mosaic Law was external (stone). The New Covenant is internal (Spirit). It provides the power to do what the Law could only command." },
      { title: "Universal Knowledge", note: "Under the New Covenant, every believer has direct access to the knowledge of God without needing a human intermediary." }
    ],
    scribalStrategy: {
      title: "The Heart Scroll",
      instructions: [
        "Draw a large Heart in the center of your page.",
        "Transcribe Jeremiah 31:33-34 INSIDE the heart following its curve.",
        "Contrast Margin: Left: Write 'STONE' in jagged script. Right: Write 'FLESH' in warm, smooth script.",
        "Header: Write 'Transformation from Within' in a soft, flowing hand."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law" },
      { label: "Covenant", value: "David: Kingdom" },
      { label: "Covenant", value: "New Covenant: Promised" }
    ],
    reflectionQuestion: "Is the Word of God an external pressure for you, or an internal passion?"
  },
  28: {
    day: 28,
    reference: "Luke 22:14-20",
    title: "The New Covenant Fulfilled",
    mainTruth: "The 'Golden Thread' reaches its climax in the blood of Christ, shed for the forgiveness of many.",
    culturalInsights: [
      { title: "The Passover Shift", note: "Jesus takes the traditional Passover elements and reinterprets them. The bread is His body; the cup is the New Covenant in His blood." },
      { title: "Substitution Fulfilled", note: "The blood path of Genesis 15 is finally walked by God the Son. He takes the penalty of every broken covenant upon Himself." }
    ],
    scribalStrategy: {
      title: "The Cup of Completion",
      instructions: [
        "Header: Write 'The Golden Thread: IT IS FINISHED' in your boldest script.",
        "Transcription: Write verses 19-20 in the center.",
        "Visual: Draw a Cup and a Bread loaf.",
        "The Full Ledger: Complete your margin with 'CHRIST: Fulfillment (Grace)'."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law" },
      { label: "Covenant", value: "David: Kingdom" },
      { label: "Covenant", value: "New Covenant: Promised" },
      { label: "Covenant", value: "Christ: Fulfillment (Grace)" }
    ],
    reflectionQuestion: "As you write the final words of the week, look back at the ledger. How does seeing the whole plan build your assurance?"
  }
};

export type PathId = 'chronological' | 'thematic' | 'genre';

export function getPlanDay(path: PathId, day: number): ReadingPlanDay | null {
  if (path === 'chronological') {
    return CHRONOLOGICAL_PLAN[day] || null;
  }
  if (path === 'genre') {
    return GENRE_PLAN[day] || null;
  }
  if (path === 'thematic') {
    return THEMATIC_PLAN[day] || null;
  }
  return null;
}
