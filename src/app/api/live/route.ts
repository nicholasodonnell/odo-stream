import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export async function GET(): Promise<Response> {
  try {
    const response: Response = await fetch(
      `${process.env.RS_URL}/hls/live.stream.m3u8`,
    )

    // return response
    return new NextResponse(response.body)
  } catch (e: any) {
    throw new Error(`Failed to fetch playlist: ${e.message}`, {
      cause: e,
    })
  }
}
