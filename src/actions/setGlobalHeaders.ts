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
}
