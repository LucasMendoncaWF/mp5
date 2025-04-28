import type { VercelResponse } from '@vercel/node';
import axios from 'axios';
import type { NextRequest } from 'next/server';

import { APP_NAME, getBaseUrl } from './api';

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trackId = searchParams.get('trackId');

  if (!trackId || typeof trackId !== 'string') {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: 'missing trackId' }),
    };
  }

  try {
    const streamEndpoint = `/tracks/${trackId}/stream`;
    const baseUrl = await getBaseUrl();
    const rangeHeader = req.headers.get('range') || '';
    const streamUrl = new URL(`${baseUrl}/v1${streamEndpoint}`);
    streamUrl.searchParams.append('app_name', APP_NAME);

    const response = await axios.get(streamUrl.toString(), {
      responseType: 'stream',
      headers: {
        Range: rangeHeader,
      },
    });
    const headers = new Headers();
    headers.set('Content-Type', response.headers['content-type'] || '');
    if (response.headers['content-range']) {
      headers.set('Content-Range', response.headers['content-range']);
    }
    if (response.headers['accept-ranges']) {
      headers.set('Accept-Ranges', response.headers['accept-ranges']);
    }

    return new Response(response.data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error }),
    };
  }
}
