'use client';
/**
 * @fileOverview Bible Service for fetching scripture passages.
 * 
 * Primary Provider: API.Bible (American Bible Society) - Official Scholarly Content.
 * Fallback Provider: Bible-API.com (Seven1m) - High-availability open-source engine.
 */

export interface Scripture {
  reference: string;
  text: string;
  version: string;
  translation_name?: string;
}

// Official API.Bible (ABS) version IDs
export const SUPPORTED_VERSIONS = [
  { id: 'de4e12af7f28f599-02', name: 'King James Version', code: 'kjv' },
  { id: '06125ad3d1d57585-01', name: 'American Standard Version', code: 'asv' },
  { id: '9879dbb7aec41528-01', name: 'World English Bible', code: 'web' },
  { id: 'bba730b9171fcc22-01', name: 'Bible in Basic English', code: 'bbe' },
  { id: '41926a4aa3831714-01', name: 'Young\'s Literal Translation', code: 'ylt' },
];

const ABS_API_KEY = '84SOJ2EX4_yjdudFzoEDs';
const ABS_BASE_URL = 'https://api.scripture.api.bible/v1';

/**
 * Normalizes a reference for API.Bible (ABS).
 * e.g., "John 3:16" -> "JHN.3.16"
 */
function normalizeForABS(reference: string): string {
  const bookMap: Record<string, string> = {
    'genesis': 'GEN', 'exodus': 'EXO', 'leviticus': 'LEV', 'numbers': 'NUM', 'deuteronomy': 'DEU',
    'joshua': 'JOS', 'judges': 'JDG', 'ruth': 'RUT', '1 samuel': '1SA', '2 samuel': '2SA',
    'psalms': 'PSA', 'psalm': 'PSA', 'proverbs': 'PRO', 'isaiah': 'ISA', 'jeremiah': 'JER',
    'matthew': 'MAT', 'mark': 'MRK', 'luke': 'LUK', 'john': 'JHN', 'acts': 'ACT',
    'romans': 'ROM', '1 corinthians': '1CO', '2 corinthians': '2CO', 'galatians': 'GAL',
    'ephesians': 'EPH', 'philippians': 'PHP', 'colossians': 'COL', '1 thessalonians': '1TH',
    '2 thessalonians': '2TH', '1 timothy': '1TI', '2 timothy': '2TI', 'titus': 'TIT',
    'philemon': 'PHM', 'hebrews': 'HEB', 'james': 'JAS', '1 peter': '1PE', '2 peter': '2PE',
    '1 john': '1JO', '2 john': '2JO', '3 john': '3JO', 'jude': 'JUD', 'revelation': 'REV'
  };

  const parts = reference.toLowerCase().trim().match(/^(\d?\s?[a-z]+)\s?(\d+)?(?::(\d+))?(-(\d+))?$/);
  if (!parts) return reference.toUpperCase().replace(/\s/g, '.');

  const bookName = parts[1];
  const chapter = parts[2] || '1';
  const verse = parts[3];
  
  const bookId = bookMap[bookName] || bookName.toUpperCase().substring(0, 3);
  let passageId = `${bookId}.${chapter}`;
  if (verse) passageId += `.${verse}`;

  return passageId;
}

/**
 * Primary fetch via API.Bible (American Bible Society)
 */
async function fetchFromABS(reference: string, versionId: string): Promise<Scripture> {
  const passageId = normalizeForABS(reference);
  const url = `${ABS_BASE_URL}/bibles/${versionId}/passages/${passageId}?content-type=text&include-verse-numbers=true`;

  const response = await fetch(url, {
    headers: {
      'api-key': ABS_API_KEY,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error(`ABS API Error: ${response.status}`);

  const json = await response.json();
  return {
    reference: json.data.reference,
    text: json.data.content,
    version: versionId,
    translation_name: json.data.bibleId
  };
}

/**
 * Fallback fetch via Bible-API.com (powered by seven1m/bible_api)
 */
async function fetchFromFallback(reference: string): Promise<Scripture> {
  const url = `https://bible-api.com/${encodeURIComponent(reference)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Fallback API failed.");

  const data = await response.json();
  return {
    reference: data.reference,
    text: data.text,
    version: data.translation_id,
    translation_name: data.translation_name
  };
}

/**
 * Orchestrates scripture retrieval with primary and fallback providers.
 */
export async function getScripture(reference: string, versionIdOrCode: string = "kjv"): Promise<Scripture> {
  const version = SUPPORTED_VERSIONS.find(v => v.code === versionIdOrCode || v.id === versionIdOrCode) || SUPPORTED_VERSIONS[0];
  
  try {
    // Attempt ABS (American Bible Society) first
    return await fetchFromABS(reference, version.id);
  } catch (absError) {
    console.warn("API.Bible primary fetch failed, attempting fallback to bible-api.com:", absError);
    try {
      // Fallback to Bible-API.com (Seven1m)
      return await fetchFromFallback(reference);
    } catch (fallbackError) {
      console.error("All Bible API providers failed:", fallbackError);
      throw new Error("Could not retrieve scripture from any provider.");
    }
  }
}
