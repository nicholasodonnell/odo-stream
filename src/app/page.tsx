import { PHASE_PRODUCTION_BUILD } from 'next/constants'

import { Header } from '../components/header'
import { Logo } from '../components/logo'
import { Main } from '../components/main'
import { Offline } from '../components/offline'
import { Player } from '../components/player'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

async function getOnline() {
  // skip during production build - restreamer is not guaranteed to be ready during build
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return false
  }

  try {
    const res: Response = await fetch(`${process.env.RS_URL}/v1/states`)
    const data = await res.json()

    return data?.repeat_to_local_nginx?.type !== 'disconnected'
  } catch (e: any) {
    throw new Error(`Failed to fetch stream state: ${e.message}`, {
      cause: e,
    })
  }
}

export default async function Page() {
  const online = await getOnline()

  return (
    <>
      <Header className="items-center justify-center px-4 py-6">
        <Logo className="w-3/4 max-w-sm" />
      </Header>
      <Main className="relative items-center justify-center overflow-hidden">
        {online ? (
          <Player className="absolute h-full" src="/live.m3u8" />
        ) : (
          <Offline className="flex flex-1 flex-col items-center justify-center" />
        )}
      </Main>
    </>
  )
}
