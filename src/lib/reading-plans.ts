/**
 * @fileOverview Defines the structured reading plans for The Scriptorium.
 * Implements Genre (Days 1-14), Chronological (Days 15-21), and Thematic (Days 22-28) paths.
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

  // --- Week 2: Hebrew Poetry ---
  8: {
    day: 8,
    reference: "Psalm 1",
    title: "The Two Ways",
    audience: "The 'Porch' to the entire Psalter",
    mainTruth: "Human existence is a binary choice: flourishing in the Word or vanishing like chaff.",
    culturalInsights: [
      { title: "The Irrigation Stream", note: "In Israel's arid climate, a flourishing tree is usually 'transplanted' by a man-made channel (peleg). Flourishing is intentional, not accidental." },
      { title: "The Threshing Floor", note: "Winnowing occurred on hilltops. Chaff (the light, useless husk) was tossed into the wind to be blown into nothingness." }
    ],
    symbolicMapping: [
      { symbol: "The Tree", reality: "The Righteous Life", insight: "Strength comes from a source outside oneself (the Water)." },
      { symbol: "The Chaff", reality: "The Wicked Life", insight: "Useless, weightless, and ultimately forgotten by the wind." }
    ],
    scribalStrategy: {
      title: "Parallel Lines & Contrast",
      instructions: [
        "Indent the second line of every verse to show Parallelism.",
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
      { title: "The Valley of the Shadow", note: "Refers to the Wadi Qelt, a deep canyon with predators and flash floods." },
      { title: "The Table in the Desert", note: "The leather mat (shulchan) in a host's tent. Desert hospitality was absolute." }
    ],
    scribalStrategy: {
      title: "Comfort Script & Shadowing",
      instructions: [
        "Use a fluid, cursive-style 'Comfort Script' with no sharp angles.",
        "For v. 4, use a slightly darker ink or heavier touch to represent the valley's shadows.",
        "Draw a Shepherd’s Crook next to v. 4 and an Oil Jar next to v. 5."
      ]
    },
    reflectionQuestion: "How does the 'physical reality' of the Judean wilderness change my understanding of the Shepherd's protection?"
  },
  13: { 
    day: 13, 
    reference: "Psalm 51", 
    title: "A Prayer of Repentance", 
    mainTruth: "True repentance is based on God's steadfast love, not the size of our sacrifice.",
    culturalInsights: [
      { title: "Blotting Out", note: "Ancient carbon-based ink could be literally sponged off parchment. To 'blot out' was to wipe the record clean." },
      { title: "Hyssop", note: "A ritual plant used for sprinkling blood or water for ritual cleansing." }
    ],
    scribalStrategy: { 
      title: "The Clean Slate", 
      instructions: [
        "Write MERCY in large, bold script at the top of the page.",
        "Transcribe v. 1-12 with justified, neat lines to represent a restored life.",
        "Lightly blur the edges of verse 7 ('Wash me...') to symbolize the cleansing process."
      ] 
    },
    reflectionQuestion: "Is my repentance focused on the 'steadfast love' of God or the 'severity' of my mistake?"
  },
  14: { 
    day: 14, 
    reference: "Psalm 100", 
    title: "A Liturgy of Entry", 
    mainTruth: "We enter God's presence with joy because He is the Creator and we are His people.",
    culturalInsights: [
      { title: "The Joyful Shout (Rua)", note: "A battle cry or trumpet blast announcing the arrival of a King." },
      { title: "The Todah Sacrifice", note: "A specific sacrifice of thanksgiving, shared as a feast with others." }
    ],
    scribalStrategy: { 
      title: "The Temple Entry", 
      instructions: [
        "Draw two vertical lines representing Temple gates.",
        "Transcribe v. 1-2 at the top between the gates.",
        "Write GOD and STEADFAST LOVE in all caps or a different color."
      ] 
    },
    reflectionQuestion: "What is my 'joyful shout' to God today as I enter His presence?"
  },
  // --- Week 5: Wisdom Literature ---
  29: {
    day: 29,
    reference: "Proverbs 3:5-6",
    title: "Trust in the Lord",
    mainTruth: "True direction in life comes from complete reliance on God rather than human understanding.",
    culturalInsights: [
      { title: "Direct Paths", note: "The Hebrew word for 'direct' or 'straight' (yashar) refers to clearing obstacles from a highway so travel is unhindered." }
    ],
    scribalStrategy: {
      title: "Wisdom Banner",
      instructions: [
        "Write TRUST in large gold lettering.",
        "Transcribe v. 5-6 inside a double-bordered rectangle.",
        "Add a decorative compass in the right margin."
      ]
    },
    reflectionQuestion: "In what area am I currently leaning on my own understanding instead of trusting Him?"
  },
  30: {
    day: 30,
    reference: "Proverbs 8:22-31",
    title: "Wisdom at Creation",
    mainTruth: "Wisdom is woven into the very fabric of the created order, existing before the earth began.",
    scribalStrategy: {
      title: "Creation Flow",
      instructions: [
        "Transcribe v. 22-31 using a flowing, wave-like line layout.",
        "Write 'BEFORE' and 'BEGINNING' in bold blue ink."
      ]
    },
    reflectionQuestion: "If God created the world with wisdom, how does that help me trust His design for my daily life?"
  },
  31: {
    day: 31,
    reference: "Job 28:12-28",
    title: "The Search for Wisdom",
    mainTruth: "The fear of the Lord is the beginning of wisdom, which cannot be bought with earthly treasures.",
    culturalInsights: [
      { title: "Ancient Mining", note: "Job 28 describes the deep shafts and dark tunnels of ancient miners, showing the extreme effort humans make for gold, while ignoring wisdom." }
    ],
    scribalStrategy: {
      title: "The Hidden Treasure",
      instructions: [
        "Draw a mine shaft layout in the margins.",
        "Highlight the phrase: 'Behold, the fear of the Lord, that is wisdom' (v. 28) in red ink."
      ]
    },
    reflectionQuestion: "Am I searching for wisdom with the same intensity that people search for wealth?"
  },
  32: {
    day: 32,
    reference: "Job 38:1-11",
    title: "The Lord Answers Job",
    mainTruth: "Human limitation must submit to the vast sovereignty of the Creator of the universe.",
    scribalStrategy: {
      title: "The Whirlwind",
      instructions: [
        "Draw a circular wind-like frame around the text.",
        "Use stark, heavy capital letters for God's questions to Job."
      ]
    },
    reflectionQuestion: "Does God's sovereignty comfort me, or do I feel the need to argue with His plans?"
  },
  33: {
    day: 33,
    reference: "Job 42:1-6",
    title: "Job's Confession",
    mainTruth: "Beholding God's greatness leads to profound humility and repentance.",
    scribalStrategy: {
      title: "Humility Scroll",
      instructions: [
        "Transcribe Job's repentance (v. 1-6) in small, delicate script.",
        "Leave a large margin of white space to represent silence before God."
      ]
    },
    reflectionQuestion: "What happens in my heart when I stop defending myself and simply behold God?"
  },
  34: {
    day: 34,
    reference: "Ecclesiastes 3:1-8",
    title: "A Time for Everything",
    mainTruth: "Every season of human life is appointed and overseen by God's sovereign hand.",
    culturalInsights: [
      { title: "Hevehl", note: "The core word 'vanity' (hevel) means breath or vapor—temporary, elusive, and impossible to grasp." }
    ],
    scribalStrategy: {
      title: "The Alternating Ledger",
      instructions: [
        "Split the page into two columns.",
        "Left Column: Positives (Born, Plant, Heal, Laugh, Dance).",
        "Right Column: Negatives (Die, Pluck up, Slay, Weep, Mourn).",
        "Center: Transcribe v. 1 in bold."
      ]
    },
    reflectionQuestion: "What season of life am I currently in, and how can I honor God in it?"
  },
  35: {
    day: 35,
    reference: "Ecclesiastes 12:1-7",
    title: "Remember Your Creator",
    mainTruth: "Dedicating our lives to God in youth prepares us for the reality of aging and mortality.",
    scribalStrategy: {
      title: "The Silver Cord",
      instructions: [
        "Draw a breaking silver cord and a shattered golden bowl in the margin.",
        "Write 'Remember your Creator' in large, ornate letters at the top."
      ]
    },
    reflectionQuestion: "How does the reality of aging and death clarify my priorities today?"
  },

  // --- Week 6: New Testament Epistles ---
  36: {
    day: 36,
    reference: "Romans 8:1-11",
    title: "Life in the Spirit",
    mainTruth: "There is no condemnation for those in Christ Jesus who walk according to the Spirit.",
    scribalStrategy: {
      title: "Condemnation Rest",
      instructions: [
        "Write NO CONDEMNATION in all caps at the top.",
        "Underline references to 'Spirit' (pneuma) in green ink."
      ]
    },
    reflectionQuestion: "Do I still live under the weight of condemnation, or do I enjoy the freedom of the Spirit?"
  },
  37: {
    day: 37,
    reference: "Romans 8:31-39",
    title: "More Than Conquerors",
    mainTruth: "Nothing in all creation can separate the believer from the love of God in Christ Jesus.",
    scribalStrategy: {
      title: "The Victory Ledger",
      instructions: [
        "List all the potential separators in v. 35 (tribulation, distress, persecution, famine, nakedness, danger, sword) on the left.",
        "Draw a large red line cutting through the list, ending on the right: 'More than conquerors' (v. 37)."
      ]
    },
    reflectionQuestion: "What fear is currently testing my assurance of God's love?"
  },
  38: {
    day: 38,
    reference: "Ephesians 2:1-10",
    title: "By Grace Through Faith",
    mainTruth: "Salvation is a gift of God, received through faith alone, for good works prepared beforehand.",
    scribalStrategy: {
      title: "The Gift Box",
      instructions: [
        "Box in v. 8-9: 'For by grace you have been saved through faith...'",
        "Write 'THE GIFT OF GOD' in bold, centered letters."
      ]
    },
    reflectionQuestion: "Am I trying to earn my standing with God, or am I resting in His gift?"
  },
  39: {
    day: 39,
    reference: "Ephesians 6:10-18",
    title: "The Armor of God",
    mainTruth: "Our struggle is spiritual, requiring the full armor of God to stand firm against evil.",
    culturalInsights: [
      { title: "Roman Armor", note: "Paul was likely chained to a Roman soldier while writing this. Each piece of armor matches the soldier's equipment." }
    ],
    scribalStrategy: {
      title: "The Soldier's Sketch",
      instructions: [
        "Sketch the elements of armor (Belt, Breastplate, Shoes, Shield, Helmet, Sword) in the margin.",
        "Label each piece with its spiritual reality."
      ]
    },
    reflectionQuestion: "Which piece of armor do I need to consciously put on today?"
  },
  40: {
    day: 40,
    reference: "Philippians 2:5-11",
    title: "The Mind of Christ",
    mainTruth: "The path of exaltation in the Kingdom is humility and self-giving obedience.",
    culturalInsights: [
      { title: "Carmen Christi", note: "This passage is widely believed to be an early Christian hymn sung by the church, celebrating Christ's self-emptying (kenosis)." }
    ],
    scribalStrategy: {
      title: "The Descent and Ascent",
      instructions: [
        "Use a step-down layout for v. 6-8 (Christ emptying Himself).",
        "Use a step-up, bold layout for v. 9-11 (Christ exalted)."
      ]
    },
    reflectionQuestion: "Where is God calling me to humble myself in service to others?"
  },
  41: {
    day: 41,
    reference: "Colossians 1:15-20",
    title: "The Preeminence of Christ",
    mainTruth: "Christ is the image of the invisible God, the firstborn over all creation, in whom all things hold together.",
    scribalStrategy: {
      title: "The Preeminent Crown",
      instructions: [
        "Draw a Crown and a Globe overlapping.",
        "Transcribe v. 15-18 in a central, dominant box."
      ]
    },
    reflectionQuestion: "What does it mean for Christ to be the 'head' and center of my life?"
  },
  42: {
    day: 42,
    reference: "James 1:2-12",
    title: "Testing of Faith",
    mainTruth: "Trials produce steadfastness, leading to maturity and the crown of life.",
    scribalStrategy: {
      title: "The Trial Crown",
      instructions: [
        "Underline 'Joy' (chara) and 'Trials' (peirasmos) in contrasting colors.",
        "Draw a Crown of Life in the bottom margin."
      ]
    },
    reflectionQuestion: "How can I find joy in the trials I am currently facing?"
  }
};

export const CHRONOLOGICAL_PLAN: Record<number, ReadingPlanDay> = {
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
      { title: "The Tear Bottle", note: "Lachrymatories were small vials where God 'collected' tears as a record of pain." }
    ],
    scribalStrategy: {
      title: "The Tear Bottle Page",
      instructions: [
        "Use 'Cramp-Script' (tight, slightly fearful handwriting) for the first few verses.",
        "Draw a small Bottle in the margin; write GRACE inside it.",
        "Draw an arrow from the historical snapshot to v. 3: 'When I am afraid, I put my trust in you.'"
      ]
    },
    reflectionQuestion: "What is the specific fear I am 'bottling' up for God today?"
  },
  16: { 
    day: 16, 
    reference: "Psalm 142", 
    title: "The Cave of Adullam",
    historicalSnapshot: {
      ref: "1 Samuel 22:1",
      text: "David departed from there and escaped to the cave of Adullam."
    },
    scribalStrategy: {
      title: "The Cave Walls Layout",
      instructions: [
        "Use a heavy, dark border on the edges to represent the cave mouth.",
        "Write the Psalm verses in a way that 'widens' toward the bottom.",
        "Box verse 5: 'I say, \"You are my refuge, my portion in the land of the living.\"'."
      ]
    },
    reflectionQuestion: "What are the 'Adullams' in your life where you feel hidden or forgotten?"
  },
  17: { 
    day: 17, 
    reference: "Psalm 57", 
    title: "En-Gedi: The Sword and the Song",
    historicalSnapshot: {
      ref: "1 Samuel 24:4",
      text: "Then David arose and stealthily cut off a corner of Saul's robe."
    },
    culturalInsights: [
      { title: "The Royal Corner (Kanaph)", note: "The hem or 'corner' of a royal robe represented authority. 'Wings' is the same word." }
    ],
    scribalStrategy: {
      title: "The Wing and the Sword",
      instructions: [
        "Transcribe 1 Samuel 24:4–6 as a Historical Header.",
        "Draw a Wing and a Sword crossed in the margin.",
        "Center the 'Chorus' (v. 7 & 11) in a High Praise Box."
      ]
    },
    reflectionQuestion: "Where am I tempted to 'cut the robe' instead of waiting for God?"
  },
  18: { 
    day: 18, 
    reference: "Psalm 7", 
    title: "The Midnight Test",
    historicalSnapshot: {
      ref: "1 Samuel 26:12",
      text: "So David took the spear and the jar of water from Saul’s head, and they went their way."
    },
    scribalStrategy: {
      title: "The Shield of Integrity",
      instructions: [
        "Transcribe 1 Samuel 26:12 as a Historical Footer.",
        "Draw a simple Shield in the center of the page.",
        "Box in verse 10: 'My shield is with God, who saves the upright in heart.'"
      ]
    },
    reflectionQuestion: "Where am I tempted to take a 'short-cut' to get what God has promised?"
  },
  19: { 
    day: 19, 
    reference: "2 Samuel 7:1-17", 
    title: "The Royal Covenant",
    scribalStrategy: {
      title: "The Royal Dynasty",
      instructions: [
        "Use your most formal, elegant script: 'The Covenant of the Eternal Throne'.",
        "Highlight the word 'FOREVER' in gold—it appears three times.",
        "Draw a Crown to symbolize the eternal dynasty leading to the Messiah."
      ]
    },
    reflectionQuestion: "Where am I trying to work for God when He wants to work for me?"
  },
  20: { 
    day: 20, 
    reference: "2 Samuel 11", 
    title: "The Great Fall",
    scribalStrategy: {
      title: "The Darkened Page",
      instructions: [
        "Use a heavy black border around the entire page.",
        "On the left, transcribe the 'Progress of Sin': Remained -> Saw -> Took -> Lied -> Murdered.",
        "Leave the center of the page empty to represent the 'spiritual desert'."
      ]
    },
    reflectionQuestion: "Where am I currently tempted by 'palace life'—thinking I've 'arrived'?"
  },
  21: { 
    day: 21, 
    reference: "2 Samuel 12:1-15", 
    title: "The Holy Ambush",
    historicalSnapshot: {
      ref: "2 Samuel 12:7",
      text: "Nathan said to David, 'You are the man!'"
    },
    scribalStrategy: {
      title: "The Mirror of Truth",
      instructions: [
        "Transcribe Nathan's parable (v. 1-4) in an indented script.",
        "Write 'YOU ARE THE MAN' in the center in large, stark letters.",
        "Draw a small Ewe Lamb as a symbol of the parable and the Lamb of God."
      ]
    },
    reflectionQuestion: "Where is God using a 'mirror' to show me a truth I've been hiding from?"
  },
  // --- Week 7: The Exile & Return ---
  43: {
    day: 43,
    reference: "2 Kings 25:1-10",
    title: "The Fall of Jerusalem",
    historicalSnapshot: {
      ref: "2 Kings 25:9",
      text: "And he burnt the house of the Lord..."
    },
    scribalStrategy: {
      title: "The Ruined Temple",
      instructions: [
        "Transcribe v. 8-10 in charcoal or grey ink.",
        "Draw smoke rising from the top of the text pane.",
        "Write 'EXILE' in heavy block letters in the margin."
      ]
    },
    reflectionQuestion: "How do I respond when God allows things I relied on to fall apart for my growth?"
  },
  44: {
    day: 44,
    reference: "Psalm 137:1-6",
    title: "By the Rivers of Babylon",
    historicalSnapshot: {
      ref: "Psalm 137:1",
      text: "By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion."
    },
    scribalStrategy: {
      title: "The Silent Harps",
      instructions: [
        "Draw a weeping willow tree with a harp hanging on it.",
        "Transcribe v. 1-4 using a soft, slanting script.",
        "Write ZION in gold lettering."
      ]
    },
    reflectionQuestion: "How do I maintain my devotion and worship when living in a culture that doesn't share my faith?"
  },
  45: {
    day: 45,
    reference: "Daniel 6:10-23",
    title: "Daniel in the Lions' Den",
    historicalSnapshot: {
      ref: "Daniel 6:10",
      text: "He went into his house; and his windows being open in his chamber toward Jerusalem..."
    },
    scribalStrategy: {
      title: "The Open Window",
      instructions: [
        "Draw an arched window showing the direction of Jerusalem.",
        "Write Daniel's prayer times (Three Times a Day) in the margin.",
        "Highlight v. 22 'My God hath sent his angel...' in green ink."
      ]
    },
    reflectionQuestion: "Is my prayer life consistent enough that others would know it is my non-negotiable priority?"
  },
  46: {
    day: 46,
    reference: "Ezra 1:1-8",
    title: "The Decree of Cyrus",
    historicalSnapshot: {
      ref: "Ezra 1:1",
      text: "The Lord stirred up the spirit of Cyrus king of Persia..."
    },
    scribalStrategy: {
      title: "The Persian Proclamation",
      instructions: [
        "Create a scroll banner design at the top of the page.",
        "Transcribe Cyrus's decree in an official, calligraphic hand."
      ]
    },
    reflectionQuestion: "How does it build my faith to see God move the heart of a pagan emperor to fulfill His promise?"
  },
  47: {
    day: 47,
    reference: "Ezra 3:8-13",
    title: "Rebuilding the Temple Foundation",
    historicalSnapshot: {
      ref: "Ezra 3:11",
      text: "And they sang together by course in praising and giving thanks unto the Lord..."
    },
    scribalStrategy: {
      title: "The Shout and the Weep",
      instructions: [
        "Underline references to joy and weeping in contrasting colors.",
        "Draw a foundation stone at the base of the page."
      ]
    },
    reflectionQuestion: "How can joy and grief coexist in my spiritual journey during times of rebuilding?"
  },
  48: {
    day: 48,
    reference: "Nehemiah 2:1-8",
    title: "Nehemiah Sent to Jerusalem",
    historicalSnapshot: {
      ref: "Nehemiah 2:4",
      text: "Then the king said unto me, For what dost thou make request? So I prayed to the God of heaven."
    },
    scribalStrategy: {
      title: "The Instant Prayer",
      instructions: [
        "Highlight Nehemiah's quick prayer (v. 4) inside a speech bubble.",
        "Draw a cupbearer's goblet in the bottom corner."
      ]
    },
    reflectionQuestion: "Do I practice 'arrow prayers'—turning to God instantly in moments of pressure?"
  },
  49: {
    day: 49,
    reference: "Nehemiah 8:1-8",
    title: "Ezra Reads the Law",
    historicalSnapshot: {
      ref: "Nehemiah 8:3",
      text: "And the ears of all the people were attentive unto the book of the law."
    },
    scribalStrategy: {
      title: "The Pulpit of Wood",
      instructions: [
        "Draw a wooden platform/pulpit frame.",
        "Write AMEN, AMEN in large capital letters in the margin."
      ]
    },
    reflectionQuestion: "When was the last time the reading of scripture brought me to a place of deep response?"
  },
  // --- Week 9: The Life and Ministry of Jesus ---
  57: {
    day: 57,
    reference: "Luke 2:1-20",
    title: "The Birth of the King",
    historicalSnapshot: {
      ref: "Luke 2:11",
      text: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord."
    },
    scribalStrategy: {
      title: "The Manger Sketch",
      instructions: [
        "Draw a simple manger in the bottom margin.",
        "Highlight 'GLORY TO GOD' in gold ink.",
        "Transcribe v. 10-14 using a grand Gothic script."
      ]
    },
    reflectionQuestion: "Does the good news of Jesus' birth still bring 'great joy' to my daily routine?"
  },
  58: {
    day: 58,
    reference: "Matthew 3:13-17",
    title: "The Baptism of Jesus",
    historicalSnapshot: {
      ref: "Matthew 3:17",
      text: "And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased."
    },
    scribalStrategy: {
      title: "The Descending Dove",
      instructions: [
        "Draw a descending dove icon next to v. 16.",
        "Write the Father's voice (v. 17) in bold, heavy capital letters."
      ]
    },
    reflectionQuestion: "How does knowing God's pleasure in Christ extend to me through my union with Him?"
  },
  59: {
    day: 59,
    reference: "Matthew 4:1-11",
    title: "The Temptation in the Wilderness",
    historicalSnapshot: {
      ref: "Matthew 4:4",
      text: "But he answered and said, It is written, Man shall not live by bread alone..."
    },
    scribalStrategy: {
      title: "It Is Written",
      instructions: [
        "Write 'IT IS WRITTEN' three times in the left margin in red ink.",
        "Box in Jesus' scriptural defenses (v. 4, 7, 10)."
      ]
    },
    reflectionQuestion: "Am I storing up Scripture in my heart as my primary weapon against temptation?"
  },
  60: {
    day: 60,
    reference: "John 2:1-11",
    title: "The Wedding at Cana",
    historicalSnapshot: {
      ref: "John 2:11",
      text: "This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory..."
    },
    scribalStrategy: {
      title: "Water to Wine",
      instructions: [
        "Draw six stone water jars in the margins.",
        "Write 'GLORY MANIFESTED' in vibrant purple script."
      ]
    },
    reflectionQuestion: "Where do I need to trust Jesus to turn my 'empty jars' into overflowing abundance?"
  },
  61: {
    day: 61,
    reference: "Mark 4:35-41",
    title: "Calming the Storm",
    historicalSnapshot: {
      ref: "Mark 4:39",
      text: "And he arose, and rebuked the wind, and said unto the sea, Peace, be still."
    },
    scribalStrategy: {
      title: "Peace Be Still",
      instructions: [
        "Write PEACE, BE STILL in large, calming blue letters across the page.",
        "Draw wave-like flourishes that flatten out at the base of the text."
      ]
    },
    reflectionQuestion: "What 'storm' in my life is currently tempting me to ask, 'Teacher, do you not care that we are perishing?'"
  },
  62: {
    day: 62,
    reference: "Matthew 27:32-54",
    title: "The Crucifixion of Christ",
    historicalSnapshot: {
      ref: "Matthew 27:46",
      text: "Eli, Eli, lama sabachthani? that is to say, My God, my God, why hast thou forsaken me?"
    },
    scribalStrategy: {
      title: "The Cross and the Veil",
      instructions: [
        "Draw a torn veil down the center-right of the margin.",
        "Write Jesus' cry (v. 46) in a jagged, distressed hand.",
        "Leave the borders stark black."
      ]
    },
    reflectionQuestion: "What does the tearing of the veil tell me about my direct access to God today?"
  },
  63: {
    day: 63,
    reference: "Luke 24:1-12",
    title: "The Resurrection of Christ",
    historicalSnapshot: {
      ref: "Luke 24:6",
      text: "He is not here, but is risen: remember how he spake unto you..."
    },
    scribalStrategy: {
      title: "The Empty Tomb",
      instructions: [
        "Write HE IS NOT HERE, BUT IS RISEN in gold leaf lettering.",
        "Draw an open circular tomb in the margin.",
        "Add a banner of victory at the top."
      ]
    },
    reflectionQuestion: "How does the reality of the resurrection change the way I look at my fears, trials, and death?"
  }
};

export const THEMATIC_PLAN: Record<number, ReadingPlanDay> = {
  // --- Week 4: The Covenant Thread ---
  22: {
    day: 22,
    reference: "Genesis 1:26-31; 2:15-17",
    title: "The Creation Covenant",
    mainTruth: "Man is a Vice-Regent, made to represent God's rule and enjoy His provision through obedience.",
    scribalStrategy: {
      title: "The Blueprint of Life",
      instructions: [
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
      { title: "The Warrior's Bow", note: "The rainbow (qeshet) is pointed upward toward heaven, signifying judgment has been 'hung up'." }
    ],
    scribalStrategy: {
      title: "The Covenant of the Clouds",
      instructions: [
        "Rainbow Arch: Transcribe verses 12-15 in an arching shape across the center.",
        "Use seven colors of the spectrum for your lines if possible.",
        "Transcribe verse 16 at the bottom: God remembers even when we cannot see."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" }
    ],
    reflectionQuestion: "How does the 'reliability' of nature build my trust in God's spiritual promises?"
  },
  24: {
    day: 24,
    reference: "Genesis 15",
    title: "The Abrahamic Covenant",
    mainTruth: "God binds Himself by an oath to create a people and a place through one man's faith.",
    culturalInsights: [
      { title: "God's Solo Walk", note: "God alone passes through the pieces, taking the entire penalty of the covenant upon Himself." }
    ],
    scribalStrategy: {
      title: "The Starry Night Ledger",
      instructions: [
        "Upper Section: Use dark ink for the 'Stars' (v. 5) with dots of light.",
        "Lower Section: Create a 'Path of Blood' layout by splitting text into two columns.",
        "Highlight 'BELIEVED' (v. 6) in gold as the hinge of faith."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise (Substitution)" }
    ],
    reflectionQuestion: "How does God's 'solo commitment' change my fear of failing Him?"
  },
  25: {
    day: 25,
    reference: "Exodus 19:1-8; 20:1-17",
    title: "The Mosaic Covenant",
    mainTruth: "The Law reveals God's holy character and provides a framework for life as His set-apart people.",
    scribalStrategy: {
      title: "The Tablets of Stone",
      instructions: [
        "Divide page into two columns representing two tablets.",
        "Left: Commandments 1-4 (Relationship with God).",
        "Right: Commandments 5-10 (Relationship with Man).",
        "Draw a Mountain with Smoke at the top and a Lamb at the bottom."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law (Holiness)" }
    ],
    reflectionQuestion: "How does God's Law act as a personal mirror for you today?"
  },
  26: {
    day: 26,
    reference: "2 Samuel 7:12-16",
    title: "The Davidic Covenant (Thematic Lens)",
    mainTruth: "The promise of an eternal dynasty bridges the gap between the Law and the ultimate King of Grace.",
    scribalStrategy: {
      title: "The Royal Bridge (Triptych)",
      instructions: [
        "Left Panel (Past): Write names Abraham (Promise) and Moses (Law).",
        "Center Panel (Present): Transcribe 2 Samuel 7:12–13 with a Crown icon.",
        "Right Panel (Future): Write 'The Son of David' in shimmering ink."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law" },
      { label: "Covenant", value: "David: Kingdom (Eternal Throne)" }
    ],
    reflectionQuestion: "God builds the house. How does this rest your anxiety about your own legacy?"
  },
  27: {
    day: 27,
    reference: "Jeremiah 31:31-34",
    title: "The New Covenant Promise",
    mainTruth: "A promise of internal transformation where the law is written on the heart.",
    scribalStrategy: {
      title: "The Heart Scroll",
      instructions: [
        "Draw a large Heart in the center of your page.",
        "Transcribe Jeremiah 31:33-34 INSIDE the heart following its curve.",
        "Margin: Write 'STONE' in jagged script on left, 'FLESH' in warm script on right."
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
      { title: "The Cup of Redemption", note: "Jesus took the Third Cup of Passover and transformed its meaning into the New Covenant." }
    ],
    scribalStrategy: {
      title: "The Finished Thread",
      instructions: [
        "Header: Write 'The New Covenant: Fulfilled in Christ' in bold script.",
        "Center: Draw a Chalice and a Loaf of Bread.",
        "Transcription: Write Luke 22:19-20 encircling the cup and bread.",
        "Final Ledger: Complete with 'JESUS: FULFILLMENT' in celebratory ink."
      ]
    },
    thematicLedger: [
      { label: "Covenant", value: "Adam: Creation" },
      { label: "Covenant", value: "Noah: Preservation" },
      { label: "Covenant", value: "Abraham: Promise" },
      { label: "Covenant", value: "Moses: Law" },
      { label: "Covenant", value: "David: Kingdom" },
      { label: "Covenant", value: "New Covenant: Promised" },
      { label: "Covenant", value: "JESUS: FULFILLMENT" }
    ],
    reflectionQuestion: "How does seeing the whole plan from Genesis to the Gospels build your assurance?"
  },
  // --- Week 8: The Temple & Presence of God ---
  50: {
    day: 50,
    reference: "Exodus 40:34-38",
    title: "The Tabernacle Filled",
    mainTruth: "God's glory dwells among His people, guiding their journey through the wilderness.",
    scribalStrategy: {
      title: "The Pillar of Cloud",
      instructions: [
        "Draw a pillar of cloud rising on the left and a pillar of fire on the right.",
        "Transcribe v. 34-38 in a central column."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" }
    ],
    reflectionQuestion: "How does knowing God's presence guides my steps change my outlook for today?"
  },
  51: {
    day: 51,
    reference: "1 Kings 8:1-11",
    title: "Solomon's Temple Dedicated",
    mainTruth: "The Temple serves as the earthly dwelling place of God's covenant presence.",
    scribalStrategy: {
      title: "The Ark Enters",
      instructions: [
        "Draw the staves of the Ark extending from the holy place.",
        "Highlight 'the glory of the Lord had filled the house' (v. 11) in gold ink."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" }
    ],
    reflectionQuestion: "What places or moments do I dedicate entirely to welcoming God's presence?"
  },
  52: {
    day: 52,
    reference: "Ezekiel 10:1-18",
    title: "The Glory Departs",
    mainTruth: "Idolatry forces the departure of God's holy presence from His temple.",
    scribalStrategy: {
      title: "The Departing Wheels",
      instructions: [
        "Draw overlapping wheels of fire in the margins.",
        "Transcribe the departure of the glory (v. 18) in pale, fading ink."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" },
      { label: "Presence", value: "Ezekiel: Departed" }
    ],
    reflectionQuestion: "Are there areas of compromise in my life that grieves the Holy Spirit?"
  },
  53: {
    day: 53,
    reference: "Ezekiel 43:1-7",
    title: "The Glory Returns",
    mainTruth: "God promises to dwell in the midst of a cleansed and restored temple forever.",
    scribalStrategy: {
      title: "The Eastern Gate",
      instructions: [
        "Draw double gates looking towards the rising sun.",
        "Write 'HIS VOICE WAS LIKE THE NOISE OF MANY WATERS' in bold letters."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" },
      { label: "Presence", value: "Ezekiel: Departed" },
      { label: "Presence", value: "Ezekiel: Promised Return" }
    ],
    reflectionQuestion: "How does the promise of God's permanent return give me hope during seasons of dryness?"
  },
  54: {
    day: 54,
    reference: "John 1:1-14",
    title: "The Word Became Flesh",
    mainTruth: "Jesus is the ultimate temple, God tabernacling among humanity in flesh.",
    culturalInsights: [
      { title: "Tabernacled", note: "The Greek word for 'dwelt' (eskenosen) in John 1:14 literally means 'to pitch a tent' or 'tabernacle' among us." }
    ],
    scribalStrategy: {
      title: "The Living Temple",
      instructions: [
        "Box in John 1:14 'And the Word became flesh...'",
        "Underline 'GLORY' in radiant yellow ink."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" },
      { label: "Presence", value: "Ezekiel: Departed" },
      { label: "Presence", value: "Ezekiel: Promised Return" },
      { label: "Presence", value: "JESUS: INCARNATION" }
    ],
    reflectionQuestion: "How does Christ taking on flesh bridge the gap between God's holiness and my humanity?"
  },
  55: {
    day: 55,
    reference: "1 Corinthians 6:19-20",
    title: "The Temple of the Holy Spirit",
    mainTruth: "Believers are the dwelling place of God's Spirit, bought with a price to glorify God.",
    scribalStrategy: {
      title: "The Price Tag",
      instructions: [
        "Write 'BOUGHT WITH A PRICE' in all-caps across the center.",
        "Underline 'Glorify God in your body' in red."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" },
      { label: "Presence", value: "Ezekiel: Departed" },
      { label: "Presence", value: "Ezekiel: Promised Return" },
      { label: "Presence", value: "JESUS: INCARNATION" },
      { label: "Presence", value: "CHURCH: DWELLING" }
    ],
    reflectionQuestion: "If my body is God's temple, how does that affect my daily habits and choices?"
  },
  56: {
    day: 56,
    reference: "Revelation 21:1-7",
    title: "The New Jerusalem",
    mainTruth: "The final climax is the unhindered dwelling of God with humanity in a new creation.",
    scribalStrategy: {
      title: "The Tabernacle of God",
      instructions: [
        "Draw a brilliant city skyline descending from heaven.",
        "Write 'GOD HIMSELF SHALL BE WITH THEM' in large celebratory letters."
      ]
    },
    thematicLedger: [
      { label: "Presence", value: "Eden: Lost" },
      { label: "Presence", value: "Tabernacle: Dwells" },
      { label: "Presence", value: "Solomon's Temple: Filled" },
      { label: "Presence", value: "Ezekiel: Departed" },
      { label: "Presence", value: "Ezekiel: Promised Return" },
      { label: "Presence", value: "JESUS: INCARNATION" },
      { label: "Presence", value: "CHURCH: DWELLING" },
      { label: "Presence", value: "NEW JERUSALEM: ETERNAL" }
    ],
    reflectionQuestion: "How does the guarantee of this final home motivate my endurance today?"
  }
};

export const BIBLE_BOOKS = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 }
];

export function getBookAndChapterForDay(day: number): { book: string; chapter: number } | null {
  if (day < 1 || day > 1189) return null;
  let currentSum = 0;
  for (const b of BIBLE_BOOKS) {
    if (day <= currentSum + b.chapters) {
      return {
        book: b.name,
        chapter: day - currentSum
      };
    }
    currentSum += b.chapters;
  }
  return null;
}

export type PathId = 'chronological' | 'thematic' | 'genre' | 'entire';

export function getPlanDays(path: PathId): number[] {
  if (path === 'genre') {
    return Object.keys(GENRE_PLAN).map(Number).sort((a, b) => a - b);
  }
  if (path === 'chronological') {
    return Object.keys(CHRONOLOGICAL_PLAN).map(Number).sort((a, b) => a - b);
  }
  if (path === 'thematic') {
    return Object.keys(THEMATIC_PLAN).map(Number).sort((a, b) => a - b);
  }
  if (path === 'entire') {
    return Array.from({ length: 1189 }, (_, i) => i + 1);
  }
  return [];
}

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
  if (path === 'entire') {
    const mapping = getBookAndChapterForDay(day);
    if (!mapping) return null;
    const { book, chapter } = mapping;
    
    return {
      day,
      reference: `${book} ${chapter}`,
      title: `${book} Chapter ${chapter}`,
      mainTruth: `Trace the progression of divine revelation through the text of ${book} chapter ${chapter}.`,
      scribalStrategy: {
        title: "Canonical Scribing",
        instructions: [
          `Transcribe the primary verses of ${book} ${chapter} in an elegant bookhand.`,
          `Highlight terms representing key theological or historical actions.`,
          `Reflect on how this chapter fits into the grand narrative of Scripture.`
        ]
      },
      reflectionQuestion: `What key truths in ${book} ${chapter} deepen your understanding of God's sovereign covenant?`
    };
  }
  return null;
}

