import { saveSettingsAction } from "@/app/admin/actions"
import type { SiteSettingsView } from "@/lib/types"

export function AdminSettingsForm({ settings }: { settings: SiteSettingsView }) {
  return (
    <form action={saveSettingsAction} className="surface rounded-card p-5">
      <h2 className="text-xl font-semibold text-ink-900">站点设置</h2>
      <p className="mt-2 text-sm leading-6 text-ink-500">第一期使用全站固定支付宝点单助手二维码。</p>
      <div className="mt-5 grid gap-4">
        <label>
          <span className="label">支付宝点单助手二维码 URL</span>
          <input className="field mt-2" name="alipayQrUrl" type="url" defaultValue={settings.alipayQrUrl} required />
        </label>
        <label>
          <span className="label">下单说明</span>
          <textarea className="field mt-2 min-h-28" name="orderGuide" defaultValue={settings.orderGuide} required />
        </label>
        <label>
          <span className="label">联系方式说明</span>
          <textarea className="field mt-2 min-h-20" name="contactText" defaultValue={settings.contactText} required />
        </label>
        <label>
          <span className="label">首页公告</span>
          <textarea className="field mt-2 min-h-20" name="announcement" defaultValue={settings.announcement} />
        </label>
      </div>
      <button className="primary-button mt-5" type="submit">
        保存设置
      </button>
    </form>
  )
}
