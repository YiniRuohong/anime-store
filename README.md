# NEUQ Anime Store

`shop.neuq-ani.me` 的轻量商品展示与二维码下单站。第一期只做商品展示、后台管理和支付宝点单助手二维码引导，不接支付网关、不处理支付回调、不自动发货。

## Stack

- Next.js App Router
- Tailwind CSS
- Prisma + PostgreSQL
- LXGW WenKai 字体

## Development

```bash
npm install
cp .env.example .env
npm run admin:hash -- "your-admin-password"
npm run db:push
npm run db:seed
npm run dev
```

没有配置 `DATABASE_URL` 时，前台会显示内置演示商品，便于本地预览；后台保存需要 PostgreSQL。

## Routes

- `/` 商品展示首页
- `/products/[slug]` 商品详情
- `/buy/[slug]` 固定支付宝点单助手二维码下单页
- `/admin` 商品与站点设置后台

## Deployment Notes

- 源站：`root@202.61.246.240`
- SSH key：`~/.ssh/alma_vps_ed25519`
- 目标目录：`/opt/neuq-ani/laser_webpanel/deploy/sites/shop`
- 建议服务端口：`3100`
- 域名：`shop.neuq-ani.me`

生产环境需要配置：

- `DATABASE_URL`
- `ADMIN_PASSWORD_HASH`
- `AUTH_SECRET`
- `ALIPAY_QR_URL` 或在后台保存二维码 URL

## Special Thanks / 鸣谢

本站商品展示、后台管理与订单引导的产品思路参考了 Dujiao-Next / 独角数卡等开源发卡系统。第一版没有复制或改写其代码、文案、结构或样式；如后续引入相关项目内容，应按对应许可证保留版权与许可证说明，并在文档与代码注释中标明来源。

## License

MIT
