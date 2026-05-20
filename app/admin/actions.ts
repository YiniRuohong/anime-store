"use server"

import { Prisma, StockStatus } from "@prisma/client"
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
  priceCny: z.preprocess(normalizePriceInput, z.string().regex(/^\d+\.\d{2}$/, "价格格式应为 19.90")),
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

function normalizePriceInput(value: unknown) {
  const raw = String(value ?? "")
    .trim()
    .replace(/，/g, ",")
    .replace(/。/g, ".")
    .replace(/[￥¥\s,]/g, "")

  if (!/^\d+(\.\d{0,2})?$/.test(raw)) return raw

  const [yuan, cents = ""] = raw.split(".")
  return `${yuan}.${cents.padEnd(2, "0")}`
}

function validationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "表单内容有误，请检查后再保存"
}

function redirectWithAdminError(message: string): never {
  redirect(`/admin?error=${encodeURIComponent(message)}`)
}

function databaseErrorMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") return "slug 已被其他商品使用，请换一个后再保存"
    if (error.code === "P2025") return "要操作的商品不存在，可能已经被删除"
  }

  return "保存失败，请稍后重试或检查服务器日志"
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
  const result = productSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) redirectWithAdminError(validationMessage(result.error))

  const parsed = result.data
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

  try {
    if (parsed.id) {
      await prisma.product.update({ where: { id: parsed.id }, data })
    } else {
      await prisma.product.create({ data })
    }
  } catch (error) {
    redirectWithAdminError(databaseErrorMessage(error))
  }

  revalidatePath("/")
  revalidatePath("/admin")
  redirect("/admin?saved=product")
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") || "")
  if (!id) return
  try {
    await prisma.product.delete({ where: { id } })
  } catch (error) {
    redirectWithAdminError(databaseErrorMessage(error))
  }
  revalidatePath("/")
  revalidatePath("/admin")
  redirect("/admin?saved=product")
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin()
  const result = settingsSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) redirectWithAdminError(validationMessage(result.error))

  const parsed = result.data
  try {
    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: parsed,
      create: { id: "default", ...parsed },
    })
  } catch {
    redirectWithAdminError("站点设置保存失败，请稍后重试或检查服务器日志")
  }
  revalidatePath("/")
  revalidatePath("/admin")
  redirect("/admin?saved=settings")
}
