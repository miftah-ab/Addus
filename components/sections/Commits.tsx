'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CommitCard from '@/components/ui/CommitCard'
import { CommitData } from '@/lib/types'

export default function Commits({ commits }: { commits: CommitData[] }) {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section
      id="commits"
      style={{ padding: '120px 80px', background: 'var(--bg-primary)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <span id="commits-label" className="section-label">{'// always building'}</span>

        <div
          ref={headRef}
          id="commits-header"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h2 id="commits-headline" className="font-clash text-display" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            Open GitHub.<br />See the proof.
          </h2>
        </div>

        <p id="commits-sub" style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 48, fontFamily: 'var(--font-geist-mono)', opacity: 0.7 }}>
          Latest commits — updated in real time
        </p>

        {commits.length === 0 ? (
          <div style={{padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 14, fontFamily: 'var(--font-geist-mono)'}}>
            {'// fetching commits...'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {commits.map((c, i) => <CommitCard key={c.sha} commit={c} index={i} />)}
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a
            href="https://github.com/ki706"
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="text-green"
            style={{ fontSize: 14, opacity: 0.7, fontFamily: 'var(--font-geist-mono)', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            View all commits →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #commits { padding: 80px 40px !important; } }
        @media (max-width: 767px) { #commits { padding: 80px 24px !important; } }
      `}</style>
    </section>
  )
}
