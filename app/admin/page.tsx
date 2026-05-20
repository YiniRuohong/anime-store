import Link from "next/link"
import { Database, ExternalLink, LogOut } from "lucide-react"
import { logoutAction } from "@/app/admin/actions"
import { AdminLogin } from "@/components/admin-login"
import { AdminProductForm } from "@/components/admin-product-form"
import { AdminSettingsForm } from "@/components/admin-settings-form"
import { Petals } from "@/components/petals"
import { isAdminAuthenticated } from "@/lib/auth"
import { getSiteSettings, listAllProducts } from "@/lib/products"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return (
      <>
        <Petals />
        <AdminLogin />
      </>
    )
  }

  const [products, settings] = await Promise.all([listAllProducts(), getSiteSettings()])
  const hasDatabase = Boolean(process.env.DATABASE_URL)

  return (
    <>
      <Petals />
      <main className="container-page py-8">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-ink-500">NEUQ Anime Store</p>
            <h1 className="text-3xl font-bold text-ink-900">商品管理后台</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="secondary-button" href="/" target="_blank">
              <ExternalLink size={16} aria-hidden="true" />
              查看前台
            </Link>
            <form action={logoutAction}>
              <button className="secondary-button" type="submit">
                <LogOut size={16} aria-hidden="true" />
                退出
              </button>
            </form>
          </div>
        </header>

        {!hasDatabase ? (
          <div className="mb-6 flex gap-3 rounded-card border border-yuzu-100 bg-yuzu-100/[0.60] p-4 text-sm leading-6 text-yuzu-600">
            <Database className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            当前未配置 DATABASE_URL，后台展示的是演示数据；部署到源站并配置 Postgres 后会启用真实保存。
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6">
            <AdminSettingsForm settings={settings} />
            <AdminProductForm />
          </aside>
          <section className="space-y-5">
            {products.map((product) => (
              <AdminProductForm product={product} key={product.id} />
            ))}
          </section>
        </div>
      </main>
    </>
  )
}
