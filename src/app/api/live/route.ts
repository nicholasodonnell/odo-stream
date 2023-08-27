import HttpError from 'http-errors'
import { NextRequest, NextResponse } from 'next/server'

import { RS_URL, STREAM_TOKEN_COOKIE_NAME } from '../../../constants'
import { verify } from '../../../lib/jwt'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const token = request.cookies.get(STREAM_TOKEN_COOKIE_NAME)
    const claims = token ? await verify(token.value) : undefined

    if (!claims) {
      throw HttpError.Unauthorized('Invalid token')
    }

    const response: Response = await fetch(`${RS_URL}/hls/live.stream.m3u8`)

    return new NextResponse(response.body, {
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') ||
          'application/vnd.apple.mpegurl',
      },
    })
  } catch (e: any) {
    const error = new Error(`Failed to fetch playlist: ${e.message}`, {
      cause: e,
    })

    return new NextResponse(error.message)
  }
}
