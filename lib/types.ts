export interface Project {
  id: string
  name: string
  description: string
  tech_stack: string[]
  live_url?: string
  github_url?: string
  image_url?: string
  category: 'ai-tools' | 'saas' | 'automation'
  featured?: boolean
  order_index?: number
}

export interface CommitData {
  repo: string
  repoDisplay: string
  message: string
  date: string
  url: string
  sha: string
  isToday: boolean
}
