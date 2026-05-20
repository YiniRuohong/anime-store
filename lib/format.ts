import type { StockStatus } from "@prisma/client"

export function formatPrice(priceCny: string) {
  return `¥${Number(priceCny).toFixed(2)}`
}

export function stockLabel(status: StockStatus) {
  switch (status) {
    case "IN_STOCK":
      return "现货"
    case "LIMITED":
      return "少量"
    case "SOLD_OUT":
      return "售罄"
    case "HIDDEN":
      return "隐藏"
    default:
      return status satisfies never
  }
}

export function stockTone(status: StockStatus) {
  switch (status) {
    case "IN_STOCK":
      return "text-aqua-600 bg-aqua-100"
    case "LIMITED":
      return "text-yuzu-600 bg-yuzu-100"
    case "SOLD_OUT":
      return "text-slate-500 bg-slate-100"
    case "HIDDEN":
      return "text-slate-400 bg-slate-100"
    default:
      return status satisfies never
  }
}
