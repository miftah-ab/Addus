'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    description: 'Clarify the problem, users, requirements, and desired outcome before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Architect',
    description: 'Choose the right structure, technologies, data model, and integrations for the specific problem.',
  },
  {
    num: '03',
    title: 'Build',
    description: 'Implement across the required layers — frontend, backend, mobile, AI, or automation — with the actual product in mind.',
  },
  {
    num: '04',
    title: 'Test',
    description: 'Check functionality, edge cases, responsiveness, permissions, error states, and user flows.',
  },
  {
    num: '05',
    title: 'Ship',
    description: 'Deploy the product and make it usable in the real world. Get it running where it needs to run.',
  },
  {
    num: '06',
    title: 'Improve',
    description: 'Review feedback, fix issues, and continue improving the product after it is live.',
  },
]

function ProcessStep({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        padding: '32px 28px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 11,
          color: 'var(--accent)',
          letterSpacing: '0.1em',
          marginBottom: 14,
          display: 'block',
        }}
      >
        {step.num}
      </span>
      <h3
        className="font-clash"
        style={{ fontSize: 20, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 10 }}
      >
        {step.title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {step.description}
      </p>
    </div>
  )
}

export default function Process() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="process"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">How I work</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 56,
          }}
        >
          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)' }}>
            From idea to production.
          </h2>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="process-grid"
        >
          {STEPS.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #process { padding: 80px 40px !important; } .process-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px)  { #process { padding: 80px 24px !important; } .process-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
