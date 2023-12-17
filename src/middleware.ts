import { NextRequest, NextResponse } from 'next/server'

import { setGlobalHeaders } from './actions/setGlobalHeaders'
import { setStreamToken } from './actions/setStreamToken'

function isHomepage(pathname: string): boolean {
  return pathname === '/'
}

export async function middleware(request: NextRequest) {
  const url: URL = new URL(request.nextUrl)
  const response: NextResponse = NextResponse.next()

  setGlobalHeaders(response, { origin: url.origin })

  if (isHomepage(url.pathname)) {
    await setStreamToken(request, response)
  }

  return response
}
