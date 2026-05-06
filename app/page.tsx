import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Commits from '@/components/sections/Commits'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { getProjects } from '@/lib/projects'
import { fetchRecentCommits } from '@/lib/github'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [projects, commits] = await Promise.all([
    getProjects(),
    fetchRecentCommits(),
  ])

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Services />
      <Portfolio projects={projects} />
      <Commits commits={commits} />
      <About />
      <Contact />
    </>
  )
}
