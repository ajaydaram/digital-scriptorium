
/**
 * @fileOverview Bible Service for fetching scripture passages from the official API.Bible (American Bible Society).
 * 
 * This service uses the provided API key to access high-quality biblical content.
 * It maps common translation codes to specific API.Bible IDs.
 */

export interface Scripture {
  reference: string;
  text: string;
  version: string;
  translation_name?: string;
  content_html?: string;
}

// Map common identifiers to API.Bible internal IDs
export const SUPPORTED_VERSIONS = [
  { id: 'de4e12af7f28f599-02', name: 'King James Version', code: 'kjv' },
  { id: '06125ad3d1d57585-01', name: 'American Standard Version', code: 'asv' },
  { id: '9879dbb7aec41528-01', name: 'World English Bible', code: 'web' },
  { id: 'bba730b9171fcc22-01', name: 'Bible in Basic English', code: 'bbe' },
  { id: '41926a4aa3831714-01', name: 'Young\'s Literal Translation', code: 'ylt' },
];

/**
 * Normalizes a human-readable reference into an API.Bible passage ID.
 * Example: "John 3:16" -> "JHN.3.16"
 * This is a simplified mapper; complex ranges might require the Search API.
 */
function normalizeReferenceForApi(reference: string): string {
  // Simple mapping for demonstration of common books
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
  const chapter = parts[2];
  const verse = parts[3];
  const endVerse = parts[5];

  const bookId = bookMap[bookName] || bookName.toUpperCase().substring(0, 3);
  let passageId = `${bookId}.${chapter}`;
  if (verse) passageId += `.${verse}`;
  if (endVerse) passageId += `-${endVerse}`;

  return passageId;
}

/**
 * Fetches a scripture passage by reference using the API.Bible service.
 */
export async function getScripture(reference: string, versionIdOrCode: string = "kjv"): Promise<Scripture> {
  const apiKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY || '84SOJ2EX4_yjdudFzoEDs';
  const baseUrl = process.env.NEXT_PUBLIC_BIBLE_API_URL || 'https://api.scripture.api.bible/v1';
  
  // Find internal ID if a code (like 'kjv') was passed
  const version = SUPPORTED_VERSIONS.find(v => v.code === versionIdOrCode || v.id === versionIdOrCode) || SUPPORTED_VERSIONS[0];
  const bibleId = version.id;
  const passageId = normalizeReferenceForApi(reference);

  const url = `${baseUrl}/bibles/${bibleId}/passages/${passageId}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`;

  try {
    const response = await fetch(url, {
      headers: {
        'api-key': apiKey,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // Fallback to search if direct passage retrieval fails (sometimes IDs differ)
      return searchScriptureFallback(reference, bibleId, apiKey, baseUrl);
    }

    const json = await response.json();
    const data = json.data;
    
    return {
      reference: data.reference,
      text: data.content,
      version: version.name,
      translation_name: version.name
    };
  } catch (error) {
    console.error("API.Bible Service Error:", error);
    throw error;
  }
}

/** Fallback to search API if exact passage ID is tricky */
async function searchScriptureFallback(query: string, bibleId: string, apiKey: string, baseUrl: string): Promise<Scripture> {
  const url = `${baseUrl}/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: { 'api-key': apiKey, 'Accept': 'application/json' }
  });
  
  if (!response.ok) throw new Error("Scripture not found.");
  
  const json = await response.json();
  const results = json.data.verses;
  
  if (!results || results.length === 0) throw new Error("No results found.");

  // Combine multiple verses if it's a range
  const text = results.map((v: any) => v.text).join(' ');
  const reference = results.length > 1 
    ? `${results[0].reference}-${results[results.length-1].verseId.split('.').pop()}`
    : results[0].reference;

  return {
    reference,
    text,
    version: bibleId,
    translation_name: "Search Result"
  };
}
