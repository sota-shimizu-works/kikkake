import AppHeader from "@/components/app-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            system-tmp
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Supabase × Next.js の
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              開発テンプレート
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            RLS を前提にした API 設計、DB 型生成、OpenAPI 契約をまとめた
            モノレポ構成です。安全性と開発スピードの両立を目指します。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-lg bg-slate-900 px-8 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800">
              いますぐ始める
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-8 py-3 text-slate-700 transition hover:bg-slate-50">
              仕様を確認する
            </button>
          </div>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <div className="h-6 w-6 rounded-sm bg-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">RLS 前提設計</h3>
            <p className="mt-2 text-slate-600">
              テーブル単位のアクセス制御を標準化し、安心して API を公開できます。
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <div className="h-6 w-6 rounded-full bg-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">自動型生成</h3>
            <p className="mt-2 text-slate-600">
              DB 変更を即座に TypeScript 型へ反映し、フロントの安全性を維持。
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <div className="h-6 w-6 rotate-45 rounded-lg bg-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">OpenAPI 契約</h3>
            <p className="mt-2 text-slate-600">
              REST 仕様から Zod と型を生成し、API 連携のズレを減らします。
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-slate-900 px-8 py-10 text-center text-white">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            すぐに開発を始められます
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            system-tmp を起点に、認証・RLS・API 契約を備えたプロジェクトを短時間で構築できます。
          </p>
          <button className="mt-6 rounded-lg bg-white px-8 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            GitHub を開く
          </button>
        </section>
      </main>
    </div>
  );
}
