import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies, headers } from 'next/headers'

import { STREAM_TOKEN_COOKIE_NAME } from '../constants'

export function getStreamToken(): string {
  const headersStore = headers()
  const cookiesStore = cookies()
  const responseCookies = new ResponseCookies(headersStore as Headers)

  const streamTokenCookie =
    cookiesStore.get(STREAM_TOKEN_COOKIE_NAME) ??
    responseCookies.get(STREAM_TOKEN_COOKIE_NAME)

  return streamTokenCookie?.value as string
}
