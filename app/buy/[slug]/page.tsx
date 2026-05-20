import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MessageCircle, QrCode } from "lucide-react"
import { Petals } from "@/components/petals"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { formatPrice } from "@/lib/format"
import { getProductBySlug, getSiteSettings } from "@/lib/products"

export const dynamic = "force-dynamic"

export default async function BuyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])
  if (!product || product.stockStatus === "SOLD_OUT" || product.stockStatus === "HIDDEN") notFound()

  return (
    <>
      <Petals />
      <SiteHeader />
      <main className="container-page py-10">
        <Link className="mb-8 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-sakura-600" href={`/products/${product.slug}`}>
          <ArrowLeft size={16} aria-hidden="true" />
          返回商品详情
        </Link>
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="surface rounded-card p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-sakura-50 px-4 py-2 text-sm text-sakura-600">
              <QrCode size={16} aria-hidden="true" />
              支付宝点单助手
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink-900">扫码下单</h1>
            <p className="mt-4 text-lg leading-8 text-ink-700">
              请在点单助手中选择或备注：{product.title}
            </p>
            <div className="mt-8 rounded-card border border-sakura-100 bg-white/[0.78] p-5">
              <p className="text-sm text-ink-500">本次商品</p>
              <p className="mt-2 text-2xl font-semibold text-ink-900">{product.title}</p>
              <p className="mt-2 text-3xl font-semibold text-sakura-600">{formatPrice(product.priceCny)}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm leading-7 text-ink-500">
              <p>{settings.orderGuide}</p>
              <p className="flex gap-2">
                <MessageCircle className="mt-1 shrink-0 text-aqua-600" size={16} aria-hidden="true" />
                <span>{settings.contactText}</span>
              </p>
            </div>
          </div>

          <div className="surface rounded-card p-6 sm:p-8">
            <div className="mx-auto max-w-sm rounded-card bg-white p-4 shadow-soft">
              <div className="relative aspect-square overflow-hidden rounded-card border border-sakura-100">
                <Image src={settings.alipayQrUrl} alt="支付宝点单助手二维码" fill className="object-contain" sizes="360px" unoptimized />
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-7 text-ink-500">
              站内不接收支付回调，也不自动判断支付状态。完成付款后请以支付宝点单助手内状态为准。
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
