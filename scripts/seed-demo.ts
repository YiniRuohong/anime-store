import { PrismaClient, StockStatus } from "@prisma/client"
import { demoProducts, demoSettings } from "../lib/demo-data"

const prisma = new PrismaClient()

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: demoSettings,
    create: { id: "default", ...demoSettings },
  })

  for (const product of demoProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        priceCny: product.priceCny,
        category: product.category,
        tags: product.tags,
        coverUrl: product.coverUrl,
        galleryUrls: product.galleryUrls,
        stockStatus: product.stockStatus as StockStatus,
        visible: product.visible,
        sortOrder: product.sortOrder,
      },
      create: {
        slug: product.slug,
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        priceCny: product.priceCny,
        category: product.category,
        tags: product.tags,
        coverUrl: product.coverUrl,
        galleryUrls: product.galleryUrls,
        stockStatus: product.stockStatus as StockStatus,
        visible: product.visible,
        sortOrder: product.sortOrder,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seeded demo products and settings.")
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
