import { type JWTPayload, jwtVerify, SignJWT } from 'jose'

import { SIGNING_SECRET } from '../constants'

const SIGNING_KEY = new TextEncoder().encode(SIGNING_SECRET)
const alg = 'HS256'

export async function decode<T>(jwt: string): Promise<(JWTPayload & T) | null> {
  try {
    const decoded = await jwtVerify<T>(jwt, SIGNING_KEY, {
      algorithms: [alg],
    })

    return decoded.payload
  } catch {
    return null
  }
}

export async function sign(
  claims: JWTPayload,
  expiration: Date,
): Promise<string> {
  return await new SignJWT(claims)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(SIGNING_KEY)
}
