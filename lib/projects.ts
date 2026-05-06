import { Project } from './types'

export const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'LaunchFast',
    description: 'Production-ready Next.js SaaS starter with auth, Stripe payments, and Supabase built in.',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'],
    live_url: 'https://launchfast-sigma.vercel.app',
    github_url: 'https://github.com/ki706/launchfast',
    category: 'saas',
    featured: true,
    order_index: 1,
  },
  {
    id: '2',
    name: 'Emitto',
    description: 'AI engine that turns GitHub commits into LinkedIn posts and X threads automatically.',
    tech_stack: ['Next.js', 'TypeScript', 'Groq AI', 'GitHub API', 'Supabase'],
    live_url: 'https://emitto.vercel.app',
    github_url: 'https://github.com/ki706/folio',
    category: 'ai-tools',
    featured: true,
    order_index: 2,
  },
  {
    id: '3',
    name: 'Lead Qualification Agent',
    description: 'AI agent that qualifies leads via Telegram, scores them 1–10, and notifies brokers instantly.',
    tech_stack: ['Next.js', 'TypeScript', 'Telegram Bot API', 'Groq AI', 'Supabase'],
    category: 'automation',
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
