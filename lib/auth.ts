import "server-only"

import { createHash, randomBytes, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { verifyPassword } from "@/lib/password"

const SESSION_COOKIE = "anime_store_admin"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12

function sessionSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD_HASH || "anime-store-dev-secret"
}

function sign(value: string) {
  return createHash("sha256").update(`${value}:${sessionSecret()}`).digest("hex")
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const value = cookieStore.get(SESSION_COOKIE)?.value
  if (!value) return false

  const [token, signature] = value.split(".")
  if (!token || !signature) return false
  return sign(token) === signature
}

export async function createAdminSession() {
  const cookieStore = await cookies()
  const token = randomBytes(24).toString("hex")
  cookieStore.set(SESSION_COOKIE, `${token}.${sign(token)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export function verifyAdminPassword(password: string) {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  if (passwordHash) return verifyPassword(password, passwordHash)

  const plainPassword = process.env.ADMIN_PASSWORD
  if (plainPassword) {
    const actual = Buffer.from(password)
    const expected = Buffer.from(plainPassword)
    if (actual.length !== expected.length) return false
    return timingSafeEqual(actual, expected)
  }

  return password === "anime-store-dev"
}
