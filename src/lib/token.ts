import { decode, sign } from './jwt'

export type Claims = {
  viewerId: string
}

export async function decodeStreamToken(
  token: null | string,
): Promise<Claims | null> {
  if (!token) {
    return null
  }

  const decoded = await decode<Claims>(token)

  if (!decoded) {
    return null
  }

  return decoded as Claims
}

export async function signStreamToken(
  claims: Claims,
  expiration: Date,
): Promise<string> {
  return sign(claims, expiration)
}
