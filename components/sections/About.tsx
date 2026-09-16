'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      style={{
        background: 'var(--bg-primary)',
        position: 'relative',
        zIndex: 1,
        padding: '120px 80px',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: 80,
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left column */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.1s',
          }}
        >
          <span className="section-label">The builder</span>

          {/* Monogram */}
          <div
            style={{
              width: 80,
              height: 80,
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
            aria-hidden="true"
          >
            <span className="font-clash" style={{ fontSize: 32, color: 'var(--text-primary)', fontWeight: 600 }}>
              M
            </span>
          </div>

          <h2
            id="about-headline"
            className="font-clash"
            style={{
              fontSize: 'clamp(26px, 3.2vw, 44px)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            I&apos;m Miftah.
          </h2>

          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
            Full-Stack Developer
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a
              href="https://www.linkedin.com/in/miftah-abate-addus"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/miftah-ab"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right column — copy */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 17, color: 'var(--text-primary)', lineHeight: 1.8, fontWeight: 500 }}>
              I&apos;m a developer focused on building practical software from the ground up.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              My background is in Information Systems, but my strongest learning has come from actually building — taking ideas, figuring out the technical requirements, writing the code, integrating the necessary services, and getting the result running.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              I enjoy working across the stack and especially like products where software, AI, and automation come together to solve a real problem.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              I&apos;m currently open to working with companies and teams remotely, as well as taking on contract projects where I can contribute and take ownership.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about { padding: 80px 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 767px) {
          #about { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  )
}
