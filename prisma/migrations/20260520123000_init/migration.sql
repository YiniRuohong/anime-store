CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'LIMITED', 'SOLD_OUT', 'HIDDEN');

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCny" DECIMAL(10,2) NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "coverUrl" TEXT NOT NULL,
    "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "stockStatus" "StockStatus" NOT NULL DEFAULT 'IN_STOCK',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "alipayQrUrl" TEXT NOT NULL,
    "orderGuide" TEXT NOT NULL,
    "contactText" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE INDEX "Product_visible_sortOrder_idx" ON "Product"("visible", "sortOrder");
CREATE INDEX "Product_category_idx" ON "Product"("category");
