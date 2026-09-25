-- US-050 · expand · creates public.messages (contact form inbox)
-- RLS: default deny for anon and authenticated. Only trusted server code (secret key, which bypasses
-- RLS) inserts rows; admin read/update policies are added with admin auth (US-001, 07 §7.1).
-- Rollback: forward-fix (no down migrations, DEV-05 §5).

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 200 and position('@' in email) > 1),
  subject text check (char_length(subject) <= 160),
  body text not null check (char_length(body) between 20 and 5000),
  ip_hash text not null check (char_length(ip_hash) = 64),
  user_agent text check (char_length(user_agent) <= 300),
  status text not null default 'unread' check (status in ('unread', 'read', 'archived', 'spam'))
);

comment on table public.messages is 'Contact-form messages. Written by the server only; read by admins.';
comment on column public.messages.ip_hash is 'SHA-256 of a salted client IP, for rate limiting. The raw IP is never stored.';

-- Rate-limit lookups (same hashed address, recent window) and the admin inbox ordering.
create index messages_ip_hash_created_at_idx on public.messages (ip_hash, created_at desc);
create index messages_status_created_at_idx on public.messages (status, created_at desc);

alter table public.messages enable row level security;

-- Not reachable through the Data API for public roles at all (belt and braces with RLS).
revoke all on table public.messages from anon, authenticated;
