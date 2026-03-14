import { NextRequest, NextResponse } from 'next/server';

const ABS_API_KEY = '84SOJ2EX4_yjdudFzoEDs';
const ABS_BASE_URL = 'https://api.scripture.api.bible/v1';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const versionId = searchParams.get('versionId');
  const passageId = searchParams.get('passageId');
  const originalRef = searchParams.get('originalRef');

  if (!versionId || !passageId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Helper to try Bible-API.com (Our primary fallback)
  const tryFallback = async (query: string) => {
    // bible-api.com prefers commas over semicolons for multiple ranges
    const cleanQuery = query.replace(/;/g, ',');
    const fallbackUrl = `https://bible-api.com/${encodeURIComponent(cleanQuery)}`;
    try {
      const fallbackResponse = await fetch(fallbackUrl);
      if (fallbackResponse.ok) {
        return await fallbackResponse.json();
      }
    } catch (e) {
      console.error('Fallback fetch failed:', e);
    }
    return null;
  };

  try {
    // Attempt 1: Official API.Bible (American Bible Society)
    const url = `${ABS_BASE_URL}/bibles/${versionId}/passages/${passageId}?content-type=text&include-verse-numbers=true`;
    const response = await fetch(url, {
      headers: {
        'api-key': ABS_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    // Attempt 2: If ABS returns 401 or any error, immediately try the fallback
    console.warn(`API.Bible returned ${response.status}. Attempting fallback for "${originalRef || passageId}"`);
    
    const fallbackData = await tryFallback(originalRef || passageId.replace(/\./g, ' '));
    if (fallbackData) {
      return NextResponse.json(fallbackData);
    }

    throw new Error(`Both APIs failed. (ABS Status: ${response.status})`);

  } catch (error: any) {
    console.error('Scripture Proxy Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
