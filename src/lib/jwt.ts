import * as jose from 'jose'
import type { JWTPayload } from 'jose'

import { SIGNING_SECRET } from '../constants'

const secret = new TextEncoder().encode(SIGNING_SECRET)
const alg = 'HS256'

export async function sign(claims: JWTPayload): Promise<string> {
  return await new jose.SignJWT(claims)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1d')
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
