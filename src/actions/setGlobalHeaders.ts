import { NextResponse } from 'next/server'

export function setGlobalHeaders(
  response: NextResponse,
  params: { origin: string },
) {
  // CORS
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Origin', params.origin)
  response.headers.set('Access-Control-Allow-Methods', 'GET')

  // Cache
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')

  // Content Security Policy
  response.headers.set('Content-Security-Policy', 'self')

  // X-Content-Type-Options
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Referrer Policy
  response.headers.set('Referrer-Policy', 'no-referrer')

  // Strict-Transport-Security
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; preload')

  // X-Frame-Options
  response.headers.set('X-Frame-Options', 'DENY')

  // Cross-Origin-Embedder-Policy and Cross-Origin-Opener-Policy
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
}
