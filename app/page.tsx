import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import Proof from '@/components/sections/Proof'
import Portfolio from '@/components/sections/Portfolio'
import FeaturedProject from '@/components/sections/FeaturedProject'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Stack from '@/components/sections/Stack'
import Commits from '@/components/sections/Commits'
import About from '@/components/sections/About'
import Availability from '@/components/sections/Availability'
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
      <Proof />
      <Portfolio projects={projects} />
      <FeaturedProject />
      <Services />
      <Process />
      <Stack />
      <Commits commits={commits} />
      <About />
      <Availability />
      <Contact />
    </>
  )
}
