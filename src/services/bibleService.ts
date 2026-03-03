/**
 * @fileOverview Bible Service for fetching scripture passages.
 * Currently using mock data, but structured for easy integration with API.Bible or similar services.
 */

export interface Scripture {
  reference: string;
  text: string;
  version: string;
  bookName?: string;
  chapter?: number;
}

const MOCK_DATA: Record<string, string> = {
  "John 3:16": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  "Psalm 23:1": "The LORD is my shepherd; I shall not want.",
  "Genesis 1:1": "In the beginning God created the heaven and the earth.",
  "Matthew 5:3": "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
  "Romans 8:28": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
};

/**
 * Fetches a scripture passage by reference.
 * Structuring this with an async pattern to accommodate future Axios/Fetch calls.
 */
export async function getScripture(reference: string, version: string = "KJV"): Promise<Scripture> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Placeholder for future API implementation:
  // const response = await axios.get(`https://api.scripture.api.bible/v1/bibles/${bibleId}/passages/${passageId}`, { headers });
  
  const text = MOCK_DATA[reference];

  if (!text) {
    throw new Error(`Scripture reference "${reference}" not found in mock database.`);
  }

  return {
    reference,
    text,
    version
  };
}
