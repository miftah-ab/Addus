-- ============================================================
-- Addus — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- PROJECTS TABLE
create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null,
  tech_stack    text[] not null default '{}',
  live_url      text,
  github_url    text,
  image_url     text,
  category      text check (category in ('ai-tools', 'saas', 'automation')),
  featured      boolean default false,
  order_index   int default 0,
  created_at    timestamptz default now()
);

-- CONTACT SUBMISSIONS TABLE
create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table projects enable row level security;
alter table contact_submissions enable row level security;

-- Anyone can read projects (public portfolio)
create policy "Public can read projects"
  on projects for select
  using (true);

-- Only service role can insert/update/delete projects
create policy "Service role manages projects"
  on projects for all
  using (auth.role() = 'service_role');

-- Anyone can insert a contact submission (the contact form)
create policy "Anyone can submit contact"
  on contact_submissions for insert
  with check (true);

-- Only service role can read contact submissions
create policy "Service role reads contacts"
  on contact_submissions for select
  using (auth.role() = 'service_role');

-- ============================================================
-- SEED DATA — Projects
-- ============================================================

insert into projects (name, description, tech_stack, live_url, github_url, category, featured, order_index)
values
  (
    'LaunchFast',
    'Production-ready Next.js SaaS starter with auth, Stripe payments, and Supabase built in.',
    array['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
    'https://launchfast-sigma.vercel.app',
    'https://github.com/ki706/launchfast',
    'saas',
    true,
    1
  ),
  (
    'Emitto',
    'AI engine that turns GitHub commits into LinkedIn posts and X threads automatically.',
    array['Next.js', 'TypeScript', 'Groq AI', 'GitHub API', 'Supabase'],
    'https://emitto.vercel.app',
    'https://github.com/ki706/folio',
    'ai-tools',
    true,
    2
  ),
  (
    'Lead Qualification Agent',
    'AI agent that qualifies leads via Telegram, scores them 1–10, and notifies brokers instantly.',
    array['Next.js', 'TypeScript', 'Telegram Bot API', 'Groq AI', 'Supabase'],
    null,
    null,
    'automation',
    false,
    3
  );
