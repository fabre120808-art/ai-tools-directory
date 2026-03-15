create extension if not exists pgcrypto;

create table if not exists tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  official_url text not null,
  summary text not null,
  description text,
  primary_tag text not null,
  secondary_tags jsonb not null default '[]'::jsonb,
  search_aliases jsonb not null default '[]'::jsonb,
  best_for jsonb not null default '[]'::jsonb,
  quick_start jsonb not null default '[]'::jsonb,
  pricing text not null,
  korean_support boolean not null default false,
  platform text not null,
  status text not null default 'draft',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tools_status_idx on tools (status);
create index if not exists tools_updated_at_idx on tools (updated_at desc);
