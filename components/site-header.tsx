import Link from "next/link"
import { ShoppingBag, Sparkles } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/[0.76] backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-card bg-sakura-100 text-sakura-600">
            <Sparkles size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm text-ink-500">火占术动漫社</span>
            <span className="block text-base font-semibold text-ink-900">NEUQ Anime Store</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="secondary-button hidden sm:inline-flex" href="/#products">
            <ShoppingBag size={16} aria-hidden="true" />
            商品
          </Link>
          <Link className="secondary-button" href="/admin">
            后台
          </Link>
        </nav>
      </div>
    </header>
  )
}
