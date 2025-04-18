import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request); // trata localização

  const theme = request.cookies.get('theme')?.value === 'dark' ? 'dark' : 'light';
  response.headers.set('x-theme', theme); // adiciona info do tema

  return response;
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};