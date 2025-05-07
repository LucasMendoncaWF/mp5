import { NextResponse, type NextRequest } from 'next/server';

function getLocaleFromCookie(request: NextRequest) {
  const cookie = request.cookies.get('NEXT_LOCALE');
  return cookie ? cookie.value : 'en';
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const initialTheme = request.cookies.get('theme')?.value;
  let theme = 'light';
  if (initialTheme === 'dark') {
    theme = 'dark';
  }
  response.headers.set('x-theme', theme);

  const locale = getLocaleFromCookie(request) || 'en';
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: ['/((?!api|trpc|netlify|_next|_vercel|.*\\..*).*)'],
};
