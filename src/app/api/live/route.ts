import HttpError from 'http-errors'
import { NextRequest, NextResponse } from 'next/server'

import { RS_URL } from '../../../constants'
import * as logger from '../../../lib/logger'
import { type Claims, decodeStreamToken } from '../../../lib/token'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request: NextRequest): Promise<Response> {
  const url: URL = new URL(request.nextUrl)

  const token: null | string = url.searchParams.get('token')
  const claims: Claims | null = await decodeStreamToken(token)

  const meta = {
    ip: getIp(request),
    userAgent: request.headers.get('user-agent') ?? '',
    viewerId: claims?.viewerId ?? 'unknown',
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

function getIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for')

  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim()
  }

  const xRealIp = request.headers.get('x-real-ip')

  return xRealIp || 'unknown'
}
