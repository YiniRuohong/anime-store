"use server"

import { StockStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { clearAdminSession, createAdminSession, isAdminAuthenticated, verifyAdminPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const productSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug 只能使用小写字母、数字和中横线"),
  title: z.string().trim().min(1).max(80),
  subtitle: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(2000),
  priceCny: z.string().trim().regex(/^\d+(\.\d{1,2})?$/, "价格格式应为 19.90"),
  category: z.string().trim().min(1).max(40),
  tags: z.string().default(""),
  coverUrl: z.string().trim().url(),
  galleryUrls: z.string().default(""),
  stockStatus: z.nativeEnum(StockStatus),
  visible: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999),
})

const settingsSchema = z.object({
  alipayQrUrl: z.string().trim().url(),
  orderGuide: z.string().trim().min(1).max(1200),
  contactText: z.string().trim().min(1).max(400),
  announcement: z.string().trim().max(300),
})

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin")
  }
}

function listFromTextarea(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export async function loginAction(_prevState: { error?: string }, formData: FormData) {
  const password = String(formData.get("password") || "")
  if (!verifyAdminPassword(password)) {
    return { error: "密码不正确" }
  }
  await createAdminSession()
  redirect("/admin")
}

export async function logoutAction() {
  await clearAdminSession()
  redirect("/admin")
}

export async function upsertProductAction(formData: FormData) {
  await requireAdmin()
  const parsed = productSchema.parse(Object.fromEntries(formData.entries()))
  const data = {
    slug: parsed.slug,
    title: parsed.title,
    subtitle: parsed.subtitle,
    description: parsed.description,
    priceCny: parsed.priceCny,
    category: parsed.category,
    tags: listFromTextarea(parsed.tags),
    coverUrl: parsed.coverUrl,
    galleryUrls: listFromTextarea(parsed.galleryUrls),
    stockStatus: parsed.stockStatus,
    visible: parsed.visible === "on" && parsed.stockStatus !== "HIDDEN",
    sortOrder: parsed.sortOrder,
  }

  if (parsed.id) {
    await prisma.product.update({ where: { id: parsed.id }, data })
  } else {
    await prisma.product.create({ data })
  }

  revalidatePath("/")
  revalidatePath("/admin")
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") || "")
  if (!id) return
  await prisma.product.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin()
  const parsed = settingsSchema.parse(Object.fromEntries(formData.entries()))
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: parsed,
    create: { id: "default", ...parsed },
  })
  revalidatePath("/")
  revalidatePath("/admin")
}
