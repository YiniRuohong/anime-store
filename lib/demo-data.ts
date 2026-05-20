import type { ProductView, SiteSettingsView } from "@/lib/types"

export const demoProducts: ProductView[] = [
  {
    id: "demo-sticker",
    slug: "sakura-sticker-pack",
    title: "樱色社团贴纸包",
    subtitle: "适合手账、电脑与社团纪念的小套装",
    description:
      "包含火占术动漫社主题贴纸、樱花小物与随机角色小卡。第一期为展示样例，正式商品可在后台替换。",
    priceCny: "19.90",
    category: "周边",
    tags: ["现货", "社团限定", "贴纸"],
    coverUrl:
      "https://images.unsplash.com/photo-1612178537253-bccd437b730e?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [],
    stockStatus: "IN_STOCK",
    visible: true,
    sortOrder: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-key",
    slug: "digital-commission-ticket",
    title: "数字委托预约券",
    subtitle: "用于预约社团内部数字服务或定制内容",
    description:
      "可作为线上服务、数字兑换码或预约类商品的展示模板。付款与确认以支付宝点单助手为准。",
    priceCny: "49.00",
    category: "数字服务",
    tags: ["预约", "虚拟商品"],
    coverUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [],
    stockStatus: "LIMITED",
    visible: true,
    sortOrder: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-bundle",
    slug: "club-welcome-bundle",
    title: "入社欢迎组合",
    subtitle: "把社团信息、徽章和小物放进一个轻量组合",
    description:
      "适合做线下活动领取或线上预订。后台可调整库存状态、分类、排序和展示图片。",
    priceCny: "29.00",
    category: "活动",
    tags: ["活动", "组合"],
    coverUrl:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [],
    stockStatus: "IN_STOCK",
    visible: true,
    sortOrder: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const demoSettings: SiteSettingsView = {
  alipayQrUrl:
    "https://api.qrserver.com/v1/create-qr-code/?size=640x640&data=https%3A%2F%2Fshop.neuq-ani.me%2F",
  orderGuide:
    "扫码后请在支付宝点单助手中选择或备注商品名称。本站第一期不记录支付状态，付款与发货确认以支付宝点单助手和人工联系为准。",
  contactText: "如需改价、合单或售后，请在点单助手备注中留下联系方式。",
  announcement: "试运营中：商品信息以后台维护为准，支付流程暂由支付宝点单助手承接。",
}
