'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CommitCard from '@/components/ui/CommitCard'
import { CommitData } from '@/lib/types'

export default function Commits({ commits }: { commits: CommitData[] }) {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section
      id="github"
      style={{ padding: '120px 80px', background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <span className="section-label">GitHub activity</span>

        <div
          ref={headRef}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            marginBottom: 12,
          }}
        >
          <h2
            id="github-headline"
            className="font-clash text-display"
            style={{ color: 'var(--text-primary)' }}
          >
            The code is there.
          </h2>
        </div>

        <p
          style={{
            fontSize: 16,
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: 48,
            maxWidth: 460,
          }}
        >
          Explore the repositories behind my projects and see how I build.
        </p>

        {commits.length === 0 ? (
          <div
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              color: 'var(--text-tertiary)',
              fontSize: 13,
              fontFamily: 'var(--font-geist-mono)',
              border: '1px solid var(--border)',
              borderRadius: 8,
            }}
          >
            No recent commits to display.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {commits.map((c, i) => (
              <CommitCard key={c.sha} commit={c} index={i} />
            ))}
          </div>
        )}

        <div style={{ marginTop: 36 }}>
          <a
            href="https://github.com/miftah-ab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            id="github-cta"
          >
            View GitHub profile ↗
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #github { padding: 80px 40px !important; } }
        @media (max-width: 767px)  { #github { padding: 80px 24px !important; } }
        @keyframes fade-up { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  )
}
