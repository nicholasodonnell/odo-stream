import { NextRequest, NextResponse } from 'next/server'

import { RS_URL } from '../../../constants'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

export async function GET(request: NextRequest): Promise<Response> {
  const requestUrl = new URL(request.url)

  try {
    const response: Response = await fetch(
      `${RS_URL}/hls${requestUrl.pathname}`,
    )

    return new NextResponse(response.body, {
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') || 'application/octet-stream',
      },
    })
  } catch (e: any) {
    const error = new Error(`Failed to fetch segment: ${e.message}`, {
      cause: e,
    })

    return new NextResponse(error.message)
  }
}
