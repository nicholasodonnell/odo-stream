import { PHASE_PRODUCTION_BUILD } from 'next/constants'

import { NEXT_PHASE, RS_URL } from '../constants'

export async function getStreamOnline(): Promise<boolean> {
  // skip during production build - restreamer is not guaranteed to be ready during build
  if (NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return false
  }

  try {
    const res: Response = await fetch(`${RS_URL}/v1/states`)
    const data = await res.json()

    return data?.repeat_to_local_nginx?.type === 'connected'
  } catch (e: any) {
    throw new Error(`Failed to fetch stream state: ${e.message}`, {
      cause: e,
    })
  }
}
