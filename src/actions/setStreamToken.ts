import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

import { STREAM_TOKEN_COOKIE_NAME } from '../constants'
import { sign } from '../lib/jwt'

export async function setStreamToken(response: NextResponse): Promise<void> {
  const token = await sign({
    viewerId: uuid(),
  })

  response.cookies.set({
    httpOnly: true,
    name: STREAM_TOKEN_COOKIE_NAME,
    path: '/',
    value: token,
  })
}
