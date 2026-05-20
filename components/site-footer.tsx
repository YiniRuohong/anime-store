export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/[0.64] py-10">
      <div className="container-page grid gap-4 text-sm text-ink-500 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-semibold text-ink-900">Special Thanks / 鸣谢</p>
          <p className="mt-2 max-w-3xl leading-7">
            本站商品展示、后台管理与订单引导的产品思路参考 Dujiao-Next / 独角数卡等开源发卡系统。
            第一版未复制其代码，也不包含支付网关、支付回调或自动发货逻辑。
          </p>
        </div>
        <p>Made with sakura in NEUQ.</p>
      </div>
    </footer>
  )
}
