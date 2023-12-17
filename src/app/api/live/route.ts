import HttpError from 'http-errors'
import { NextRequest, NextResponse } from 'next/server'

import { RS_URL } from '../../../constants'
import { verify } from '../../../lib/jwt'
import * as logger from '../../../lib/logger'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request: NextRequest): Promise<Response> {
  const url: URL = new URL(request.nextUrl)
  const ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for') ||
    request.ip
  const userAgent = request.headers.get('user-agent')

  const token: string | null = url.searchParams.get('token')
  const claims = token ? await verify(token) : undefined

  const meta = {
    geo: request.geo?.city as string,
    ip: ip as string,
    userAgent: userAgent as string,
    viewerId: claims?.viewerId as string,
  }

  logger.info('Live request', meta)

  try {
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
    const error = new Error(`Failed to fetch stream: ${e.message}`, {
      cause: e,
    })

    logger.error(`Live error: ${error.message}`, meta)

    return new NextResponse(error.message)
  }
}
