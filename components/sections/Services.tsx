'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const CAPABILITIES = [
  {
    num: '01',
    title: 'Full-Stack Applications',
    description:
      'Complete web applications with frontend interfaces, backend logic, databases, authentication, APIs, and deployment. From blank repo to a working product.',
  },
  {
    num: '02',
    title: 'AI-Powered Products',
    description:
      'Useful AI features, LLM integrations, intelligent workflows, and product-specific AI functionality that solves real problems rather than adding noise.',
  },
  {
    num: '03',
    title: 'SaaS Products',
    description:
      'Multi-user software with business logic, dashboards, authentication, data management, subscriptions, and third-party integrations.',
  },
  {
    num: '04',
    title: 'Automation Systems',
    description:
      'APIs, bots, integrations, and workflows that connect systems and reduce repetitive work. Built to run reliably without constant supervision.',
  },
  {
    num: '05',
    title: 'Mobile Applications',
    description:
      'Practical mobile applications designed around real user problems, clear user flows, and the specific capabilities of the mobile platform.',
  },
]

function CapabilityCard({ cap, index }: { cap: (typeof CAPABILITIES)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className="service-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        flex: '1 1 260px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 11,
          color: 'var(--text-tertiary)',
          letterSpacing: '0.1em',
          marginBottom: 20,
        }}
      >
        {cap.num}
      </div>
      <h3
        className="font-clash"
        style={{ fontSize: 21, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.2, fontWeight: 600 }}
      >
        {cap.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {cap.description}
      </p>
    </div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="capabilities"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">What I build</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 60,
          }}
        >
          <h2
            id="capabilities-headline"
            className="font-clash text-display"
            style={{ color: 'var(--text-primary)' }}
          >
            What I build.
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.num} cap={cap} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #capabilities { padding: 80px 40px !important; } }
        @media (max-width: 767px) { #capabilities { padding: 80px 24px !important; } }
      `}</style>
    </section>
  )
}
