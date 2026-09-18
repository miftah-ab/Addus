import { Project } from './types'

export const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'LaunchFast',
    description: 'Production-ready Next.js SaaS starter with authentication, Stripe payments, and Supabase built in. Clone and ship.',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
    live_url: 'https://launchfast-sigma.vercel.app',
    github_url: 'https://github.com/miftah-ab/launchfast',
    category: 'saas',
    featured: true,
    order_index: 1,
    image_url: '/projects/launchfast.png',
  },
  {
    id: '2',
    name: 'Emitto',
    description: 'AI engine that turns GitHub commits into LinkedIn posts and X threads automatically. Connect your repo, get content.',
    tech_stack: ['Next.js', 'TypeScript', 'Groq AI', 'GitHub API', 'Supabase'],
    live_url: 'https://emitto-engine.vercel.app',
    github_url: 'https://github.com/miftah-ab/emitto',
    category: 'ai-tools',
    featured: true,
    order_index: 2,
    image_url: '/projects/emitto.png',
  },
  {
    id: '3',
    name: 'Zare',
    description: 'Ethiopian dating platform built inside Telegram. Culturally relevant matching by ethnicity, language, religion, and dating goals, with native Ethiopian payments and a real-time admin dashboard.',
    tech_stack: ['Cloudflare Workers', 'Telegram Bot API', 'React', 'Vite', 'Tailwind CSS', 'Telebirr'],
    live_url: 'https://t.me/ZareOfficialBot',
    category: 'saas',
    order_index: 3,
    image_url: '/projects/zare.png',
  },
  {
    id: '4',
    name: 'Adera SMS',
    description: 'Android utility that automatically responds to missed calls with a customizable SMS message. A missed call doesn\'t have to be a missed opportunity.',
    tech_stack: ['Android', 'Kotlin', 'SmsManager API'],
    live_url: 'https://adera-sms.vercel.app',
    category: 'mobile',
    featured: true,
    order_index: 4,
  },
]

export async function getProjects(): Promise<Project[]> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return STATIC_PROJECTS

    const res = await fetch(`${url}/rest/v1/projects_addus?select=*&order=order_index`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
    })
    if (!res.ok) return STATIC_PROJECTS
    const data = await res.json()
    return data.length ? data : STATIC_PROJECTS
  } catch {
    return STATIC_PROJECTS
  }
}
