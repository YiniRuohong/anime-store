import type { Product, SiteSettings } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { demoProducts, demoSettings } from "@/lib/demo-data"
import type { ProductView, SiteSettingsView } from "@/lib/types"

function canUseDatabase() {
  return Boolean(process.env.DATABASE_URL)
}

function toProductView(product: Product): ProductView {
  return {
    ...product,
    priceCny: product.priceCny.toFixed(2),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }
}

function toSettingsView(settings: SiteSettings): SiteSettingsView {
  return {
    alipayQrUrl: settings.alipayQrUrl,
    orderGuide: settings.orderGuide,
    contactText: settings.contactText,
    announcement: settings.announcement,
  }
}

export async function listVisibleProducts(): Promise<ProductView[]> {
  if (!canUseDatabase()) return demoProducts

  try {
    const products = await prisma.product.findMany({
      where: { visible: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    })
    return products.map(toProductView)
  } catch (error) {
    console.error("Failed to list products", error)
    return demoProducts
  }
}

export async function listAllProducts(): Promise<ProductView[]> {
  if (!canUseDatabase()) return demoProducts

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  })
  return products.map(toProductView)
}

export async function getProductBySlug(slug: string): Promise<ProductView | null> {
  if (!canUseDatabase()) {
    return demoProducts.find((product) => product.slug === slug) ?? null
  }

  try {
    const product = await prisma.product.findUnique({ where: { slug } })
    if (!product || !product.visible) return null
    return toProductView(product)
  } catch (error) {
    console.error("Failed to get product", error)
    return demoProducts.find((product) => product.slug === slug) ?? null
  }
}

export async function getSiteSettings(): Promise<SiteSettingsView> {
  const fallback = {
    ...demoSettings,
    alipayQrUrl: process.env.ALIPAY_QR_URL || demoSettings.alipayQrUrl,
  }

  if (!canUseDatabase()) return fallback

  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: fallback,
    })
    return toSettingsView(settings)
  } catch (error) {
    console.error("Failed to get site settings", error)
    return fallback
  }
}

export function getCategories(products: ProductView[]) {
  return Array.from(new Set(products.map((product) => product.category))).sort((a, b) =>
    a.localeCompare(b, "zh-CN"),
  )
}
