import * as jose from 'jose'
import type { JWTPayload } from 'jose'

import { SIGNING_SECRET } from '../constants'

export type SignOptions = {
  alg?: string
  exp?: string
}

const secret = new TextEncoder().encode(SIGNING_SECRET)
const alg = 'HS256'

export async function sign(
  claims: JWTPayload,
  { alg = 'HS256', exp = '1d' }: SignOptions = {},
): Promise<string> {
  return await new jose.SignJWT(claims)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret)
}

export async function verify(jwt: string): Promise<JWTPayload | undefined> {
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret)

    if (protectedHeader.alg !== alg) {
      return undefined
    }

    return payload
  } catch (e) {
    return undefined
  }
}
