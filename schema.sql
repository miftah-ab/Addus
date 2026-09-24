-- ============================================================
-- Addus — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- PROJECTS TABLE
create table if not exists projects_addus (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null,
  tech_stack    text[] not null default '{}',
  live_url      text,
  github_url    text,
  image_url     text,
  category      text check (category in ('ai-tools', 'saas', 'automation', 'mobile')),
  featured      boolean default false,
  order_index   int default 0,
  created_at    timestamptz default now()
);

-- CONTACT SUBMISSIONS TABLE
create table if not exists contact_submissions_addus (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  message     text not null,
  created_at  timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table projects_addus enable row level security;
alter table contact_submissions_addus enable row level security;

-- Anyone can read projects (public portfolio)
drop policy if exists "Public can read projects" on projects_addus;
create policy "Public can read projects"
  on projects_addus for select
  using (true);

-- Only service role can insert/update/delete projects
drop policy if exists "Service role manages projects" on projects_addus;
create policy "Service role manages projects"
  on projects_addus for all
  using (auth.role() = 'service_role');

-- Anyone can insert a contact submission (the contact form)
drop policy if exists "Anyone can submit contact" on contact_submissions_addus;
create policy "Anyone can submit contact"
  on contact_submissions_addus for insert
  with check (true);

-- Only service role can read contact submissions
drop policy if exists "Service role reads contacts" on contact_submissions_addus;
create policy "Service role reads contacts"
  on contact_submissions_addus for select
  using (auth.role() = 'service_role');

-- ============================================================
-- SEED DATA — Projects
-- ============================================================

-- Clean up any obsolete/duplicate seeds
delete from projects_addus where name in ('LaunchFast', 'Emitto', 'ShipPulse', 'Lead Qualification Agent', 'Zare', 'Adera SMS');

insert into projects_addus (name, description, tech_stack, live_url, github_url, image_url, category, featured, order_index)
values
  (
    'ShipPulse',
    'Automated changelog and release notes platform synced with GitHub commits. Connect your repository to generate clean release notes, email updates, and embeddable widgets.',
    array['Next.js', 'TypeScript', 'Supabase', 'Groq AI', 'GitHub API', 'Tailwind CSS'],
    'https://ship-pulse.vercel.app',
    'https://github.com/miftah-ab/ShipPulse',
    '/projects/shippulse.jpg',
    'saas',
    true,
    1
  ),
  (
    'Zare',
    'Ethiopian dating platform built inside Telegram. Culturally relevant matching by ethnicity, language, religion, and dating goals, with native Ethiopian payments and a real-time admin dashboard.',
    array['Cloudflare Workers', 'Telegram Bot API', 'React', 'Vite', 'Tailwind CSS', 'Telebirr'],
    'https://t.me/ZareOfficialBot',
    null,
    '/projects/zare.png',
    'saas',
    true,
    2
  ),
  (
    'Adera SMS',
    'Android utility that automatically responds to missed calls with a customizable SMS message. A missed call doesn''t have to be a missed opportunity.',
    array['Android', 'Kotlin', 'SmsManager API'],
    'https://adera-sms.vercel.app',
    null,
    null,
    'mobile',
    true,
    3
  );
