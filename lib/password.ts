import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const iterations = 210_000
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex")
  return `pbkdf2$${iterations}$${salt}$${hash}`
}

export function verifyPassword(password: string, encoded: string) {
  const [scheme, iterationsText, salt, expected] = encoded.split("$")
  if (scheme !== "pbkdf2" || !iterationsText || !salt || !expected) return false

  const actual = pbkdf2Sync(password, salt, Number(iterationsText), 32, "sha256")
  const expectedBuffer = Buffer.from(expected, "hex")
  if (actual.length !== expectedBuffer.length) return false
  return timingSafeEqual(actual, expectedBuffer)
}
