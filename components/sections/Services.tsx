'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const SERVICES = [
  {
    num: '01',
    title: 'AI Automation Systems',
    description: 'We build AI agents that qualify leads, process documents, automate workflows, and handle repetitive tasks — so your team focuses on what matters.',
    pill: 'Most popular',
  },
  {
    num: '02',
    title: 'Custom SaaS Products',
    description: 'Full stack web applications with auth, payments, databases, and deployment. End to end. Shipped fast. Built to scale.',
    pill: null,
  },
  {
    num: '03',
    title: 'AI Integration',
    description: 'Take your existing business and make it intelligent. We add AI to your workflows, customer touchpoints, and internal tools.',
    pill: null,
  },
]

function ServiceCard({ s, index }: { s: typeof SERVICES[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="service-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
        flex: '1 1 280px',
      }}
    >
      <div className="font-clash text-dimmed" style={{ fontSize: 72, lineHeight: 1, marginBottom: 24, opacity: 0.2 }}>
        {s.num}
      </div>
      <h3 className="font-clash" style={{ fontSize: 26, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.2 }}>
        {s.title}
      </h3>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
        {s.description}
      </p>
      {s.pill && (
        <div style={{ marginTop: 28 }}>
          <span className="pill pill-green" style={{ fontSize: 11 }}>{s.pill}</span>
        </div>
      )}
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span id="services-label" className="section-label">{'// what we build'}</span>

        <div
          ref={headRef}
          id="services-header"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 id="services-headline" className="font-clash text-display" style={{ color: 'var(--text-primary)', marginBottom: 64 }}>
            Three things.<br />Done right.
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #services { padding: 80px 40px !important; } }
        @media (max-width: 767px) { #services { padding: 80px 24px !important; } #services .service-card { padding: 28px !important; } }
      `}</style>
    </section>
  )
}
