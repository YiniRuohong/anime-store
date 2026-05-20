import type { StockStatus } from "@prisma/client"

export interface ProductView {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  priceCny: string
  category: string
  tags: string[]
  coverUrl: string
  galleryUrls: string[]
  stockStatus: StockStatus
  visible: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface SiteSettingsView {
  alipayQrUrl: string
  orderGuide: string
  contactText: string
  announcement: string
}
