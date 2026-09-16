'use client'
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { Project } from '@/lib/types'

type Category = 'all' | 'ai-tools' | 'saas' | 'automation' | 'mobile'

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',        value: 'all' },
  { label: 'AI Tools',   value: 'ai-tools' },
  { label: 'SaaS',       value: 'saas' },
  { label: 'Automation', value: 'automation' },
  { label: 'Mobile',     value: 'mobile' },
]

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>('all')
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <section
      id="work"
      style={{ padding: '120px 80px', background: 'var(--bg-primary)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Selected work</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 40,
          }}
        >
          <h2
            id="portfolio-headline"
            className="font-clash text-display"
            style={{ color: 'var(--text-primary)' }}
          >
            Software I&apos;ve built.
          </h2>
        </div>

        {/* Category filters */}
        <div
          id="portfolio-filters"
          role="group"
          aria-label="Filter projects by category"
          style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}
        >
          {FILTERS.map(f => (
            <button
              key={f.value}
              id={`filter-${f.value}`}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
              style={{
                padding: '6px 16px',
                borderRadius: 100,
                border: '1px solid',
                fontSize: 12,
                fontFamily: 'var(--font-geist)',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
                background: active === f.value ? 'var(--accent)' : 'transparent',
                color: active === f.value ? 'var(--accent-fg)' : 'var(--text-secondary)',
                borderColor: active === f.value ? 'var(--accent)' : 'var(--border-strong)',
                fontWeight: active === f.value ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              style={{ animation: 'fade-up 0.5s ease both', animationDelay: `${i * 0.07}s` }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #work { padding: 80px 40px !important; } }
        @media (max-width: 767px) { #work { padding: 80px 24px !important; } }
        @keyframes fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  )
}
