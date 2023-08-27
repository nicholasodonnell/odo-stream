import { NextRequest, NextResponse } from 'next/server'

import { setGlobalHeaders } from './actions/setGlobalHeaders'
import { setStreamToken } from './actions/setStreamToken'

function isHomepage(pathname: string): boolean {
  return pathname === '/'
}

export async function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const pathname = request.nextUrl.pathname
  const response: NextResponse = NextResponse.next()

  setGlobalHeaders(response, { origin: url.origin })

  if (isHomepage(pathname)) {
    await setStreamToken(response)
  }

  return response
}
