import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export async function GET(request: NextRequest): Promise<Response> {
  const requestUrl = new URL(request.url)

  try {
    const response: Response = await fetch(
      `${process.env.RS_URL}/hls${requestUrl.pathname}`,
    )

    return new NextResponse(response.body)
  } catch (e: any) {
    throw new Error(`Failed to fetch segment: ${e.message}`, {
      cause: e,
    })
  }
}
