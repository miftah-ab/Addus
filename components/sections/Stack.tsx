'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const STACK_GROUPS = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Kotlin'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Cloudflare Workers', 'REST APIs'],
  },
  {
    category: 'Databases & Services',
    items: ['PostgreSQL', 'Supabase', 'Telegram Bot API'],
  },
  {
    category: 'AI & Integrations',
    items: ['Groq AI', 'OpenAI', 'LLM APIs', 'GitHub API', 'Stripe'],
  },
  {
    category: 'Deployment & Tooling',
    items: ['Vercel', 'Cloudflare', 'GitHub', 'GitHub Actions'],
  },
]

function StackGroup({ group, index }: { group: (typeof STACK_GROUPS)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        {group.category}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {group.items.map(item => (
          <span
            key={item}
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: 12,
              color: 'var(--text-secondary)',
              padding: '5px 11px',
              border: '1px solid var(--border)',
              borderRadius: 4,
              background: 'var(--bg-primary)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--accent)'
              el.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--border)'
              el.style.color = 'var(--text-secondary)'
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="stack"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Technology</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 60,
          }}
        >
          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)' }}>
            The tools I use to build.
          </h2>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}
          className="stack-grid"
        >
          {STACK_GROUPS.map((group, i) => (
            <StackGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #stack { padding: 80px 40px !important; } .stack-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; } }
        @media (max-width: 767px)  { #stack { padding: 80px 24px !important; } .stack-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>
    </section>
  )
}
