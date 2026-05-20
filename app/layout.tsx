import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NEUQ Anime Store",
  description: "火占术动漫社商品展示与支付宝点单助手下单站",
  metadataBase: new URL("https://shop.neuq-ani.me"),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
