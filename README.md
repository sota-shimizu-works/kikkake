# 🧩 system-tmp — Supabase × Next.js Monorepo Template

このリポジトリは、Supabase + Next.js (App Router) による
「RLS 対応の API + 自動型生成 + Zod バリデーション構成」を実験・整理したテンプレートです。

## 📁 プロジェクト構成

```
system-tmp/
├── apps/
│   └── web/                     # Next.js (App Router)
│       ├── app/api/             # API Route Handlers（supabase-js利用）
│       ├── app/(demo)/          # 動作確認ページ
│       └── lib/                 # 共通モジュール（supabase client など）
│
├── packages/
│   ├── db-types/                # Supabase CLIから生成されるDB型
│   ├── api-contract/            # REST API (OpenAPI) から生成されたZod/Type
│   │   ├── zod/                 # Zodiosクライアント + スキーマ
│   │   └── types/               # TypeScript型 (openapi-typescript)
│   └── schemas/                 # 手書きのフォーム用Zodなど（必要時のみ）
│
├── scripts/                     # 型/契約ファイル生成スクリプト
│   └── gen-contracts.ts
│
├── supabase/                    # ローカル Supabase 設定
└── package.json
```

## ⚙️ 環境変数（.env.local）

| key                           | 用途                     | 例                       |
| ----------------------------- | ------------------------ | ------------------------ |
| NEXT_PUBLIC_SUPABASE_URL      | プロジェクト URL         | https://xxxx.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | anon/publishable key     | eyJhbGciOiJI...          |
| SUPABASE_SERVICE_ROLE_KEY     | サーバー用 key           | eyJhbGciOiJI...          |
| V0_API_KEY                    | v0 MCP 用 API Key        | v0_xxx...                |
| SUPABASE_PROJECT_ID           | CLI 用（クラウド時のみ） | abcd1234efgh5678         |
| SUPABASE_PROJECT_REF_PROD     | 本番 Project Ref (20桁)  | abcdefghijklmnopqrst     |
| SUPABASE_ACCESS_TOKEN_PROD    | 本番用 PAT               | supa-xxxxxxxx            |
| SUPABASE_DB_URL_PROD          | 本番 DB 接続 URL         | postgres://...           |

## 🧠 型と API スキーマの自動生成

Supabase のマイグレーション変更後に：

```
pnpm gen:all
```

これで以下が自動生成されます（ローカル Supabase 起動が必要）：

| 出力物                                | 内容                             | 元                 |
| ------------------------------------- | -------------------------------- | ------------------ |
| packages/db-types/index.ts            | DB スキーマ型                    | Supabase CLI       |
| supabase/status.txt                   | ローカル Supabase の状態ダンプ    | supabase status    |
| supabase/schema.sql                   | public スキーマDDL               | supabase db dump   |
| supabase/storage_schema.sql           | storage スキーマDDL              | supabase db dump   |
| packages/api-contract/openapi.json    | REST 仕様 (Swagger 2.0)          | Supabase REST      |
| packages/api-contract/openapi.v3.json | OpenAPI 3.0                      | swagger2openapi    |
| packages/api-contract/zod/index.ts    | Zod スキーマ + REST クライアント | openapi-zod-client |
| packages/api-contract/types/index.ts  | TypeScript 型                    | openapi-typescript |

## 🧩 API 実装ポリシー

### RLS ユーザー権限系 → supabase-js

例：ユーザー自身のデータを返す /api/users

```
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .limit(10);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}
```

### 🧪 Zod + react-hook-form サンプル

```
"use client";

import { z } from "zod";
import { schemas } from "@api-contract/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const IdSchema = schemas.users.pick({ id: true }) as unknown as z.ZodTypeAny;
type IdFormInput = z.input<typeof IdSchema>;

export default function IdOnlyForm() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<IdFormInput>({ resolver: zodResolver(IdSchema) });

  return (
    <form onSubmit={handleSubmit((d) => alert(JSON.stringify(d)))}>
      <input {...register("id")} placeholder="uuid" />
      {errors.id?.message && <p className="text-red-600">{String(errors.id.message)}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🚀 ローカル開発フロー

### Supabase 起動

```
supabase start
```

### Next.js 起動

```
pnpm --filter @yourorg/web dev
```

http://localhost:3000 にアクセス。
/api/users や /api/sample のエンドポイントで疎通確認できます。

### Expo アプリ起動 (apps/mobile)

1. `apps/mobile/.env` を作成し、以下を設定
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
2. 起動:

```
pnpm --filter mobile start
```

Expo Go またはシミュレータでログイン画面とダッシュボードを確認できます。

#### ローカル Supabase を Expo から使う場合

ローカルの Supabase を使う場合は、`EXPO_PUBLIC_SUPABASE_URL` を
`http://<MacのLAN IP>:54321` に設定してください。

例:

```
EXPO_PUBLIC_SUPABASE_URL=http://192.168.3.177:54321
```

iPhone + Expo Go では HTTP 通信が制限される場合があるため、
通信できない場合は Android 実機/エミュレータの利用、
または iOS 開発ビルドの作成を検討してください。

## 🔒 セキュリティ設計

| 要素             | 方針                                |
| ---------------- | ----------------------------------- |
| Service Role Key | サーバー限定 (/app/api/\* のみ)     |
| RLS              | すべてのテーブルで有効化            |
| ユーザー操作     | supabase-js 経由（RLS で自動制御）  |
| 管理/AI 処理     | REST + Zod クライアントで安全に処理 |
| .env             | .env.local に保存、Git 追跡しない   |

## 🧰 主なコマンド

| コマンド                       | 説明                        |
| ------------------------------ | --------------------------- |
| pnpm gen:db-types              | DB 型を生成（Supabase CLI） |
| pnpm fetch:openapi             | REST の OpenAPI JSON を取得 |
| pnpm gen:contracts             | OpenAPI から Zod と型を生成 |
| pnpm dump:supabase             | ローカル Supabase の状態とDDLを出力 |
| pnpm v0:generate               | v0 Model API で UI を生成 |
| pnpm gen:all                   | 上記を一括実行              |
| pnpm dev --filter @yourorg/web | Next.js アプリ起動          |
| pnpm mcp:shadcn                | shadcn MCP サーバー起動（Codex補助用） |
| pnpm db:link:prod              | 本番 Supabase プロジェクトと紐付け |
| pnpm db:set-project-ref        | supabase/config.toml の project_id を環境変数で上書き |
| pnpm db:push:prod              | 本番 DB にマイグレーションを適用 |

## 🤖 Codex × shadcn MCP

Codex のコーディング補助として shadcn の MCP サーバーを `apps/web` 前提で起動できます。

1. MCP を起動: `pnpm mcp:shadcn`
2. Codex 側の MCP 設定（`~/.codex/config.toml`）に `.codex/config.toml.sample` の内容を追加

`pnpm mcp:shadcn` はサーバーとして待機するため、起動してもログが出ない場合があります（プロンプトが戻らなければ起動中）。詳細は `docs/codex-shadcn-mcp.md` を参照してください。

## 🤖 Codex × Supabase MCP

ローカル Supabase の MCP は `supabase start` 起動中に `http://127.0.0.1:54321/mcp` で利用できます。

Codex に登録する例（`~/.codex/config.toml`）:

```
[mcp_servers.supabase]
url = "http://127.0.0.1:54321/mcp"
```

## 🤖 Codex × v0 MCP

v0 MCP はリモートサーバー（`https://mcp.v0.dev`）に接続します。通常は MCP を使わず、下記の v0 Model API スクリプト経由で利用します。

`~/.codex/config.toml` の例:

```
[mcp_servers.v0]
command = "npx"
args = [
  "mcp-remote",
  "https://mcp.v0.dev",
  "--header",
  "Authorization: Bearer ${V0_API_KEY}"
]
```

`npx` が必要なので、Node.js がインストール済みであることを確認してください（必要時のみ）。

## 🤖 v0 Model API（基本はこちら）

v0 の利用は Model API を `pnpm v0:generate` で呼ぶ運用を基本とします。

- エンドポイント: `https://api.v0.dev/v1/chat/completions`
- ヘッダ: `Authorization: Bearer $V0_API_KEY`
- OpenAI Chat Completions 互換

シンプルな cURL 例:

```
curl https://api.v0.dev/v1/chat/completions \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "v0-1.5-md",
    "messages": [
      { "role": "user", "content": "Create a Next.js AI chatbot" }
    ]
  }'
```

スクリプト経由の例（`.env` の `V0_API_KEY` を使用）:

```
pnpm v0:generate -- --out apps/web/app/page.tsx --model v0-1.5-md
```

## 🏭 本番 DB へのマイグレーション適用フロー

1. `.env.prod`（または `.env`）に `SUPABASE_PROJECT_REF_PROD` `SUPABASE_ACCESS_TOKEN_PROD` `SUPABASE_DB_URL_PROD` を設定する。  
2. 初回のみ本番プロジェクトをリンク：`pnpm db:link:prod`  
3. 適用前に config の project_id を上書きした上で push：`pnpm db:push:prod`  
   - `.env.prod` を優先して環境変数を読み込み、`supabase/config.toml` の project_id を自動更新してから本番 DB へ push します。DNS resolver は HTTPS を指定しています。

## 🧾 ライセンス / 作者

MIT © [Sota Shimizu]
（system-tmp is a sandbox for Supabase × Next.js system development）
