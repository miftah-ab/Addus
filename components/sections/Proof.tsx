'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const PROOF_BLOCKS = [
  {
    label: 'Full-Stack',
    description: 'Frontend, backend, databases, APIs, authentication, and deployment.',
  },
  {
    label: 'AI Products',
    description: 'Useful AI features, LLM integrations, intelligent workflows, and product-specific automation.',
  },
  {
    label: 'Product Thinking',
    description: 'Turning unclear ideas and complex requirements into usable software.',
  },
  {
    label: 'Ship',
    description: 'Connecting the pieces, testing the result, deploying the product, and improving it.',
  },
]

function ProofBlock({ block, index }: { block: (typeof PROOF_BLOCKS)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        padding: '32px',
        border: '1px solid var(--border)',
        borderRadius: 10,
        background: 'var(--bg-secondary)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <h3 className="font-clash" style={{ fontSize: 19, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 10 }}>
        {block.label}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {block.description}
      </p>
    </div>
  )
}

export default function Proof() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="proof"
      style={{
        padding: '120px 80px',
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            maxWidth: 720,
            marginBottom: 64,
          }}
        >
          <h2 className="font-clash text-display" style={{ color: 'var(--text-primary)', marginBottom: 20 }}>
            I don&apos;t just write code.<br />
            <span style={{ color: 'var(--text-secondary)' }}>I build products.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            My work spans full-stack web applications, SaaS platforms, AI-powered products, automation systems, and mobile applications. I care about the entire product: architecture, user experience, implementation, integrations, deployment, and what happens after the software reaches real users.
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          className="proof-grid"
        >
          {PROOF_BLOCKS.map((block, i) => (
            <ProofBlock key={block.label} block={block} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #proof { padding: 80px 40px !important; } .proof-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 767px)  { #proof { padding: 80px 24px !important; } .proof-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
