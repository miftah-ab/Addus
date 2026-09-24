import { Project } from './types'

export const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'ShipPulse',
    description: 'Automated changelog and release notes platform synced with GitHub commits. Connect your repository to generate clean release notes, email updates, and embeddable widgets.',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Groq AI', 'GitHub API', 'Tailwind CSS'],
    live_url: 'https://ship-pulse.vercel.app',
    github_url: 'https://github.com/miftah-ab/ShipPulse',
    category: 'saas',
    featured: true,
    order_index: 1,
    image_url: '/projects/shippulse.jpg',
  },
  {
    id: '2',
    name: 'Zare',
    description: 'Ethiopian dating platform built inside Telegram. Culturally relevant matching by ethnicity, language, religion, and dating goals, with native Ethiopian payments and a real-time admin dashboard.',
    tech_stack: ['Cloudflare Workers', 'Telegram Bot API', 'React', 'Vite', 'Tailwind CSS', 'Telebirr'],
    live_url: 'https://t.me/ZareOfficialBot',
    category: 'saas',
    featured: true,
    order_index: 2,
    image_url: '/projects/zare.png',
  },
  {
    id: '3',
    name: 'Adera SMS',
    description: 'Android utility that automatically responds to missed calls with a customizable SMS message. A missed call doesn\'t have to be a missed opportunity.',
    tech_stack: ['Android', 'Kotlin', 'SmsManager API'],
    live_url: 'https://adera-sms.vercel.app',
    category: 'mobile',
    featured: true,
    order_index: 3,
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
