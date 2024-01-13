import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

import { STREAM_TOKEN_COOKIE_NAME } from '../constants'
import { sign } from '../lib/jwt'

const ONE_DAY_MS = 1000 * 60 * 60 * 24

export async function setStreamToken(
  request: NextRequest,
  response: NextResponse,
): Promise<void> {
  if (request.cookies.get(STREAM_TOKEN_COOKIE_NAME)) {
    return
  }

  const expiration = new Date(Date.now() + ONE_DAY_MS)
  const token = await sign(
    {
      viewerId: uuid(),
    },
    { exp: Math.floor(expiration.getTime() / 1000) },
  )

  response.cookies.set({
    expires: expiration,
    httpOnly: true,
    name: STREAM_TOKEN_COOKIE_NAME,
    path: '/',
    value: token,
  })
}
