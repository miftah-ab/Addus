'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      style={{
        background: 'var(--bg-secondary)',
        position: 'relative', zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <div
        ref={ref}
        id="about-container"
        style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 680,
        }}
        className="about-grid"
      >
        {/* Left Photo */}
        <div
          id="about-photo-wrapper"
          style={{
            position: 'relative', overflow: 'hidden',
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Green glow behind */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(0,255,136,0.08) 0%, transparent 70%)',
            zIndex: 0,
          }} />
          {/* Photo placeholder editorial dark */}
          <div 
            id="about-builder-card"
            style={{
            position: 'relative', zIndex: 1,
            width: '100%', height: '100%', minHeight: 480,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 16,
          }}>
            {/* Stylized avatar */}
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(0,255,136,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 60px rgba(0,255,136,0.1)',
            }}>
              <span className="font-clash" style={{ fontSize: 48, color: 'rgba(0,255,136,0.4)' }}>M</span>
            </div>
            <span id="about-builder-name" style={{ fontFamily: 'var(--font-geist-mono)', fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.2em' }}>
              MIFTAH ABATE
            </span>
          </div>
          {/* Grain overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '128px',
            opacity: 0.06, pointerEvents: 'none',
          }} />
        </div>

        {/* Right Text */}
        <div
          id="about-text-content"
          style={{
            padding: '80px 64px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(32px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <span id="about-label" className="section-label">{'// the builder'}</span>
          <h2 id="about-headline" className="font-clash" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 32 }}>
            Miftah Abate.<br />Full stack engineer.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'I build AI products and automation systems that actually work.',
              'Shipping products from scratch auth, payments, databases, deployment, AI integration. The full stack.',
              'Addus builds systems for businesses that are ready to move faster with AI.',
            ].map((text, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {text}
              </p>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
            <a href="https://www.linkedin.com/in/miftah-abate-26" target="_blank" rel="noopener noreferrer" data-hover
              className="text-green" style={{ fontSize: 14, opacity: 0.8, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
            >
              View LinkedIn →
            </a>
            <a href="https://github.com/miftah-ab" target="_blank" rel="noopener noreferrer" data-hover
              className="text-green" style={{ fontSize: 14, opacity: 0.6, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            >
              View GitHub →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr !important; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { min-height: 320px !important; }
          .about-grid > div:last-child { padding: 48px 24px !important; }
        }
      `}</style>
    </section>
  )
}
