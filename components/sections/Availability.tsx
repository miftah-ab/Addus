'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const AREAS = [
  {
    title: 'Remote',
    description: 'Work with a distributed team to build and improve real software. Available across time zones.',
  },
  {
    title: 'Contract',
    description: 'Contribute to a defined product, feature, or technical project with a clear scope and timeline.',
  },
  {
    title: 'Product Development',
    description: 'Turn an idea or complex requirement into a working digital product, end to end.',
  },
]

function AreaCard({ area, index }: { area: (typeof AREAS)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        padding: '32px',
        border: '1px solid var(--border)',
        borderRadius: 10,
        background: 'var(--bg-primary)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <h3 className="font-clash" style={{ fontSize: 20, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 10 }}>
        {area.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {area.description}
      </p>
    </div>
  )
}

export default function Availability() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="availability"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Status badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div
              className="pulse-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 11,
                color: 'var(--accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Available now
            </span>
          </div>

          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)', marginBottom: 16 }}>
            Let&apos;s build something useful.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 480, marginBottom: 56 }}>
            I&apos;m open to remote opportunities, contract work, and selected freelance projects.
          </p>
        </div>

        {/* Three areas */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 52 }}
          className="availability-grid"
        >
          {AREAS.map((area, i) => (
            <AreaCard key={area.title} area={area} index={i} />
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="#contact" className="btn-primary" id="availability-cta">
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/miftah-abate-addus"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            id="availability-linkedin"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #availability { padding: 80px 40px !important; } }
        @media (max-width: 767px) {
          #availability { padding: 80px 24px !important; }
          .availability-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
