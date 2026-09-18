'use client'
import { useEffect, useState } from 'react'

const PIPELINE = ['IDEA', 'BUILD', 'INTEGRATE', 'TEST', 'DEPLOY', 'PRODUCT']

export default function Hero() {
  const [showArrow, setShowArrow] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setShowArrow(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 80px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial accent — light in dark mode, invisible in light */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <p
          className="section-label"
          style={{
            marginBottom: 28,
            animation: mounted ? 'fade-up 0.6s ease 0.05s both' : undefined,
          }}
        >
          MIFTAH ABATE · FULL-STACK DEVELOPER
        </p>

        {/* Main headline */}
        <h1
          id="hero-headline"
          className="font-clash text-hero"
          style={{
            color: 'var(--text-primary)',
            maxWidth: 920,
            animation: mounted ? 'fade-up 0.7s ease 0.15s both' : undefined,
          }}
        >
          I build software<br />
          <span style={{ color: 'var(--accent)' }}>that actually ships.</span>
        </h1>

        {/* Supporting copy */}
        <p
          id="hero-description"
          style={{
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            color: 'var(--text-secondary)',
            maxWidth: 540,
            lineHeight: 1.8,
            marginTop: 28,
            marginBottom: 10,
            animation: mounted ? 'fade-up 0.7s ease 0.28s both' : undefined,
          }}
        >
          I turn ideas and complex requirements into complete digital products: from frontend and backend systems to AI integrations, automation, mobile applications, and deployment.
        </p>

        {/* Availability badge */}
        <p
          style={{
            fontSize: 11,
            color: 'var(--accent)',
            fontFamily: 'var(--font-geist-mono)',
            letterSpacing: '0.14em',
            marginBottom: 44,
            animation: mounted ? 'fade-up 0.7s ease 0.36s both' : undefined,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
            className="pulse-dot"
            aria-hidden="true"
          />
          AVAILABLE FOR REMOTE · CONTRACT · FREELANCE
        </p>

        {/* CTAs */}
        <div
          id="hero-ctas"
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 72,
            animation: mounted ? 'fade-up 0.7s ease 0.44s both' : undefined,
          }}
        >
          <a href="#work" className="btn-primary" id="hero-cta-work">
            View my work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#contact" className="btn-ghost" id="hero-cta-contact">
            Let&apos;s talk
          </a>
        </div>

        {/* Pipeline visual */}
        <div
          id="hero-pipeline"
          aria-label="Development pipeline: Idea, Build, Integrate, Test, Deploy, Product"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            rowGap: 10,
            animation: mounted ? 'fade-up 0.7s ease 0.56s both' : undefined,
          }}
        >
          {PIPELINE.map((step, i) => {
            const isLast = i === PIPELINE.length - 1
            return (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    padding: '5px 13px',
                    border: '1px solid',
                    borderRadius: 4,
                    background: isLast ? 'var(--accent)' : 'transparent',
                    borderColor: isLast ? 'var(--accent)' : 'var(--border-strong)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-geist-mono)',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: isLast ? 'var(--accent-fg)' : 'var(--text-tertiary)',
                      fontWeight: isLast ? 600 : 400,
                    }}
                  >
                    {step}
                  </span>
                </div>
                {!isLast && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                      <line x1="0" y1="5" x2="14" y2="5" stroke="var(--border-strong)" strokeWidth="1" />
                      <polyline points="10,2 14,5 10,8" stroke="var(--border-strong)" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-arrow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          opacity: showArrow ? 0.35 : 0,
          transition: 'opacity 0.4s ease',
          color: 'var(--text-tertiary)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        @media (max-width: 1024px) { #hero { padding: 120px 40px 80px !important; } }
        @media (max-width: 767px) {
          #hero { padding: 96px 24px 80px !important; }
          #hero h1 { font-size: clamp(38px, 10.5vw, 60px) !important; }
          #hero-pipeline { gap: 0; }
        }
        @media (max-width: 480px) {
          #hero-pipeline { flex-direction: column; align-items: flex-start !important; gap: 6px !important; }
        }
      `}</style>
    </section>
  )
}
