# Codex × shadcn MCP (system-tmp)

このリポジトリでは shadcn/ui の設定が `apps/web/components.json` にあるため、MCP サーバーも `apps/web` をカレントとして起動するのが一番安定します。

## 1) MCP サーバーの起動

ワークスペース root で以下を実行します。

```bash
pnpm mcp:shadcn
```

初回は `pnpm dlx shadcn@latest` によりパッケージ取得が走るためネットワークが必要です（2回目以降はキャッシュされます）。
また MCP サーバーはクライアント（Codex 等）から接続されるまで基本的にログを出さず、ターミナル上では「何も起きていない」ように見えて待機します（プロンプトが戻らなければ起動しています）。止めるときは `Ctrl+C` です。

## 2) Codex 側に MCP を登録

Codex の MCP 設定ファイル（`~/.codex/config.toml`）にサーバー定義を追加します。
この repo にはサンプルとして `.codex/config.toml.sample` を置いてあります。

まず雛形を出したい場合は、以下でもガイドが表示されます:

```bash
pnpm dlx shadcn@latest mcp --cwd apps/web init --client codex
```

設定例（`~/.codex/config.toml` に追記する内容）:

```toml
[mcp_servers.shadcn]
command = "pnpm"
args = ["dlx", "shadcn@latest", "mcp", "--cwd", "apps/web"]
```

ポイント:
- `--cwd apps/web` を付けて、`apps/web/components.json` や `app/globals.css` を正しく参照させます
- うまく動かない場合は、まず `pnpm mcp:shadcn` が単独で起動できるか確認してください

## 3) Codex での使い方（おすすめプロンプト）

以下のように「UI 実装＋shadcn コンポーネント前提」を明示すると噛み合いやすいです。

- 「`apps/web` に shadcn/ui が入っている前提で、`Dialog` を使ったフォームを作って」
- 「既存の `@/components/ui` の流儀に合わせて、○○ページを組んで」
- 「`components.json` のエイリアス（`@/components/ui`）を前提に import して」
