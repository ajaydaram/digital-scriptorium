
import { NextRequest, NextResponse } from 'next/server';

const ABS_API_KEY = '84SOJ2EX4_yjdudFzoEDs';
const ABS_BASE_URL = 'https://api.scripture.api.bible/v1';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const versionId = searchParams.get('versionId');
  const passageId = searchParams.get('passageId');

  if (!versionId || !passageId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const url = `${ABS_BASE_URL}/bibles/${versionId}/passages/${passageId}?content-type=text&include-verse-numbers=true`;
    const response = await fetch(url, {
      headers: {
        'api-key': ABS_API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API.Bible Error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
