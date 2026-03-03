/**
 * @fileOverview Bible Service for fetching scripture passages from a real API.
 * Uses bible-api.com (public, no-key) as a robust starting point, 
 * structured to be easily swapped for API.Bible.
 */

export interface Scripture {
  reference: string;
  text: string;
  version: string;
  translation_name?: string;
  verses?: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
}

export const SUPPORTED_VERSIONS = [
  { id: 'kjv', name: 'King James Version' },
  { id: 'asv', name: 'American Standard Version' },
  { id: 'web', name: 'World English Bible' },
  { id: 'bbe', name: 'Basic English Bible' },
  { id: 'ylt', name: 'Young\'s Literal Translation' },
];

/**
 * Fetches a scripture passage by reference using the bible-api.com service.
 */
export async function getScripture(reference: string, version: string = "kjv"): Promise<Scripture> {
  // Normalize reference for API (e.g. "John 3:16" -> "john+3:16")
  const query = encodeURIComponent(reference.toLowerCase().trim());
  const url = `https://bible-api.com/${query}?translation=${version}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Passage "${reference}" not found.`);
    }

    const data = await response.json();
    
    return {
      reference: data.reference,
      text: data.text,
      version: version.toUpperCase(),
      translation_name: data.translation_name,
      verses: data.verses
    };
  } catch (error) {
    console.error("Bible Service Error:", error);
    throw error;
  }
}
