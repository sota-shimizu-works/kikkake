-- =========
-- public.users（アプリ側ユーザー）を作成
-- auth.users を参照し、削除はカスケード
-- =========
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  is_onboarded boolean not null default false,
  raw_user_meta_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at の自動更新
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_users_set_updated_at on public.users;
create trigger trg_users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

-- =========
-- auth.users → public.users 同期: INSERT
-- =========
create or replace function public.handle_auth_user_created()
returns trigger as $$
declare
  _name text;
  _avatar text;
begin
  -- メタデータから name / avatar_url を素直に拾う（無ければ NULL）
  _name := coalesce((new.raw_user_meta_data->>'name'), null);
  _avatar := coalesce((new.raw_user_meta_data->>'avatar_url'), null);

  insert into public.users (id, email, display_name, avatar_url, raw_user_meta_data)
  values (new.id, new.email, _name, _avatar, new.raw_user_meta_data);

  return new;
end;
$$ language plpgsql security definer;

-- =========
-- auth.users → public.users 同期: UPDATE
--   - email / raw_user_meta_data 由来の name, avatar を追従
-- =========
create or replace function public.handle_auth_user_updated()
returns trigger as $$
declare
  _name text;
  _avatar text;
begin
  _name := coalesce((new.raw_user_meta_data->>'name'), null);
  _avatar := coalesce((new.raw_user_meta_data->>'avatar_url'), null);

  update public.users
    set email = new.email,
        display_name = _name,
        avatar_url = _avatar,
        raw_user_meta_data = new.raw_user_meta_data,
        updated_at = now()
  where id = new.id;

  return new;
end;
$$ language plpgsql security definer;

-- =========
-- トリガー（auth.users 側）
-- ※ Supabase では auth.users 上のトリガー作成が許可されています
-- =========
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_auth_user_created();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update on auth.users
for each row execute function public.handle_auth_user_updated();

-- =========
-- RLS（本人のみ参照・更新可）
-- =========
alter table public.users enable row level security;

-- 読み取り（SELECT）：本人
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users for select
using (auth.uid() = id);

-- 更新（UPDATE）：本人
drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- 挿入（INSERT）は原則トリガーで発生するためクライアントからは不可
-- もしサービス側から作る必要があれば service_role を使うか、別途 INSERT ポリシーを追加

-- 便利インデックス（任意）
create index if not exists idx_users_email on public.users (email);