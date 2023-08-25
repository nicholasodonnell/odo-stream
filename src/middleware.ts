import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const response: NextResponse = NextResponse.next()

  // CORS
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Origin', requestUrl.origin)
  response.headers.set('Access-Control-Allow-Methods', 'GET')

  // Cache
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')

  return response
}

export const config = {
  matcher: ['/live.m3u8', '/live.stream-(.*).ts'],
}
