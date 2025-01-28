import { type Options, verify, hash } from '@node-rs/argon2'

export const options: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
}

export async function hashPassword(password: string) {
  return await hash(password, options)
}

export async function verifyPassword(password: string, hash: string) {
  return await verify(hash, password, options)
}
