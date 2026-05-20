"use client"

import { useActionState } from "react"
import { Lock } from "lucide-react"
import { loginAction } from "@/app/admin/actions"

export function AdminLogin() {
  const [state, action, pending] = useActionState(loginAction, { error: "" })

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <form action={action} className="surface w-full max-w-md rounded-card p-8">
        <div className="mb-8 grid h-12 w-12 place-items-center rounded-card bg-sakura-100 text-sakura-600">
          <Lock size={22} aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-ink-900">管理后台</h1>
        <p className="mt-3 text-sm leading-7 text-ink-500">输入管理员密码后维护商品和点单助手二维码。</p>
        <label className="mt-8 block">
          <span className="label">密码</span>
          <input className="field mt-2" name="password" type="password" required autoComplete="current-password" />
        </label>
        {state.error ? <p className="mt-4 text-sm text-red-600">{state.error}</p> : null}
        <button className="primary-button mt-6 w-full" disabled={pending} type="submit">
          {pending ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  )
}
