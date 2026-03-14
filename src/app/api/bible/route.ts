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

    // Attempt 2: Fallback to Bible-API.com if ABS fails (401, 404, etc)
    // We use the original human-readable reference for better success rate on bible-api.com
    // bible-api.com is an open service and doesn't require a 401-vulnerable key.
    const queryRef = originalRef || passageId.replace(/\./g, ' ');
    console.warn(`API.Bible failed (Status: ${response.status}). Attempting fallback to Bible-API.com for "${queryRef}".`);
    
    const fallbackUrl = `https://bible-api.com/${encodeURIComponent(queryRef)}`;
    const fallbackResponse = await fetch(fallbackUrl);
    
    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      return NextResponse.json(fallbackData);
    }

    throw new Error(`Primary and fallback APIs failed. (ABS Status: ${response.status}, Fallback Status: ${fallbackResponse.status})`);

  } catch (error: any) {
    console.error('Scripture Retrieval Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
