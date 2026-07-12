export interface Linkage {
  id: string;
  historySnippet: string;
  poeticSnippet: string;
  explanation: string;
}

export interface ChronologicalDayData {
  day: number;
  historyRef: string;
  historyText: string; // HTML or Markdown formatted verse paragraphs
  poeticRef: string;
  poeticText: string;
  linkages: Linkage[];
}

export const CHRONOLOGICAL_DAYS_DATA: Record<number, ChronologicalDayData> = {
  15: {
    day: 15,
    historyRef: "1 Samuel 21:10-15",
    historyText: `[10] And David arose and fled that day from Saul and went to Achish the king of Gath.
[11] And the servants of Achish said to him, "Is not this David the king of the land? Did they not sing to one another of him in dances, 'Saul has struck down his thousands, and David his ten thousands'?"
[12] And David took these words to heart and was much afraid of Achish the king of Gath.
[13] So he changed his behavior before them and pretended to be insane in their hands and made marks on the doors of the gate and let his spittle run down his beard.
[14] Then Achish said to his servants, "Behold, you see the man is mad. Why then have you brought him to me?
[15] Do I lack madmen, that you have brought this fellow to behave as a madman in my presence? Shall this fellow come into my house?"`,
    poeticRef: "Psalm 56",
    poeticText: `[1] Be gracious to me, O God, for man tramples on me; all day long an attacker oppresses me;
[2] my enemies trample on me all day long, for many attack me proudly.
[3] When I am afraid, I put my trust in you.
[4] In God, whose word I praise, in God I trust; I shall not be afraid. What can flesh do to me?
[5] All day long they distort my words; all their thoughts are against me for evil.
[6] They stir up strife, they hide themselves; they watch my steps, as they have waited for my life.
[7] For their crime will they escape? In wrath cast down the peoples, O God!
[8] You have kept count of my tossings; put my tears in your bottle. Are they not in your book?
[9] Then my enemies will turn back in the day when I call. This I know, that God is for me.
[10] In God, whose word I praise, in the Lord, whose word I praise,
[11] in God I trust; I shall not be afraid. What can man do to me?`,
    linkages: [
      {
        id: "gath-fear",
        historySnippet: "much afraid of Achish the king of Gath",
        poeticSnippet: "When I am afraid, I put my trust in you",
        explanation: "David's internal state of terror under Achish in Gath immediately drives him to put his trust in Yahweh."
      },
      {
        id: "gath-insane",
        historySnippet: "pretended to be insane in their hands and made marks on the doors",
        poeticSnippet: "Be gracious to me, O God, for man tramples on me; all day long an attacker oppresses me",
        explanation: "David's outward performance of madness and spitting is processed in private prayer as being trampled and oppressed."
      },
      {
        id: "gath-whispers",
        historySnippet: "Did they not sing to one another... 'David his ten thousands'?",
        poeticSnippet: "All day long they distort my words; all their thoughts are against me for evil",
        explanation: "The whispers and conspiracies of Achish's courtiers analyzing David's military history match the distortion of words in the Psalm."
      }
    ]
  },
  16: {
    day: 16,
    historyRef: "1 Samuel 22:1-2",
    historyText: `[1] David departed from there and escaped to the cave of Adullam. And when his brothers and all his father's house heard it, they went down there to him.
[2] And everyone who was in distress, and everyone who was in debt, and everyone who was bitter in soul, gathered to him. And he became commander over them. And there were with him about four hundred men.`,
    poeticRef: "Psalm 142",
    poeticText: `[1] With my voice I cry out to the Lord; with my voice I plead for mercy to the Lord.
[2] I pour out my complaint before him; I tell my trouble before him.
[3] When my spirit faints within me, you know my way! In the path where I walk they have hidden a trap for me.
[4] Look to the right and see: there is no one who takes notice of me; no refuge remains to me; no one cares for my soul.
[5] I cry to you, O Lord; I say, "You are my refuge, my portion in the land of the living."
[6] Attend to my cry, for I am brought very low! Deliver me from my pursuers, for they are too strong for me!
[7] Bring me out of prison, that I may give thanks to your name! The righteous will surround me, for you will deal bountifully with me.`,
    linkages: [
      {
        id: "cave-isolation",
        historySnippet: "escaped to the cave of Adullam",
        poeticSnippet: "When my spirit faints within me, you know my way! In the path where I walk they have hidden a trap",
        explanation: "The physical isolation of hiding in the dark cave is voiced as a sensory state of being trapped and fainting."
      },
      {
        id: "cave-no-refuge",
        historySnippet: "David departed from there and escaped to the cave",
        poeticSnippet: "no refuge remains to me; no one cares for my soul. I say, 'You are my refuge'",
        explanation: "Fleeing into the cave, David realizes that earth has no safe houses left; only Yahweh Himself can be his refuge."
      },
      {
        id: "cave-righteous-surround",
        historySnippet: "everyone who was in distress... gathered to him. And he became commander over them",
        poeticSnippet: "Bring me out of prison... The righteous will surround me, for you will deal bountifully with me",
        explanation: "The gathering of the distressed four hundred outcasts surrounding David acts as the direct answer to the Psalm's cry for a supportive community."
      }
    ]
  },
  17: {
    day: 17,
    historyRef: "1 Samuel 24:1-7",
    historyText: `[1] When Saul returned from following the Philistines, he was told, "Behold, David is in the wilderness of En-gedi."
[2] Then Saul took three thousand chosen men out of all Israel and went to seek David and his men in front of the Wildgoats' Rocks.
[3] And he came to the sheepfolds by the way, where there was a cave, and Saul went in to relieve himself. Now David and his men were sitting in the innermost parts of the cave.
[4] And the men of David said to him, "Here is the day of which the Lord said to you, 'Behold, I will give your enemy into your hand, and you shall do to him as it shall seem good to you.'" Then David arose and stealthily cut off a corner of Saul's robe.
[5] And afterward David's heart struck him, because he had cut off a corner of Saul's robe.
[6] He said to his men, "The Lord forbid that I should do this thing to my lord, the Lord's anointed, to put out my hand against him, seeing he is the Lord's anointed."
[7] So David persuaded his men with these words and did not permit them to attack Saul. And Saul rose up and left the cave and went on his way.`,
    poeticRef: "Psalm 57",
    poeticText: `[1] Be merciful to me, O God, be merciful to me, for in you my soul takes refuge; in the shadow of your wings I will take refuge, till the storms of destruction pass by.
[2] I cry to God Most High, to God who fulfills his purpose for me.
[3] He will send from heaven and save me; he will put to shame him who tramples on me. God will send out his steadfast love and his faithfulness!
[4] My soul is in the midst of lions; I lie down amid fiery beasts— the children of man, whose teeth are spears and arrows, whose tongues are sharp swords.
[5] Be exalted, O God, above the heavens! Let your glory be over all the earth!
[6] They set a net for my steps; my soul was bowed down. They dug a pit in my way, but they have fallen into it themselves.`,
    linkages: [
      {
        id: "engedi-wings",
        historySnippet: "David and his men were sitting in the innermost parts of the cave",
        poeticSnippet: "in the shadow of your wings I will take refuge, till the storms of destruction pass by",
        explanation: "As Saul sits in the mouth of the cave blocking the exit, David sits in the deep inner shadows, equating the cave walls to the protective wings of God."
      },
      {
        id: "engedi-robe-judgment",
        historySnippet: "arose and stealthily cut off a corner of Saul's robe. And afterward David's heart struck him",
        poeticSnippet: "He will send from heaven and save me; he will put to shame him who tramples on me",
        explanation: "David's refusal to harm Saul illustrates his conviction that salvation must come from God in heaven, not through human assassination."
      },
      {
        id: "engedi-trap",
        historySnippet: "Saul went in to relieve himself... where David and his men were sitting",
        poeticSnippet: "They dug a pit in my way, but they have fallen into it themselves",
        explanation: "The pursuer Saul enters the cave searching for David, unwittingly entering a trap where he is completely vulnerable, falling into his own pit."
      }
    ]
  },
  18: {
    day: 18,
    historyRef: "1 Samuel 26:7-12",
    historyText: `[7] So David and Abishai went to the army by night. And there Saul lay sleeping within the trench, with his spear stuck in the ground at his head, and Abner and the people lay around him.
[8] Then Abishai said to David, "God has given your enemy into your hand this day. Now please let me pin him to the earth with one stroke of the spear, and I will not strike him twice."
[9] But David said to Abishai, "Do not destroy him, for who can put out his hand against the Lord's anointed and be guiltless?"
[10] And David said, "As the Lord lives, the Lord will strike him, or his day will come to die, or he will go down into battle and perish.
[11] The Lord forbid that I should put out my hand against the Lord's anointed. But now take the spear that is at his head and the jar of water, and let us go."
[12] So David took the spear and the jar of water from Saul's head, and they went their way. No man saw it or knew it, nor did any awake, for they were all asleep, because a deep sleep from the Lord had fallen upon them.`,
    poeticRef: "Psalm 7",
    poeticText: `[1] O Lord my God, in you do I take refuge; save me from all my pursuers and deliver me,
[2] lest like a lion they tear my soul apart, rending it in pieces, with none to deliver.
[3] O Lord my God, if I have done this, if there is wrong in my hands,
[4] if I have repaid my friend with evil or plundered my enemy without cause,
[5] let the enemy pursue my soul and overtake it, and let him trample my life to the earth and lay my glory in the dust.
[6] Arise, O Lord, in your anger; lift yourself up against the fury of my enemies; awake for me; you have appointed a judgment.
[7] Let the assembly of the peoples be gathered about you; over it return on high.
[8] The Lord judges the peoples; judge me, O Lord, according to my righteousness and according to the integrity that is in me.`,
    linkages: [
      {
        id: "midnight-refuge",
        historySnippet: "Saul lay sleeping within the trench, with his spear stuck in the ground",
        poeticSnippet: "O Lord my God, in you do I take refuge; save me from all my pursuers and deliver me",
        explanation: "Entering the enemy camp at night, David relies on Yahweh for protection rather than preemptive murder."
      },
      {
        id: "midnight-integrity",
        historySnippet: "Do not destroy him, for who can put out his hand... and be guiltless?",
        poeticSnippet: "if there is wrong in my hands, if I have repaid my friend with evil... let the enemy pursue my soul",
        explanation: "David's refusal to slay Saul is reflected in his poetic challenge: if his hands are stained with bad blood, he invites his own defeat."
      },
      {
        id: "midnight-judgment",
        historySnippet: "As the Lord lives, the Lord will strike him, or his day will come to die",
        poeticSnippet: "Arise, O Lord... awake for me; you have appointed a judgment. The Lord judges the peoples",
        explanation: "David trusts God's dynamic judgment and timing over Saul, refusing to seize the throne by his own hand."
      }
    ]
  },
  19: {
    day: 19,
    historyRef: "2 Samuel 7:1-17 (Nathan's Oracle)",
    historyText: `[1] Now when the king lived in his house and the Lord had given him rest from all his surrounding enemies,
[2] the king said to Nathan the prophet, "See now, I dwell in a house of cedar, but the ark of God dwells in a tent."
[3] And Nathan said to the king, "Go, do all that is in your heart, for the Lord is with you."
[4] But that same night the word of the Lord came to Nathan,
[5] "Go and tell my servant David, 'Thus says the Lord: Would you build me a house to dwell in? ...
[11] Moreover, the Lord declares to you that the Lord will make you a house.
[12] When your days are fulfilled and you lie down with your fathers, I will raise up your offspring after you, who shall come from your body, and I will establish his kingdom.
[13] He shall build a house for my name, and I will establish the throne of his kingdom forever.
[16] And your house and your kingdom shall be made sure forever before me. Your throne shall be established forever.'"`,
    poeticRef: "2 Samuel 7:18-29 (David's Prayer)",
    poeticText: `[18] Then King David went in and sat before the Lord and said, "Who am I, O Lord God, and what is my house, that you have brought me thus far?
[19] And yet this was a small thing in your eyes, O Lord God. You have spoken also of your servant's house for a great while to come, and this is instruction for mankind, O Lord God!
[20] And what more can David say to you? For you know your servant, O Lord God!
[21] Because of your promise, and according to your own heart, you have carried out all this greatness, to make your servant know it.
[22] Therefore you are great, O Lord God. For there is none like you, and there is no God besides you...
[28] And now, O Lord God, you are God, and your words are true, and you have promised this good thing to your servant.
[29] Now therefore let it please you to bless the house of your servant, so that it may continue forever before you; for you, O Lord God, have spoken, and with your blessing shall the house of your servant be blessed forever."`,
    linkages: [
      {
        id: "covenant-house",
        historySnippet: "Would you build me a house to dwell in? ... the Lord will make you a house",
        poeticSnippet: "Who am I, O Lord God, and what is my house, that you have brought me thus far?",
        explanation: "God reverses David's offer: instead of David building a temple, God will build David an eternal family dynasty."
      },
      {
        id: "covenant-forever",
        historySnippet: "establish the throne of his kingdom forever... established forever",
        poeticSnippet: "let it please you to bless the house of your servant, so that it may continue forever",
        explanation: "David immediately anchors his prayer in the eternal timeline of the divine promise, asking God to bless what He has decreed forever."
      }
    ]
  },
  21: {
    day: 21,
    historyRef: "2 Samuel 12:1-15 (The Confrontation)",
    historyText: `[1] And the Lord sent Nathan to David. He came to him and said to him, "There were two men in a certain city, the one rich and the other poor...
[4] Now there came a traveler to the rich man, and he was unwilling to take one of his own flock... but he took the poor man's lamb and prepared it for the man...
[5] Then David's anger was greatly kindled against the man, and he said to Nathan, "As the Lord lives, the man who has done this deserves to die..."
[7] Nathan said to David, "You are the man! Thus says the Lord, the God of Israel: 'I anointed you king over Israel...
[9] Why have you despised the word of the Lord, to do what is evil in his sight? You have struck down Uriah the Hittite with the sword...
[13] David said to Nathan, "I have sinned against the Lord." And Nathan said to David, "The Lord also has put away your sin; you shall not die."`,
    poeticRef: "Psalm 51:1-12 (Repentance)",
    poeticText: `[1] Have mercy on me, O God, according to your steadfast love; according to your abundant mercy blot out my transgressions.
[2] Wash me thoroughly from my iniquity, and cleanse me from my sin!
[3] For I know my transgressions, and my sin is ever before me.
[4] Against you, you only, have I sinned and done what is evil in your sight, so that you may be justified in your words and blameless in your judgment.
[5] Behold, I was brought forth in iniquity, and in sin did my mother conceive me.
[6] Behold, you delight in truth in the inward being, and you teach me wisdom in the secret heart.
[7] Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow.
[9] Hide your face from my sins, and blot out all my iniquities.
[10] Create in me a clean heart, O God, and renew a right spirit within me.
[11] Cast me not away from your presence, and take not your Holy Spirit from me.
[12] Restore to me the joy of your salvation, and uphold me with a willing spirit.`,
    linkages: [
      {
        id: "repentance-confession",
        historySnippet: "David said to Nathan, 'I have sinned against the Lord.'",
        poeticSnippet: "For I know my transgressions, and my sin is ever before me. Against you, you only, have I sinned",
        explanation: "Nathan's accusation triggers an immediate, unreserved confession of guilt, acknowledging that sin is ultimately against the Creator."
      },
      {
        id: "repentance-cleanse",
        historySnippet: "The Lord also has put away your sin; you shall not die.",
        poeticSnippet: "Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow",
        explanation: "In response to Nathan's declaration of forgiveness, David prays for internal purgation and deep, ritualistic washing."
      },
      {
        id: "repentance-presence",
        historySnippet: "despised the word of the Lord, to do what is evil in his sight",
        poeticSnippet: "Cast me not away from your presence, and take not your Holy Spirit from me",
        explanation: "David pleads that the consequence of his dark acts will not include exile from the Holy Spirit and the presence of God."
      }
    ]
  }
};
