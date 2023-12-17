import { getStreamOnline } from '../actions/getStreamOnline'
import { getStreamToken } from '../actions/getStreamToken'
import { Header } from '../components/header'
import { Logo } from '../components/logo'
import { Main } from '../components/main'
import { Offline } from '../components/offline'
import { Player } from '../components/player'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function Page() {
  const online: boolean = await getStreamOnline()
  const token: string = getStreamToken()

  return (
    <>
      <Header className="items-center justify-center px-4 py-6">
        <Logo className="w-3/4 max-w-sm" />
      </Header>
      <Main className="relative items-center justify-center overflow-hidden">
        {online ? (
          <Player
            className="absolute h-full"
            src={`/live.m3u8?token=${token}`}
          />
        ) : (
          <Offline className="flex flex-1 flex-col items-center justify-center" />
        )}
      </Main>
    </>
  )
}
