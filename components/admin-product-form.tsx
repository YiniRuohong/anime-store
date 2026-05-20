import type { ProductView } from "@/lib/types"
import { deleteProductAction, upsertProductAction } from "@/app/admin/actions"

const statusOptions = [
  ["IN_STOCK", "现货"],
  ["LIMITED", "少量"],
  ["SOLD_OUT", "售罄"],
  ["HIDDEN", "隐藏"],
] as const

export function AdminProductForm({ product }: { product?: ProductView }) {
  const isEditing = Boolean(product)

  return (
    <form action={upsertProductAction} className="surface rounded-card p-5">
      {product ? <input name="id" type="hidden" value={product.id} /> : null}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">{isEditing ? product?.title : "新增商品"}</h3>
          <p className="mt-1 text-sm text-ink-500">{isEditing ? product?.slug : "创建后会立即进入商品列表"}</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-500">
          <input name="visible" type="checkbox" defaultChecked={product?.visible ?? true} className="rounded border-slate-300 text-sakura-500 focus:ring-sakura-300" />
          展示
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className="label">Slug</span>
          <input className="field mt-2" name="slug" defaultValue={product?.slug} placeholder="club-welcome-bundle" required />
        </label>
        <label>
          <span className="label">标题</span>
          <input className="field mt-2" name="title" defaultValue={product?.title} required />
        </label>
        <label className="md:col-span-2">
          <span className="label">副标题</span>
          <input className="field mt-2" name="subtitle" defaultValue={product?.subtitle} required />
        </label>
        <label>
          <span className="label">价格</span>
          <input className="field mt-2" name="priceCny" defaultValue={product?.priceCny ?? "19.90"} required />
        </label>
        <label>
          <span className="label">分类</span>
          <input className="field mt-2" name="category" defaultValue={product?.category ?? "周边"} required />
        </label>
        <label>
          <span className="label">库存状态</span>
          <select className="field mt-2" name="stockStatus" defaultValue={product?.stockStatus ?? "IN_STOCK"}>
            {statusOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="label">排序</span>
          <input className="field mt-2" name="sortOrder" type="number" min="0" defaultValue={product?.sortOrder ?? 100} />
        </label>
        <label className="md:col-span-2">
          <span className="label">封面 URL</span>
          <input className="field mt-2" name="coverUrl" type="url" defaultValue={product?.coverUrl} required />
        </label>
        <label className="md:col-span-2">
          <span className="label">标签（逗号或换行分隔）</span>
          <textarea className="field mt-2 min-h-20" name="tags" defaultValue={product?.tags.join(", ")} />
        </label>
        <label className="md:col-span-2">
          <span className="label">图库 URL（逗号或换行分隔）</span>
          <textarea className="field mt-2 min-h-20" name="galleryUrls" defaultValue={product?.galleryUrls.join("\n")} />
        </label>
        <label className="md:col-span-2">
          <span className="label">详情</span>
          <textarea className="field mt-2 min-h-28" name="description" defaultValue={product?.description} required />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap justify-between gap-3">
        {product ? (
          <button
            className="secondary-button border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
            formAction={deleteProductAction}
            formNoValidate
            name="id"
            value={product.id}
            type="submit"
          >
            删除
          </button>
        ) : (
          <span />
        )}
        <button className="primary-button" type="submit">
          {isEditing ? "保存商品" : "创建商品"}
        </button>
      </div>
    </form>
  )
}
