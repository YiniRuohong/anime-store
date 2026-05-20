export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/[0.64] py-10">
      <div className="container-page grid gap-4 text-sm text-ink-500 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-semibold text-ink-900">Special Thanks / 鸣谢</p>
          <div className="mt-2 space-y-1 leading-7">
            <p>Copyright © {new Date().getFullYear()} 旖旎若鸿. Produced by 旖旎若鸿.</p>
            <p>鸣谢独角数卡。</p>
            <p>网络加速 by Atago Network@旖旎若鸿.</p>
          </div>
        </div>
        <p>Made with sakura in NEUQ.</p>
      </div>
    </footer>
  )
}
