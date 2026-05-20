import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { formatPrice, stockLabel, stockTone } from "@/lib/format"
import type { ProductView } from "@/lib/types"

export function ProductCard({ product }: { product: ProductView }) {
  const unavailable = product.stockStatus === "SOLD_OUT" || product.stockStatus === "HIDDEN"

  return (
    <article className="surface overflow-hidden rounded-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-sakura-50">
          <Image
            src={product.coverUrl}
            alt={product.title}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized
          />
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs ${stockTone(product.stockStatus)}`}>
            {stockLabel(product.stockStatus)}
          </span>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs text-ink-500">{product.category}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 text-xl font-semibold text-ink-900">{product.title}</h3>
          </Link>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink-500">{product.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span className="rounded-full bg-sakura-50 px-3 py-1 text-xs text-sakura-600" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-semibold text-ink-900">{formatPrice(product.priceCny)}</p>
          {unavailable ? (
            <Link className="secondary-button" href={`/products/${product.slug}`}>
              查看
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <Link className="primary-button" href={`/buy/${product.slug}`}>
              <ShoppingCart size={16} aria-hidden="true" />
              购买
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
