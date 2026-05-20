import Link from "next/link"
import { ArrowRight, BadgeCheck, QrCode, ShieldCheck, Sparkles } from "lucide-react"
import { Petals } from "@/components/petals"
import { ProductCard } from "@/components/product-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getCategories, listVisibleProducts, getSiteSettings } from "@/lib/products"

export const dynamic = "force-dynamic"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const [{ category }, products, settings] = await Promise.all([
    searchParams,
    listVisibleProducts(),
    getSiteSettings(),
  ])
  const categories = getCategories(products)
  const visibleProducts = category ? products.filter((product) => product.category === category) : products
  const featured = products[0]

  return (
    <>
      <Petals />
      <SiteHeader />
      <main>
        <section className="container-page grid min-h-[calc(100vh-4rem)] gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sakura-200 bg-white/70 px-4 py-2 text-sm text-ink-500">
              <Sparkles size={16} className="text-sakura-500" aria-hidden="true" />
              社团周边与数字商品试运营
            </div>
            <h1 className="text-4xl font-bold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
              NEUQ Anime Store
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-700">
              轻量展示火占术动漫社相关商品。选择商品后进入站内二维码页，通过支付宝点单助手完成下单。
            </p>
            {settings.announcement ? (
              <p className="mt-5 rounded-card border border-yuzu-100 bg-yuzu-100/[0.55] px-4 py-3 text-sm leading-6 text-yuzu-600">
                {settings.announcement}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="primary-button" href="#products">
                浏览商品
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="secondary-button" href="/admin">
                管理后台
              </Link>
            </div>
          </div>

          <div className="surface rounded-card p-4 sm:p-6">
            <div className="rounded-card bg-gradient-to-br from-sakura-100 via-white to-aqua-100 p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "展示", text: "商品信息由后台维护", Icon: BadgeCheck },
                  { title: "下单", text: "跳转站内二维码页", Icon: QrCode },
                  { title: "安全", text: "暂不处理支付回调", Icon: ShieldCheck },
                ].map(({ title, text, Icon }) => (
                  <div className="rounded-card bg-white/[0.78] p-4 shadow-soft" key={title}>
                    <Icon className="text-sakura-500" size={22} aria-hidden="true" />
                    <p className="mt-4 font-semibold text-ink-900">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-ink-500">{text}</p>
                  </div>
                ))}
              </div>
              {featured ? (
                <div className="mt-5 rounded-card bg-white/[0.82] p-5">
                  <p className="text-sm text-ink-500">今日推荐</p>
                  <p className="mt-1 text-2xl font-semibold text-ink-900">{featured.title}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-500">{featured.subtitle}</p>
                  <Link className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sakura-600" href={`/products/${featured.slug}`}>
                    查看详情
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="container-page py-14" id="products">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-ink-900">商品目录</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-500">
                商品支付和履约以支付宝点单助手及人工确认为准，本站不显示支付状态。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link className={!category ? "primary-button" : "secondary-button"} href="/#products">
                全部
              </Link>
              {categories.map((item) => (
                <Link
                  className={category === item ? "primary-button" : "secondary-button"}
                  href={`/?category=${encodeURIComponent(item)}#products`}
                  key={item}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="surface rounded-card p-10 text-center text-ink-500">当前分类暂无可展示商品。</div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
