import { CommitData } from './types'

const REPOS = ['miftah-ab/launchfast', 'miftah-ab/emitto']

// Simple in-memory cache
let cache: { data: CommitData[]; ts: number } | null = null
const TTL = 5 * 60 * 1000 // 5 minutes

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'yesterday'
  return `${days} days ago`
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export async function fetchRecentCommits(): Promise<CommitData[]> {
  if (cache && Date.now() - cache.ts < TTL) return cache.data

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const results = await Promise.allSettled(
      REPOS.map(repo =>
        fetch(`https://api.github.com/repos/${repo}/commits?per_page=5`, {
          headers,
          next: { revalidate: 300 },
        })
          .then(r => (r.ok ? r.json() : []))
          .then(
            (
              commits: Array<{
                sha: string
                html_url: string
                commit: { message: string; author: { date: string } }
              }>
            ) =>
              commits.map(c => ({
                repo,
                repoDisplay: repo.split('/')[1],
                message: c.commit.message.split('\n')[0].slice(0, 72),
                date: timeAgo(c.commit.author.date),
                url: c.html_url,
                sha: c.sha.slice(0, 7),
                isToday: isToday(c.commit.author.date),
                _raw: new Date(c.commit.author.date).getTime(),
              }))
          )
      )
    )

    const all: (CommitData & { _raw?: number })[] = []
    for (const r of results) {
      if (r.status === 'fulfilled') all.push(...r.value)
    }

    const sorted = all
      .sort((a, b) => (b._raw ?? 0) - (a._raw ?? 0))
      .slice(0, 5)
      .map(({ _raw, ...c }) => c)

    cache = { data: sorted, ts: Date.now() }
    return sorted
  } catch {
    return []
  }
}
