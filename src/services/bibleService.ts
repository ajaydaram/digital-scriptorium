'use client';

export interface Scripture {
  reference: string;
  text: string;
  version: string;
  translation_name?: string;
}

export const SUPPORTED_VERSIONS = [
  { id: 'de4e12af7f28f599-02', name: 'King James Version', code: 'kjv' },
  { id: '06125ad3d1d57585-01', name: 'American Standard Version', code: 'asv' },
  { id: '9879dbb7aec41528-01', name: 'World English Bible', code: 'web' },
  { id: 'bba730b9171fcc22-01', name: 'Bible in Basic English', code: 'bbe' },
  { id: '41926a4aa3831714-01', name: 'Young\'s Literal Translation', code: 'ylt' },
];

const BOOK_MAP: Record<string, string> = {
  'genesis': 'GEN', 'gen': 'GEN',
  'exodus': 'EXO', 'exo': 'EXO',
  'leviticus': 'LEV', 'lev': 'LEV',
  'numbers': 'NUM', 'num': 'NUM',
  'deuteronomy': 'DEU', 'deu': 'DEU',
  'joshua': 'JOS', 'jos': 'JOS',
  'judges': 'JDG', 'jdg': 'JDG',
  'ruth': 'RUT', 'rut': 'RUT',
  '1 samuel': '1SA', '1sam': '1SA',
  '2 samuel': '2SA', '2sam': '2SA',
  '1 kings': '1KI', '1kin': '1KI',
  '2 kings': '2KI', '2kin': '2KI',
  '1 chronicles': '1CH', '1chr': '1CH',
  '2 chronicles': '2CH', '2chr': '2CH',
  'ezra': 'EZR', 'ezr': 'EZR',
  'nehemiah': 'NEH', 'neh': 'NEH',
  'esther': 'EST', 'est': 'EST',
  'job': 'JOB',
  'psalms': 'PSA', 'psalm': 'PSA', 'ps': 'PSA',
  'proverbs': 'PRO', 'pro': 'PRO',
  'ecclesiastes': 'ECC', 'ecc': 'ECC',
  'song of solomon': 'SNG', 'song': 'SNG',
  'isaiah': 'ISA', 'isa': 'ISA',
  'jeremiah': 'JER', 'jer': 'JER',
  'lamentations': 'LAM', 'lam': 'LAM',
  'ezekiel': 'EZE', 'eze': 'EZE',
  'daniel': 'DAN', 'dan': 'DAN',
  'hosea': 'HOS', 'hos': 'HOS',
  'joel': 'JOE', 'joe': 'JOE',
  'amos': 'AMO', 'amo': 'AMO',
  'obadiah': 'OBA', 'oba': 'OBA',
  'jonah': 'JON', 'jon': 'JON',
  'micah': 'MIC', 'mic': 'MIC',
  'nahum': 'NAH', 'nah': 'NAH',
  'habakkuk': 'HAB', 'hab': 'HAB',
  'zephaniah': 'ZEP', 'zep': 'ZEP',
  'haggai': 'HAG', 'hag': 'HAG',
  'zechariah': 'ZEC', 'zec': 'ZEC',
  'malachi': 'MAL', 'mal': 'MAL',
  'matthew': 'MAT', 'mat': 'MAT',
  'mark': 'MRK', 'mrk': 'MRK',
  'luke': 'LUK', 'luk': 'LUK',
  'john': 'JHN', 'jhn': 'JHN',
  'acts': 'ACT', 'act': 'ACT',
  'romans': 'ROM', 'rom': 'ROM',
  '1 corinthians': '1CO', '1cor': '1CO',
  '2 corinthians': '2CO', '2cor': '2CO',
  'galatians': 'GAL', 'gal': 'GAL',
  'ephesians': 'EPH', 'eph': 'EPH',
  'philippians': 'PHP', 'php': 'PHP',
  'colossians': 'COL', 'col': 'COL',
  '1 thessalonians': '1TH', '1thes': '1TH',
  '2 thessalonians': '2TH', '2thes': '2TH',
  '1 timothy': '1TI', '1tim': '1TI',
  '2 timothy': '2TI', '2tim': '2TI',
  'titus': 'TIT', 'tit': 'TIT',
  'philemon': 'PHM', 'phm': 'PHM',
  'hebrews': 'HEB', 'heb': 'HEB',
  'james': 'JAS', 'jas': 'JAS',
  '1 peter': '1PE', '1pet': '1PE',
  '2 peter': '2PE', '2pet': '2PE',
  '1 john': '1JO', '1jhn': '1JO',
  '2 john': '2JO', '2jhn': '2JO',
  '3 john': '3JO', '3jhn': '3JO',
  'jude': 'JUD', 'jud': 'JUD',
  'revelation': 'REV', 'rev': 'REV'
};

function normalizeForABS(reference: string): string {
  // Handle complex references like "Genesis 1:26-31; 2:15-17"
  const normalized = reference.toLowerCase().trim();
  
  // Try simple single range first
  const simpleRegex = /^(\d?\s?[a-z]+)\s?(\d+)?(?::(\d+))?(-(\d+))?$/;
  const match = normalized.match(simpleRegex);
  
  if (match) {
    const bookName = match[1].trim();
    const chapter = match[2] || '1';
    const verse = match[3];
    const endVerse = match[5];
    const bookId = BOOK_MAP[bookName] || bookName.toUpperCase().substring(0, 3);
    let passageId = `${bookId}.${chapter}`;
    if (verse) {
      passageId += `.${verse}`;
      if (endVerse) passageId += `-${bookId}.${chapter}.${endVerse}`;
    }
    return passageId;
  }

  // For complex multiline/multirange references, we clean and pass a best-effort string
  // ABS actually prefers dot notation, but for fallbacks we need the original.
  const bookMatch = normalized.match(/^[0-9]*\s*[a-z]+/);
  const bookName = bookMatch ? bookMatch[0] : '';
  const bookId = BOOK_MAP[bookName] || bookName.toUpperCase().substring(0, 3);
  
  // Take just the first range for the ABS passageId to avoid 400s
  const firstChapter = normalized.match(/\d+/)?.[0] || '1';
  return `${bookId}.${firstChapter}`;
}

import { getLocalStepBiblePassage, STEPBIBLE_DB } from "@/lib/stepbible-database";

export async function getScripture(reference: string, versionId: string): Promise<Scripture> {
  const cleanRef = reference.replace(/\s+/g, ' ').trim();
  const hasPreCoded = !!(STEPBIBLE_DB[cleanRef] || Object.keys(STEPBIBLE_DB).find(k => k.startsWith(cleanRef) || cleanRef.startsWith(k)));

  if (hasPreCoded) {
    try {
      const passage = getLocalStepBiblePassage(reference);
      if (passage && passage.verses && passage.verses.length > 0) {
        const textHtml = passage.verses
          .map(v => {
            const transText = v.translations[versionId] || v.translations["9879dbb7aec41528-01"] || "";
            return `<sup>${v.verseNumber}</sup>${transText}`;
          })
          .join(" ");
        return {
          reference: passage.reference,
          text: textHtml,
          version: versionId,
          translation_name: SUPPORTED_VERSIONS.find(sv => sv.id === versionId)?.name || versionId
        };
      }
    } catch (dbErr) {
      console.warn("Offline database fetch failed, trying API:", dbErr);
    }
  }

  // Fallback to fetch from API
  try {
    const passageId = normalizeForABS(reference);
    const response = await fetch(`/api/bible?versionId=${versionId}&passageId=${passageId}&originalRef=${encodeURIComponent(reference)}`);

    if (response.ok) {
      const json = await response.json();
      if (json.data && json.data.content) {
        return {
          reference: json.data.reference,
          text: json.data.content,
          version: versionId,
          translation_name: json.data.bibleId
        };
      }
      if (json.text && json.reference) {
        return {
          reference: json.reference,
          text: json.text,
          version: versionId,
          translation_name: json.translation_name
        };
      }
    }
  } catch (apiErr) {
    console.warn("API fetch failed, falling back to local database generation:", apiErr);
  }

  // Ultimate fallback to local database generator
  const passage = getLocalStepBiblePassage(reference);
  const textHtml = passage.verses
    .map(v => {
      const transText = v.translations[versionId] || v.translations["9879dbb7aec41528-01"] || "";
      return `<sup>${v.verseNumber}</sup>${transText}`;
    })
    .join(" ");
  return {
    reference: passage.reference,
    text: textHtml,
    version: versionId,
    translation_name: SUPPORTED_VERSIONS.find(sv => sv.id === versionId)?.name || versionId
  };
}
