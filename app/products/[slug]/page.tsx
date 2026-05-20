import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Petals } from "@/components/petals"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { formatPrice, stockLabel, stockTone } from "@/lib/format"
import { getProductBySlug } from "@/lib/products"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const unavailable = product.stockStatus === "SOLD_OUT" || product.stockStatus === "HIDDEN"

  return (
    <>
      <Petals />
      <SiteHeader />
      <main className="container-page py-10">
        <Link className="mb-8 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-sakura-600" href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          返回商品目录
        </Link>
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface overflow-hidden rounded-card">
            <div className="relative aspect-[4/3] bg-sakura-50">
              <Image src={product.coverUrl} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 48vw, 100vw" unoptimized />
            </div>
          </div>
          <div className="surface rounded-card p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs ${stockTone(product.stockStatus)}`}>
                {stockLabel(product.stockStatus)}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs text-ink-500">{product.category}</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink-900">{product.title}</h1>
            <p className="mt-4 text-lg leading-8 text-ink-700">{product.subtitle}</p>
            <p className="mt-6 whitespace-pre-line text-sm leading-8 text-ink-500">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span className="rounded-full bg-sakura-50 px-3 py-1 text-xs text-sakura-600" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sakura-100 pt-6">
              <p className="text-3xl font-semibold text-ink-900">{formatPrice(product.priceCny)}</p>
              {unavailable ? (
                <button className="secondary-button" disabled>
                  暂不可购买
                </button>
              ) : (
                <Link className="primary-button" href={`/buy/${product.slug}`}>
                  <ShoppingCart size={16} aria-hidden="true" />
                  前往二维码下单
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
