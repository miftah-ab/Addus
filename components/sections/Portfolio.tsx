'use client'
import { useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { Project } from '@/lib/types'

type Category = 'all' | 'ai-tools' | 'saas' | 'automation'
const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI Tools', value: 'ai-tools' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Automation', value: 'automation' },
]

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category>('all')
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <section
      id="work"
      style={{ padding: '120px 80px', background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">{'// what we\'ve shipped'}</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)', marginBottom: 40 }}>
            Real products.<br />Real code.
          </h2>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 48, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              data-hover
              style={{
                padding: '8px 18px', borderRadius: 100, border: '1px solid',
                fontSize: 13, fontFamily: 'var(--font-geist)', cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: active === f.value ? 'var(--accent-green)' : 'transparent',
                color: active === f.value ? '#000' : 'var(--text-secondary)',
                borderColor: active === f.value ? 'var(--accent-green)' : 'var(--border)',
                fontWeight: active === f.value ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 24 }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              style={{
                animation: 'fade-up 0.5s ease both',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <ProjectCard project={p} />
            </div>
          ))}

          {/* Next project card */}
          <div
            className="dashed-card"
            style={{
              minHeight: 280, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40,
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--text-tertiary)', fontSize: 18 }}>+</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)', textAlign: 'center', fontFamily: 'var(--font-geist-mono)' }}>
              Next project in progress...
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #work { padding: 80px 40px !important; } }
        @media (max-width: 767px) { #work { padding: 80px 24px !important; } #work .grid { grid-template-columns: 1fr !important; } }
        @keyframes fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  )
}
