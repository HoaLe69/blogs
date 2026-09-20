-- ============================================================
-- Supabase schema for blog comments + post likes
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- ============================================================

-- ------------------------------------------------------------
-- 1) comments table
--    post_slug references the slug of an MDX blog post.
--    Anonymous users provide a display name.
-- ------------------------------------------------------------
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  name text not null check (char_length(trim(name)) > 0),
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists comments_post_slug_idx on public.comments (post_slug);
create index if not exists comments_created_at_idx on public.comments (created_at desc);

-- ------------------------------------------------------------
-- 2) post_likes table
--    One row per post holding an aggregate counter.
--    (Simple counter — no per-user dedup, per requirements.)
-- ------------------------------------------------------------
create table if not exists public.post_likes (
  post_slug text primary key,
  count bigint not null default 0 check (count >= 0)
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

-- Comments: anyone can read; insert is public; owners (none here) can update/delete.
alter table public.comments enable row level security;

drop policy if exists "comments_select_public" on public.comments;
create policy "comments_select_public" on public.comments
  for select using (true);

drop policy if exists "comments_insert_public" on public.comments;
create policy "comments_insert_public" on public.comments
  for insert with check (true);

-- Post likes: anyone can read; anyone anon can insert/update the counter.
alter table public.post_likes enable row level security;

drop policy if exists "post_likes_select_public" on public.post_likes;
create policy "post_likes_select_public" on public.post_likes
  for select using (true);

drop policy if exists "post_likes_insert_anon" on public.post_likes;
create policy "post_likes_insert_anon" on public.post_likes
  for insert with check (true);

drop policy if exists "post_likes_update_anon" on public.post_likes;
create policy "post_likes_update_anon" on public.post_likes
  for update using (true) with check (true);
